import AdminStudentScore from "@/components/AdminStudentScore";
import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "@/lib/db";
import React from "react";

const page = async () => {
  noStore()
  const Admin = await prisma.admin.findMany({})
  return (
    <div>
      <AdminStudentScore Overall="40" department={Admin} />
    </div>
  );
};

export default page;
