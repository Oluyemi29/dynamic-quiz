import UserDashboard from "@/components/user/UserDashboard";
import { prisma } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";
import React from "react";

const page = async () => {
  noStore()
  const QuizAvailable = await prisma.quiz.findMany({
    distinct: "courseCode",
  });
  return (
    <div>
      <UserDashboard allQuiz={QuizAvailable} />
    </div>
  );
};

export default page;
