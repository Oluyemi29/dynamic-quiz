import UserQuestion from "@/components/user/UserQuestion";
import { prisma } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  noStore()
  const id = (await params).id;
  const Question = await prisma.question.findMany({
    where: {
      quizId: id,
    },
  });
  const now = new Date();
  const QuizDetails = await prisma.quiz.findUnique({
    where: {
      id,
      startDate: { lte: now },
      endDate: { gte: now },
    },
  });
  const StartEndQuiz = await prisma.startEndquiz.findFirst({
    where: {
      quizId: id,
      startTime: { lte: now },
      endTime: { gte: now },
    },
  });

  return (
    <div>
      <UserQuestion
        AllQuestion={Question}
        QuizDetails={QuizDetails}
        StartEndQuiz={StartEndQuiz}
      />
    </div>
  );
};

export default page;
