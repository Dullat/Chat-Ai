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

  const [currentChat, setCurrentChat] = useState([]);

  const onSent = async () => {
    setResult("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);
    const response = await runChat(input);
    let splited = response.split("```");
    let final = "";
    for (let i = 0; i < splited.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        const normal = splited[i].split("**");
        let newNormal = "";
        for (let j = 0; j < normal.length; j++) {
          if (j === 0 || j % 2 !== 1) {
            newNormal += normal[j];
          } else newNormal += `<b>${normal[j]}</b>`;
        }

        let newNormalSplited = newNormal.split("`");
        let newNormal2 = "";
        for (let k = 0; k < newNormalSplited.length; k++) {
          if (k === 0 || k % 2 !== 1) {
            newNormal2 += newNormalSplited[k];
          } else
            newNormal2 += `<code style="background: #d1d5db; padding: 4px; border-radius: 3px;">${newNormalSplited[k]}</code>`;
        }

        final += newNormal2;
      } else {
        final +=
          "<pre style='background:gray; padding: .5rem; border-radius: .5rem; max-width: 100vw; overflow: scroll'>" +
          splited[i] +
          "</pre>";
      }
    }

    console.log(final);

    let newResponse2 = `<pre style="white-space: pre-wrap; line-height: 1.5rem; width: 100%; font-family: sans-serif; letter-spacing: 1px ">${final}<pre>`;
    setCurrentChat([...currentChat, { prompt: input, chat: newResponse2 }]);
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
    currentChat,
  };

  return (
    <context.Provider value={contextValue}>{props.children}</context.Provider>
  );
};
