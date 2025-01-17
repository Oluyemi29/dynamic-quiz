"use client";
import { Button } from "@nextui-org/react";
import { MessageCircleQuestion } from "lucide-react";
import { ImFilesEmpty } from "react-icons/im";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

type QuizProps = {
  allQuiz: {
    id: string;
    courseCode: string;
    startDate: Date;
    endDate: Date;
    timeDuration: number;
    totalMark: number;
    attemptRound: number;
    gradingMethod: string;
    studySession: number;
    department: string;
    level: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

const UserDashboard = ({ allQuiz }: QuizProps) => {
  const { data: session } = useSession();
  const userDepartment = session?.user.department;
  const userLevel = session?.user.level;

  const AvailableQuiz = allQuiz.filter((Quizes) => {
    const todayDate = new Date().getTime();
    const endDate = new Date(Quizes.endDate).getTime();
    return todayDate < endDate;
  });
  const getQuiz = AvailableQuiz.filter((AvailQuiz) => {
    return (
      AvailQuiz.department === userDepartment && AvailQuiz.level === userLevel
    );
  });

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
        <h1 className="p-5 font-semibold text-black">
          {session?.user.department} Quiz Available
        </h1>
        <div className="flex w-full p-5 flex-col gap-4">
          {getQuiz.length > 0 ? (
            <div className="w-full h-72 flex flex-col gap-3 overflow-y-scroll">
              {getQuiz.map((Quiz, index) => {
                return (
                  <Link key={index} href={`/dashboard/${Quiz.courseCode}`}>
                    <div className="flex gap-3 bg-faidBlueShadow2 shadow-md rounded-md items-center justify-start p-5">
                      <MessageCircleQuestion className="text-faidMainBlue" />
                      <h1 className="text-black font-semibold">
                        {Quiz.courseCode}
                      </h1>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <>
              <div className="flex flex-col justify-center w-full items-center text-center my-5">
                <ImFilesEmpty size={40} color="red" />
                <h1 className="font-semibold text-lg">No Quiz Currently</h1>
                <p className="text-sm">
                  Hello {session?.user.name}, there no ongoing quiz for you
                  currently, check back later
                </p>
              </div>
            </>
          )}
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

export default UserDashboard;
