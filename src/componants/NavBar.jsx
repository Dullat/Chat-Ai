import React from "react";
import profile from "../assets/react.svg";

const NavBar = () => {
  return (
    <div className="flex items-center p-[25px] bg-slate-50">
      <p className="text-base">Chat Ai</p>
      <div className="ml-auto">
        {/* ethe plus da alag to componant bna ke oh pauga */}
        <div>
          <img src={profile} alt="" className="h-[25px]" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
