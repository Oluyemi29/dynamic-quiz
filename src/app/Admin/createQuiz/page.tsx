import AdminCreateQuiz from "@/components/AdminCreateQuiz";
import { prisma } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";
import React from "react";

const page = async () => {
  noStore();
  const Admin = await prisma.admin.findMany({});
  return (
    <div>
      <AdminCreateQuiz department={Admin} />
    </div>
  );
};

export default page;
