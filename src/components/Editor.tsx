import React, { useCallback, useEffect, useState } from "react";
import { useStencilWc } from "../hooks/useStencilWc";
import { PLACEHOLDER_COMPONENT } from "../lib/placeholders";
import {
  runCompilation,
  saveStencilComponentFile,
  saveStencilTranspileOptions,
} from "../lib/stencil-container";
import BuildOutput from "./BuildOutput";
import "./Editor.css";
import type { TranspileOptions } from "@stencil/core/compiler";
import { CompileTarget } from "@stencil/core/internal";

export default function Editor() {
  const wc = useStencilWc();

  const [text, setText] = useState(PLACEHOLDER_COMPONENT);
  const [output, setOutput] = useState("");

  // options for setting various transpilation parameters
  const [target, setTarget] = useState<CompileTarget>("esnext");
  const [module, setModule] = useState<"esm" | "cjs">("esm");

  const onChange: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      e.preventDefault();
      setText(e.target.value);
    },
    [setText]
  );

  useEffect(() => {
    const opts: TranspileOptions = {
      file: "component.tsx",
      componentExport: undefined, // fix
      componentMetadata: undefined, // fix
      coreImportPath: undefined,
      proxy: undefined,
      module,
      target,
      sourceMap: true,
      style: undefined,
      styleImportData: undefined,
    };

    console.log("about to write");
    console.log(opts);
    saveStencilTranspileOptions(wc, opts);
  }, [wc, target, module]);

  useEffect(() => {
    saveStencilComponentFile(wc, text);
  }, [text, wc]);

  const updateOutput = useCallback(
    (data: string) => {
      setOutput((cur) => cur + data);
    },
    [setOutput]
  );

  const compile = useCallback(() => {
    const writeableStream = new WritableStream({
      write(data) {
        setOutput(data);
      },
    });
    runCompilation(wc, writeableStream);
  }, [wc, text, setOutput]);

  return (
    <div className="editor">
      <div className="text-input">
        <textarea value={text} onChange={onChange} />
        <div className="compilation-controls">
          <label>
            <span>Target:</span>
            <select
              value={target}
              onChange={(e) => {
                setTarget(e.target.value);
              }}
            >
              <option value="latest">latest</option>
              <option value="esnext">esnext</option>
              <option value="es2020">es2020</option>
              <option value="es2017">es2017</option>
              <option value="es2015">es2015</option>
              <option value="es5">es5</option>
            </select>
          </label>
          <label>
            <span>Module:</span>
            <select
              value={module}
              onChange={(e) => {
                setModule(e.target.value as "esm" | "cjs");
              }}
            >
              <option value="cjs">CommonJS</option>
              <option value="esm">ECMAScript (esm)</option>
            </select>
          </label>
        </div>
      </div>
      <div>
        <button onClick={compile}>Compile!</button>
      </div>
      <BuildOutput output={output} />
    </div>
  );
}
