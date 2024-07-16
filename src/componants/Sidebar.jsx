import { useState } from "react";
import { FaBars, FaHistory, FaPlus, FaQuestionCircle } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);

  const handleToggleClick = () => {
    setExtended((prev) => !prev);
  };
  return (
    <div
      className={`sidebar inline-flex flex-col min-h-dvh bg-slate-200 p-[25px]`}
    >
      <div className="top flex flex-col gap-4 ">
        <div
          className="menu cursor-pointer h-[25px]"
          onClick={handleToggleClick}
        >
          <FaBars className="text-2xl !stroke-1 " />
        </div>
        <div
          className={`new-chat flex items-center  ${
            extended ? "p-3 px-4" : "p-3 px-3"
          } bg-white gap-2 rounded-full w-fit mt-4`}
        >
          <FaPlus className="text-xl" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="flex flex-col gap-2 ">
            <p>Recent</p>
            <div className="flex items-center p-2 px-4 hover:bg-white gap-2 cursor-pointer rounded-full w-full">
              <FaRegMessage className="text-xl" />
              <p>what is react</p>
            </div>
          </div>
        ) : null}
      </div>
      <div className="bottom flex flex-col mt-auto  gap-2">
        <div className="flex items-center gap-2 hover:bg-white px-4 py-2 rounded-sm cursor-pointer">
          <FaQuestionCircle className="text-2xl" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="flex items-center gap-2 hover:bg-white px-4 py-2 rounded-sm cursor-pointer">
          <FaHistory className="text-2xl" />
          {extended ? <p>Activity</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
