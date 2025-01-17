import UserQuiz from "@/components/user/UserQuiz";
import { prisma } from "@/lib/db";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";
const page = async ({
  params,
}: {
  params: Promise<{ courseCode: string }>;
}) => {
  noStore()
  const cCode = await params;
  const courseCode = cCode.courseCode;
  const correctCode = courseCode.includes("%20")
    ? courseCode.replace("%20", " ")
    : courseCode;
  const now = new Date();
  const QuizCode = await prisma.quiz.findMany({
    where: {
      courseCode: correctCode,
      startDate: { lte: now },
      endDate: { gte: now },
    },
  });
  return (
    <div>
      <UserQuiz quizCode={QuizCode} />
    </div>
  );
};

export default page;
