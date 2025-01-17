import EditQuiz from "@/components/edit/EditQuiz";
import { prisma } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";
import React from "react";


const page = async ({ params }: {params : Promise<{id : string}>}) => {
  noStore()
  const id = (await params).id;

  const Department = await prisma.admin.findMany({});
  const Quiz = await prisma.quiz.findUnique({
    where: {
      id,
    },
  });

  return (
    <div>
      <EditQuiz department={Department} previousQuiz={Quiz} />
    </div>
  );
};

export default page;
