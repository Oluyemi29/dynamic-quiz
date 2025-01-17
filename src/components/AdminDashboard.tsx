"use client";
import { useSession } from "next-auth/react";
import React from "react";
import AdminNav from "./AdminNav";

const AdminDashboard = () => {
  const { data: session, status } = useSession();
  console.log(session, status);

  return (
    <div>
      <AdminNav />
    </div>
  );
};

export default AdminDashboard;
