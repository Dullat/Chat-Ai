import { createContext, useContext, useState } from "react";
import runChat from "../config/gemini";

const context = createContext();

export default function useAiContext() {
  return useContext(context);
}

export const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const onSent = async (prompt) => {
    setResult("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);
    const response = await runChat(input);
    let splited = response.split("```");
    console.log(splited);
    let final = "";
    for (let i = 0; i < splited.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        const normal = splited[i].split("**");
        console.log(normal);
        let newNormal = "";
        for (let j = 0; j < normal.length; j++) {
          if (j === 0 || j % 2 !== 1) {
            newNormal += normal[j];
            console.log(newNormal);
          } else newNormal += `<b>${normal[j]}</b>`;
        }

        console.log(newNormal);
        final += newNormal;
      } else {
        final +=
          "<pre style='background:gray; padding: .5rem; border-radius: .5rem; max-width: 100vw; overflow: scroll'>" +
          splited[i] +
          "</pre>";
      }
    }

    console.log(final);

    let newResponse2 = `<pre style="white-space: pre-wrap; line-height: 1.5rem; width: 100%; font-family: sans-serif; letter-spacing: 1px ">${final}<pre>`;
    setResult(newResponse2);
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompts,
    setPrevPrompts,
    showResult,
    setShowResult,
    loading,
    setLoading,
    result,
    setResult,
    onSent,
  };

  return (
    <context.Provider value={contextValue}>{props.children}</context.Provider>
  );
};
