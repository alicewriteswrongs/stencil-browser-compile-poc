import React, { useCallback, useEffect, useState } from "react";
import { useStencilWc } from "../hooks/useStencilWc";
import { PLACEHOLDER_COMPONENT } from "../lib/placeholders";
import {
  runCompilation,
  saveStencilComponentFile,
} from "../lib/stencil-container";
import BuildOutput from "./BuildOutput";
import "./Editor.css";

export default function Editor() {
  const wc = useStencilWc();

  const [text, setText] = useState(PLACEHOLDER_COMPONENT);
  const [output, setOutput] = useState("");

  const onChange: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      e.preventDefault();
      setText(e.target.value);
    },
    [setText]
  );

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
      <textarea value={text} onChange={onChange} />
      <div>
        <button onClick={compile}>Compile!</button>
      </div>
      <BuildOutput output={output} />
    </div>
  );
}
