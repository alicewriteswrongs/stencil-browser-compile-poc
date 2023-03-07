import React, {useCallback, useEffect, useState} from "react";
import { useStencilWc } from "../hooks/useStencilWc";
import {saveStencilComponentFile} from "../lib/stencil-container";

export default function Editor() {
  const wc = useStencilWc();

  const [text, setText] = useState<string>("");

  const onChange: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    e.preventDefault();
    setText(e.target.value);
  }, [setText]);

  useEffect(() => {
    saveStencilComponentFile(wc, text);
  }, [text, wc]);

  return <textarea value={text} onChange={onChange}/>
}
