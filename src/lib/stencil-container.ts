import { SpawnOptions, WebContainer } from '@webcontainer/api';

export const files = {
  'index.js': {
    file: {
      contents: `
import express from 'express';
const app = express();
const port = 3111;

app.get('/', (req, res) => {
  res.send('Welcome to a WebContainers app! 🥳');
});

app.listen(port, () => {
  console.log(\`App is live at http://localhost:\${port}\`);
});`,
    },
  },
  'package.json': {
    file: {
      contents: JSON.stringify(
{
  "name": "stencil-browser-playground",
  "type": "module",
  "dependencies": {
    // 3.1.0-dev.1678219461.af742f8 is a build of ap/remove-browser-support
    // performed on 3/7/23. See here:
    // https://github.com/ionic-team/stencil/actions/runs/4358070181/jobs/7618247756
    "@stencil/core": "3.1.0-dev.1678219461.af742f8",
  }
}),
    },
  },
};

export async function createStencilContainer() {
  console.log('running');
  let webcontainerInstance = await WebContainer.boot();

  await webcontainerInstance.mount(files);

  // install no-browser-compat Stencil build
  let install = await webcontainerInstance.spawn('npm', ['i'], {
    // output: false
  });
  await install.exit

  console.log('ran!');

  const result = await webcontainerInstance.spawn('npx', ['stencil', 'info'])
  result.output.pipeTo(new WritableStream({
    write(data) {
      console.log(data);
    }
  }));
}
