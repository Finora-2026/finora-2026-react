import { useEffect, useState } from "react";

import "./TypeWriter.css";

type Props = {
  text: string;
  speed?: number;
};

export default function TypeWriter({ text, speed = 25 }: Props) {
  const [output, setOutput] = useState("");

  useEffect(() => {
    let i = 0;

    setOutput(""); // reset when text changes

    const interval = setInterval(() => {
      setOutput(text.slice(0, i));
      i++;

      if (i > text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <p>
      {output}
      <span className="cursor">|</span>
    </p>
  );
}