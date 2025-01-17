"use client";
import { Button } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { redirect } from "next/navigation";
import { GraduationCap } from "lucide-react";

type QuizProps = {
  Score: {
    id: string;
    questId: string;
    userAnswer: string[];
    correctMark: number;
    userId: string;
    quizId: string;
    questionId: string;
    createAt: Date;
    updatedAt: Date;
  }[];
  quizID: string;
  QuizDetails: {
    id: string;
    level: string;
    department: string;
    updatedAt: Date;
    createdAt: Date;
    attemptRound: number;
    courseCode: string;
    endDate: Date;
    startDate: Date;
    studySession: number;
    timeDuration: number;
    totalMark: number;
    gradingMethod: string;
  } | null;
};

const UserScore = ({ Score, quizID, QuizDetails }: QuizProps) => {
  const { data: session } = useSession();
  // const userDepartment = session?.user.department;
  // const userLevel = session?.user.level;
  const userID = session?.user.id;
  if (!QuizDetails) {
    return redirect("/dashboard");
  }

  const ScoreNeeded = Score.filter((Sco) => {
    return Sco.quizId === quizID && Sco.userId === userID;
  });
  const TotalScoreNeeded = ScoreNeeded.reduce(
    (sum, myScore) => sum + myScore.correctMark,
    0
  );
  if (TotalScoreNeeded === null || TotalScoreNeeded === undefined) {
    return redirect("/dashboard");
  }

  return (
    <div className="w-full flex h-screen flex-col my-5 p-2 justify-center items-center">
      <div className="md:w-1/3 w-full md:shadow-md md:rounded-lg">
        <div className="w-full p-5 bg-faidMainBlue rounded-lg">
          <div className="text-white flex text-[0.8rem] gap-2">
            <p>Name :</p>
            <p className="font-semibold">{session?.user?.name}</p>
          </div>
          <div className="text-white flex text-[0.8rem] gap-2">
            <p>Matric :</p>
            <p className="font-semibold">{session?.user?.matric}</p>
          </div>
          <div className="text-white flex text-[0.8rem] gap-2">
            <p>Dept :</p>
            <p className="font-semibold">{session?.user?.department}</p>
          </div>
          <div className="text-white flex text-[0.8rem] gap-2">
            <p>Level :</p>
            <p className="font-semibold">{session?.user?.level}</p>
          </div>
        </div>
        <h1 className="p-5 font-semibold text-black">Your Score</h1>
        <div className="flex w-full p-5 flex-col justify-center items-center gap-4">
          <GraduationCap size={80} className="text-faidBlue" />
          <h1 className="text-medium font-semibold text-faidBlue">
            your score {TotalScoreNeeded} / {QuizDetails?.totalMark}
          </h1>
          <Link href={"/dashboard/feedbacks"}>
            <Button className="bg-faidBlue text-white">FeedBack</Button>
          </Link>
        </div>
        <div className="my-5 flex justify-center w-full">
          <Button
            onPress={() => {
              signOut();
            }}
            className="bg-red-600 text-white shadow-md"
          >
            SignOut
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserScore;
