import { useEffect, useRef, useState } from "react";
import NavBar from "./NavBar";
import { FaImage, FaMicrophone, FaArrowRight } from "react-icons/fa";
import useAiContext from "../context/context";

const Main = () => {
  const { input, setInput, onSent, showResult, loading, currentChat } =
    useAiContext();

  const scrollRef = useRef(null);

  const handleSubmit = () => {
    onSent();
  };

  const handleKeyDown = (event) => {
    console.log("entered");
    if (event.key === "Enter") {
      onSent();
    }
  };

  useEffect(() => {
    if (loading && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [loading]);

  return (
    <div className="flex-grow bg-slate-white flex flex-col p-2">
      <NavBar />
      <div
        ref={scrollRef}
        className="w-full max-w-[900px] flex-grow m-auto flex flex-col overflow-y-scroll p-4"
      >
        {!showResult ? (
          <div className="p-4 text-4xl font-semibold">
            <p className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent w-fit">
              Hi, <span>Dullat</span>
            </p>
            <p className="opacity-50">How can i help you</p>
          </div>
        ) : (
          <div className="">
            <div className="chats "></div>
            <div className="flex flex-col gap-6">
              {currentChat.map((e, i) => (
                <div key={i} className="flex flex-col">
                  <p className="px-4 py-2 bg-slate-400 rounded-full my-4 self-end w-fit">
                    {e.prompt}
                  </p>
                  <p dangerouslySetInnerHTML={{ __html: e.chat }}></p>
                </div>
              ))}
              {loading ? (
                <div className="flex flex-col gap-4">
                  <hr className="animate-loading h-[15px] bg-gradient-to-r from-blue-500 via-white to-blue-500 rounded-md" />
                  <hr className="animate-loading h-[15px] bg-gradient-to-r from-blue-500 via-white to-blue-500 rounded-md" />
                  <hr className="animate-loading h-[15px] bg-gradient-to-r from-blue-500 via-white to-blue-500 rounded-md" />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center gap-4 bg-slate-200 rounded-full px-4 py-2 m-auto my-4 w-full max-w-[900px]">
        <input
          onKeyDown={handleKeyDown}
          tabIndex={0}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type something here"
          className="w-full border-0 outline-none bg-transparent"
        />
        <FaImage className="text-2xl" />
        <FaMicrophone className="text-xl" />
        <FaArrowRight
          onClick={handleSubmit}
          className={`text-2xl ${
            loading || input === ""
              ? "opacity-50 pointer-events-none"
              : "cursor-pointer"
          }`}
        />
      </div>
    </div>
  );
};

export default Main;
