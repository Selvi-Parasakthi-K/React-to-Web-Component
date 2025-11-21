import React, { useState } from "react";

export type RandomPickerProps = {
  items?: string[];
  title?: string;
  onResult?: (result: string) => void;
};

const RandomPicker: React.FC<RandomPickerProps> = ({
  items = [],
  title = "Pick one",
  onResult,
}) => {
  const [current, setCurrent] = useState<string | null>(null);

  function pick() {
    if (!items || items.length === 0) return;
    const i = Math.floor(Math.random() * items.length);
    const result = items[i];
    setCurrent(result);
    if (onResult) onResult(result);

    try {
      const host = (window as any).__r2wc_host;
      if (host.dispatchEvent) {
        host.dispatchEvent(
          new CustomEvent("picker-result", { detail: result })
        );
      }
    } catch (e) {
      console.error("error", e);
    }
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: 10 }}>
      <h3>{title}</h3>
      <button onClick={pick}>Pick Random</button>
      {current && (
        <p>
          Selected: <strong>{current}</strong>
        </p>
      )}
    </div>
  );
};

export default RandomPicker;
