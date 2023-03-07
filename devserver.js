import * as esbuild from 'esbuild'
import http from 'node:http'

// Start esbuild's server on a random local port
let ctx = await esbuild.context({
  bundle: true,
  outdir: 'www',
  entryPoints: ["src/main.tsx"]
})

// The return value tells us where esbuild's local server is
let { host, port } = await ctx.serve({ servedir: 'www' })

// Then start a proxy server on port 3000
http.createServer((req, res) => {
  const options = {
    hostname: host,
    port: port,
    path: req.url,
    method: req.method,
    headers: req.headers,
  }

  // per https://webcontainers.io/guides/quickstart#cross-origin-isolation
  // need these:
  // Cross-Origin-Embedder-Policy: require-corp
  // Cross-Origin-Opener-Policy: same-origin
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');

  // Forward each incoming request to esbuild
  const proxyReq = http.request(options, proxyRes => {
    // If esbuild returns "not found", send a custom 404 page
    if (proxyRes.statusCode === 404) {
      res.writeHead(404, { 'Content-Type': 'text/html' })
      res.end('<h1>A custom 404 page</h1>')
      return
    }

    // Otherwise, forward the response from esbuild to the client
    res.writeHead(proxyRes.statusCode, proxyRes.headers)
    proxyRes.pipe(res, { end: true })
  })

  // Forward the body of the request to esbuild
  req.pipe(proxyReq, { end: true })
}).listen(3000)

console.log('listening on http://localhost:3000');
