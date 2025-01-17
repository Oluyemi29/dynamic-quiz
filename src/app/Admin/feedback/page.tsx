import AdminFeedback from "@/components/AdminFeedback";
import { prisma } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";
import React from "react";

const page = async () => {
  noStore()
  const Admin = await prisma.admin.findMany({});
  const Feedback = await prisma.feedback.findMany({})
  return (
    <div>
      <AdminFeedback department={Admin} Feedback={Feedback} />
    </div>
  );
};

export default page;
