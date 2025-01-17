import React from "react";
import SignOut from "./SignOut";

const AdminNav = () => {
  return (
    <div className="static top-0 w-full justify-between flex bg-slate-100 shadow-md items-center px-5 py-3">
      <h1 className="text-faidBlue font-semibold animate-bounce">
        Hello Admin
      </h1>
      <SignOut />
    </div>
  );
};

export default AdminNav;
