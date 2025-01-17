import AdminEndedQuiz from "@/components/AdminEndedQuiz";
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
      department: true,
      startDate: true,
      endDate: true,
      studySession: true,
    },
  });
  return (
    <div>
      <AdminEndedQuiz department={Admin} quizOn={Quiz} />
    </div>
  );
};

export default page;
