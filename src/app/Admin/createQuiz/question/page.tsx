import AdminCreateQuizQuestion from "@/components/AdminCreateQuizQuestion";
import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "@/lib/db";
import React from "react";

const page = async () => {
  noStore();
  const quizDetails = await prisma.quiz.findMany({
    select: {
      department: true,
      courseCode: true,
      studySession: true,
      id: true,
    },
  });
  return (
    <div>
      <AdminCreateQuizQuestion quizDetails={quizDetails} />
    </div>
  );
};

export default page;
