import AdminSideBar from "@/components/AdminSideBar";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full gap-2">
      <div className="w-[20%]">
        <AdminSideBar />
      </div>
      <div className="w-[80%]">{children}</div>
    </div>
  );
};

export default layout;
