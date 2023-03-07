import { WebContainer } from "@webcontainer/api";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { createStencilContainer } from "./lib/stencil-container";
import { WcContext } from "./context/WcContext";
import { useCreateStencilWc } from "./hooks/useStencilWc";
import Editor from "./components/Editor";

function App() {
  const wc = useCreateStencilWc();

  return wc !== null ? (
    <WcContext.Provider value={wc}>
      <Editor />
    </WcContext.Provider>
  ) : (
    <div className="loading">loading...</div>
  );
}

export default App;
