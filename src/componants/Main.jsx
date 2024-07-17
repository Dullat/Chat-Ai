import { useState } from "react";
import NavBar from "./NavBar";
import { FaImage, FaMicrophone, FaArrowRight } from "react-icons/fa";
import useAiContext from "../context/context";

const Main = () => {
  const { input, setInput, onSent, showResult, recentPrompt, result, loading } =
    useAiContext();

  return (
    <div className="flex-grow bg-slate-white flex flex-col">
      <NavBar />
      <div className="w-full max-w-[900px] flex-grow m-auto flex flex-col overflow-y-scroll p-4">
        {!showResult ? (
          <div className="p-4 text-4xl font-semibold">
            <p className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent w-fit">
              Hi, <span>Dullat</span>
            </p>
            <p className="opacity-50">How can i help you</p>
          </div>
        ) : (
          <div className="">
            <div className="flex flex-col gap-6">
              <p className="p-4 py-1 self-end text-end ml-auto bg-slate-200 rounded-full">
                {recentPrompt}
              </p>
              {loading ? (
                <div className="flex flex-col gap-4">
                  <hr className="animate-loading h-[15px] bg-gradient-to-r from-blue-500 via-white to-blue-500 rounded-md" />
                  <hr className="animate-loading h-[15px] bg-gradient-to-r from-blue-500 via-white to-blue-500 rounded-md" />
                  <hr className="animate-loading h-[15px] bg-gradient-to-r from-blue-500 via-white to-blue-500 rounded-md" />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: result }}></p>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center gap-4 bg-slate-200 rounded-full px-4 py-2 m-4 mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type something here"
          className="w-full border-0 outline-none bg-transparent"
        />
        <FaImage className="text-2xl" />
        <FaMicrophone className="text-xl" />
        <FaArrowRight onClick={onSent} className="text-2xl" />
      </div>
    </div>
  );
};

export default Main;
