"use server";
import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

type QuizProps = {
  attemptRound: string;
  courseCode: string;
  endDate: string;
  gradeMethod: string;
  startDate: string;
  department: string;
  studySession: string;
  timeDuration: string;
  totalMark: string;
  level: string;
};
export const createQuiz = async ({
  attemptRound,
  courseCode,
  endDate,
  gradeMethod,
  startDate,
  department,
  studySession,
  timeDuration,
  totalMark,
  level,
}: QuizProps) => {
  noStore()
  const checkQuiz = await prisma.quiz.findFirst({
    where: {
      department,
      courseCode,
      studySession: Number(studySession),
    },
  });
  if (checkQuiz) {
    return null;
  }
  await prisma.quiz.create({
    data: {
      attemptRound: Number(attemptRound),
      courseCode,
      department,
      endDate: new Date(endDate),
      startDate: new Date(startDate),
      gradingMethod: gradeMethod,
      studySession: Number(studySession),
      timeDuration: Number(timeDuration),
      totalMark: Number(totalMark),
      level,
    },
  });
  return true;
};

type QuestionProps = {
  courseCodeId: string;
  question: string;
  availableOption: string[];
  CorrectAnswer: string[];
  questType: string;
  questionImg: string | null | undefined;
};

export const createQuestion = async ({
  courseCodeId,
  question,
  availableOption,
  CorrectAnswer,
  questType,
  questionImg,
}: QuestionProps) => {
  await prisma.question.create({
    data: {
      question,
      quetionType: questType,
      correctAnswer: CorrectAnswer,
      options: availableOption,
      questionImg: questionImg ?? "",
      quizId: courseCodeId,
    },
  });
  return true;
};

export const deleteOngoingQuiz = async (id: string) => {
  await prisma.quiz.delete({
    where: {
      id,
    },
  });
  revalidatePath("/", "layout");
  return true;
};
export const deleteEndQuiz = async (id: string) => {
  await prisma.quiz.delete({
    where: {
      id,
    },
  });
  revalidatePath("/", "layout");
  return true;
};

type EditQuizProps = {
  id: string;
  attemptRound: string | number;
  courseCode: string;
  endDate: string | Date;
  gradeMethod: string;
  startDate: string | Date;
  department: string;
  studySession: string | number;
  timeDuration: string | number;
  totalMark: string | number;
  level: string;
};

export const editQuiZ = async ({
  id,
  attemptRound,
  courseCode,
  endDate,
  gradeMethod,
  startDate,
  department,
  studySession,
  timeDuration,
  totalMark,
  level,
}: EditQuizProps) => {
  await prisma.quiz.update({
    where: {
      id,
    },
    data: {
      attemptRound: Number(attemptRound),
      courseCode,
      endDate: new Date(endDate),
      startDate: new Date(startDate),
      studySession: Number(studySession),
      gradingMethod: gradeMethod,
      timeDuration: Number(timeDuration),
      totalMark: Number(totalMark),
      department,
      level,
    },
  });
  revalidatePath("/", "layout");

  return true;
};

type QuizStartEndProps = {
  userId: string | undefined;
  quizId: string;
  startTime: Date;
  endTime: Date;
};
export const updateSTartQuiz = async ({
  userId,
  quizId,
  startTime,
  endTime,
}: QuizStartEndProps) => {
  await prisma.startEndquiz.upsert({
    where: {
      quizId,
    },
    update: {
      quizId,
      userId: userId as string,
      startTime,
      endTime,
    },
    create: {
      quizId,
      userId: userId as string,
      startTime,
      endTime,
    },
  });
  await prisma.startEndquiz.updateMany({
    where: {
      quizId,
    },
    data: {
      attempted: { increment: 1 },
    },
  });
};

type SubQuest = {
  questId: string;
  userAnswer: string[];
  correctMark: number;
  userId: string;
  quizId: string;
  correctAnswer: string[] | undefined;
};

export const submitQuestion = async ({
  questId,
  userAnswer,
  correctMark,
  userId,
  quizId,
  correctAnswer,
}: SubQuest) => {
  const CAnswer =
    correctAnswer &&
    JSON.stringify(correctAnswer) === JSON.stringify(userAnswer)
      ? correctMark
      : 0;
  await prisma.userAttemptQuiz.upsert({
    where: {
      questId: questId as string,
    },
    update: {
      userAnswer,
      correctMark: CAnswer,
      userId,
      questId,
      questionId: questId,
    },
    create: {
      questId,
      userAnswer,
      correctMark: CAnswer,
      userId,
      quizId,
      questionId: questId,
    },
  });
};

type feedProps = {
  course: string;
  department: string;
  studySession: string;
  description: string;
  level: string;
};

export const submitFeedback = async ({
  course,
  department,
  studySession,
  description,
  level,
}: feedProps) => {
  noStore()
  const checking = await prisma.feedback.findFirst({
    where: {
      courseCOde: course,
      department,
      description,
      level,
      studySession,
    },
  });
  if (checking) {
    return true;
  }
  await prisma.feedback.create({
    data: {
      courseCOde: course,
      department,
      description,
      level,
      studySession,
    },
  });
  return true;
};

type deleteUSerProps = {
  id: string;
  matricNo: number;
};
export const deleteUSer = async ({ id, matricNo }: deleteUSerProps) => {
  await prisma.user.delete({
    where: {
      id,
      matric: matricNo,
    },
  });
  return revalidatePath("/","layout")
};
