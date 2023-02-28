import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    if (replace) {
      history.pop();
    }
    // console.log("mode",mode)
    setMode(mode);
    setHistory([...history, mode])
  }

  function back() {
    if (history.length !== 1) {
      history.pop();
      setMode(history[history.length-1]);
    }
  }
  // console.log("mode",mode, history)

  return { mode, transition, back };
}