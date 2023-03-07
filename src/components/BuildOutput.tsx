import React from "react";
import "./BuildOutput.css";

interface Props {
  output: string;
}

export default function BuildOutput(props: Props) {
  const { output } = props;

  return (
    <div className="build-output">
      <pre className="code">{output}</pre>
    </div>
  );
}
