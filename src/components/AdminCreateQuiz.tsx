"use client";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import React, { useState } from "react";
import AdminNav from "./AdminNav";
import { AllLevels, GradingMethod } from "./Categories";
import { useSession } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";
import { createQuiz } from "@/app/api/Action";

type DepartProps = {
  department: {
    id: string;
    email: string;
    password: string;
    department: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

const AdminCreateQuiz = ({ department }: DepartProps) => {
  const { data: session } = useSession();
  const checkDepartMent = session?.user.department;
  const AdminDetails = department.find((AddDetail) => {
    return AddDetail.department === checkDepartMent;
  });

  const [gradeMethod, setGradeMethod] = useState("");
  const [level, setLevel] = useState("");
  const [quizDetails, setQuizDetails] = useState({
    courseCode: "",
    startDate: "",
    endDate: "",
    timeDuration: "",
    totalMark: "",
    attemptRound: "",
    studySession: "",
  });

  const handleQuizChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQuizDetails((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const {
        attemptRound,
        courseCode,
        endDate,
        startDate,
        studySession,
        timeDuration,
        totalMark,
      } = quizDetails;
      if (
        !attemptRound ||
        !courseCode ||
        !endDate ||
        !gradeMethod ||
        !startDate ||
        !studySession ||
        !timeDuration ||
        !totalMark ||
        !level
      ) {
        toast.error("All field are required");
      } else {
        const result = await createQuiz({
          attemptRound,
          courseCode,
          endDate,
          gradeMethod,
          startDate,
          department: AdminDetails?.department as string,
          studySession,
          timeDuration,
          totalMark,
          level,
        });

        if (result !== true) {
          toast.error(
            "Quiz Details Already created, proceed to question setting"
          );
        } else {
          toast.success("successfull, kindly proceed to set question");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <AdminNav />
      <h1 className="mt-5 font-semibold text-faidBlue">
        Create {AdminDetails?.department} Student Quiz here
      </h1>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          handleSubmit(e);
        }}
        action=""
        method="post"
      >
        <div className="grid grid-cols-3 justify-center my-5 gap-5 w-full px-5">
          <div className="w-full">
            <h1 className="text-[0.7rem] mb-2 text-faidBlue font-semibold">
              Enter Quiz Course Code
            </h1>
            <Input
              className="w-full cursor-pointer"
              label={"Enter Quiz Course Code"}
              type="text"
              value={quizDetails.courseCode}
              name="courseCode"
              onChange={(e) => {
                handleQuizChange(e);
              }}
              required
            />
          </div>
          <div className="w-full">
            <h1 className="text-[0.7rem] mb-2 text-faidBlue font-semibold">
              Enter Quiz Start Date
            </h1>
            <Input
              className="w-full cursor-pointer"
              label={"Enter Quiz Start Date"}
              type="date"
              value={quizDetails.startDate}
              name="startDate"
              onChange={(e) => {
                handleQuizChange(e);
              }}
              required
            />
          </div>
          <div className="w-full">
            <h1 className="text-[0.7rem] mb-2 text-faidBlue font-semibold">
              Enter Quiz End Date
            </h1>
            <Input
              className="w-full cursor-pointer"
              label={"Enter Quiz End Date"}
              type="date"
              value={quizDetails.endDate}
              name="endDate"
              onChange={(e) => {
                handleQuizChange(e);
              }}
              required
            />
          </div>
          <div className="w-full">
            <h1 className="text-[0.7rem] mb-2 text-faidBlue font-semibold">
              Enter Quiz Time Duration
            </h1>
            <Input
              label={"Enter time Quiz Duration"}
              type="number"
              endContent={"Minutes"}
              className="w-full"
              value={quizDetails.timeDuration}
              name="timeDuration"
              onChange={(e) => {
                handleQuizChange(e);
              }}
              required
            />
          </div>
          <div className="w-full">
            <h1 className="text-[0.7rem] mb-2 text-faidBlue font-semibold">
              Enter Quiz Total Mark
            </h1>
            <Input
              label={"Enter Quiz Total Mark"}
              type="number"
              endContent={"Marks"}
              className="w-full"
              value={quizDetails.totalMark}
              name="totalMark"
              onChange={(e) => {
                handleQuizChange(e);
              }}
              required
            />
          </div>
          <div className="w-full">
            <h1 className="text-[0.7rem] mb-2 text-faidBlue font-semibold">
              Enter Quiz Attempts round
            </h1>
            <Input
              label={"Enter Quiz Attempts round"}
              type="number"
              endContent={"Attempt"}
              className="w-full"
              value={quizDetails.attemptRound}
              name="attemptRound"
              onChange={(e) => {
                handleQuizChange(e);
              }}
              required
            />
          </div>
          <div className="w-full">
            <h1 className="text-[0.7rem] mb-2 text-faidBlue font-semibold">
              Enter Quiz Grading Method
            </h1>
            <Select
              className="w-full"
              items={GradingMethod}
              label="Select Grading Method"
              onSelectionChange={(value) => {
                setGradeMethod(value.currentKey as string);
              }}
              required
            >
              {(GradingMethod) => (
                <SelectItem>{GradingMethod.label}</SelectItem>
              )}
            </Select>
          </div>
          <div className="w-full">
            <h1 className="text-[0.7rem] mb-2 text-faidBlue font-semibold">
              Enter Level for this Quiz
            </h1>
            <Select
              className="w-full"
              items={AllLevels}
              label="Select Grading Method"
              onSelectionChange={(value) => {
                setLevel(value.currentKey as string);
              }}
              required
            >
              {(AllLevels) => <SelectItem>{AllLevels.label}</SelectItem>}
            </Select>
          </div>
          <div className="w-full">
            <h1 className="text-[0.7rem] mb-2 text-faidBlue font-semibold">
              Enter Quiz Study Session
            </h1>
            <Input
              label={"Enter Quiz Study Session"}
              type="number"
              startContent={"SS"}
              className="w-full"
              value={quizDetails.studySession}
              name="studySession"
              onChange={(e) => {
                handleQuizChange(e);
              }}
              required
            />
          </div>
        </div>
        <div className="flex justify-between px-5 w-full mt-10">
          <Button
            type="submit"
            className="bg-faidBlue text-white font-semibold"
          >
            Create Quiz Details
          </Button>
          <Link href={"/Admin/createQuiz/question"}>
            <Button
              type="button"
              className="bg-faidBlue text-white font-semibold"
            >
              Proceed
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AdminCreateQuiz;
