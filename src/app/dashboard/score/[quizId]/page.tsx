import UserScore from "@/components/user/UserScore";
import { prisma } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";
import React from "react";

const page = async ({ params }: { params: Promise<{ quizId: string }> }) => {
  noStore()
  const quizId = (await params).quizId;
  const Score = await prisma.userAttemptQuiz.findMany({});
  const QuizDetails = await prisma.quiz.findUnique({
    where: {
      id: quizId,
    },
  });
  return (
    <div>
      <UserScore Score={Score} quizID={quizId} QuizDetails={QuizDetails} />
    </div>
  );
};

export default page;
