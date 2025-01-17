import AdminStudent from "@/components/AdminStudent";
import { prisma } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";
import React from "react";

const page = async () => {
  noStore()
  const Admin = await prisma.admin.findMany({});
  const AllUser = await prisma.user.findMany({})

  return (
    <div>
      <AdminStudent department={Admin} User={AllUser} />
    </div>
  );
};

export default page;
