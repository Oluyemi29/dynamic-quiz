import AdminOngoingQuiz from "@/components/AdminOngoingQuiz";
import { prisma } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";
import React from "react";

const page = async () => {
  noStore();
  const Admin = await prisma.admin.findMany({});
  const Quiz = await prisma.quiz.findMany({
    select: {
      id: true,
      courseCode: true,
      studySession: true,
      department: true,
      startDate: true,
      endDate: true,
    },
  });
  return (
    <div>
      <AdminOngoingQuiz department={Admin} quizOn={Quiz} />
    </div>
  );
};

export default page;
