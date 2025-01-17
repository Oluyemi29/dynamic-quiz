"use client";
import { Button } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { Select, SelectItem } from "@nextui-org/react";
import type { Selection } from "@nextui-org/react";
import { submitQuestion } from "@/app/api/Action";
import Image from "next/image";

type QuestionProps = {
  AllQuestion: {
    question: string;
    id: string;
    options: string[];
    correctAnswer: string[];
    quetionType: string;
    questionImg: string | null;
    quizId: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  QuizDetails: {
    department: string;
    id: string;
    level: string;
    updatedAt: Date;
    createdAt: Date;
    courseCode: string;
    startDate: Date;
    endDate: Date;
    timeDuration: number;
    totalMark: number;
    attemptRound: number;
    studySession: number;
    gradingMethod: string;
  } | null;
  StartEndQuiz: {
    id: string;
    startTime: Date;
    endTime: Date;
    userId: string;
    quizId: string;
    attempted: number;
    createdAt: Date;
    updatedAt: Date;
  } | null;
};

type QuestType = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string[];
  quetionType: string;
  questionImg: string | null;
  quizId: string;
  createdAt: Date;
  updatedAt: Date;
} | null;

type AnswerProps = {
  questionId: string;
  userAnswer: string[];
};

const UserQuestion = ({
  AllQuestion,
  QuizDetails,
  StartEndQuiz,
}: QuestionProps) => {
  const [isStructural, setIsStructural] = useState("");
  const [values, setValues] = React.useState<Selection>(new Set([]));
  const router = useRouter();
  const [Answer, setAnswer] = useState<AnswerProps>({
    questionId: "",
    userAnswer: [""],
  });
  const [myquestion, setMyQuestion] = useState<QuestType>(null);
  const [allMostEnd, setAllMostEnd] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [remainingTime, setRemainingTime] = useState("");
  const { data: session } = useSession();
  const userDepartment = session?.user?.department;
  const userLevel = session?.user?.level;
  const userId = session?.user?.id as string;
  const quizId = QuizDetails?.id as string;

  useEffect(() => {
    const getQuestion = () => {
      setMyQuestion(AllQuestion[questionNumber]);
    };
    getQuestion();
  }, [AllQuestion, questionNumber]);

  useEffect(() => {
    const GetTheRemainingTime = () => {
      const Interval = setInterval(() => {
        const now = new Date().getTime();
        const endingTime = new Date(StartEndQuiz?.endTime as Date).getTime();

        const duration = endingTime - now;
        const HourCalculate = 24 * 60 * 60 * 1000;
        const MinuteCalculate = 60 * 60 * 1000;
        const SecondCalculate = 60 * 1000;
        const MiliSeconds = 1000;
        const Hour = Math.floor((duration % HourCalculate) / MinuteCalculate);
        const Minutes = Math.floor(
          (duration % MinuteCalculate) / SecondCalculate
        );
        const Seconds = Math.floor((duration % SecondCalculate) / MiliSeconds);
        if (Hour === 0 && Minutes === 0 && Seconds === 0) {
          return redirect("/dashboard");
        }
        if (Minutes < 1) {
          setAllMostEnd(true);
        }
        setRemainingTime(() => `${Hour} : ${Minutes} : ${Seconds}`);
      }, 1000);
      return () => clearInterval(Interval);
    };
    GetTheRemainingTime();
  }, [StartEndQuiz?.endTime, router]);

  if (!QuizDetails) {
    return redirect("/dashboard");
  }
  if (!StartEndQuiz) {
    return redirect("/dashboard");
  }
  if (StartEndQuiz.attempted > QuizDetails.attemptRound) {
    return redirect("/dashboard");
  }

  const EndingAlert =
    allMostEnd === true
      ? "text-[0.7rem] text-red-600 px-2 py-1 bg-white rounded-md w-max animate-pulse font-semibold"
      : "text-[0.7rem] bg-white w-max px-2 py-1 rounded-md font-semibold";

  const Mark = Math.floor(QuizDetails.totalMark / AllQuestion.length) as number;

  const handleNext = async () => {
    if (isStructural) {
      Answer.questionId = myquestion?.id as string;
      Answer.userAnswer.push(isStructural);
      const { questionId, userAnswer } = Answer;
      await submitQuestion({
        questId: questionId,
        userAnswer,
        correctMark: Mark,
        userId,
        quizId,
        correctAnswer: myquestion?.correctAnswer,
      });
      Answer.questionId = "";
      Answer.userAnswer = [];
      if (AllQuestion.length === questionNumber + 1) {
        return redirect(`/dashboard/score/${quizId}`);
      }

      setIsStructural(() => "");
      setQuestionNumber(questionNumber + 1);
      return;
    }
    const { questionId, userAnswer } = Answer;
    await submitQuestion({
      questId: questionId,
      userAnswer,
      correctMark: Mark,
      userId,
      quizId,
      correctAnswer: myquestion?.correctAnswer,
    });

    if (AllQuestion.length === questionNumber + 1) {
      return redirect(`/dashboard/score/${quizId}`);
    }

    setIsStructural(() => "");
    setQuestionNumber(questionNumber + 1);
  };
  const handlePrevious = () => {
    setQuestionNumber(questionNumber < 1 ? 0 : questionNumber - 1);
  };
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValues(new Set(e.target.value.split(",")));
    setAnswer((prevData) => {
      return {
        ...prevData,
        questionId: myquestion?.id as string,
        userAnswer: e.target.value.split(","),
      };
    });
  };

  const QuestOption = [
    myquestion
      ? myquestion?.options.map((Opts) => {
          return { key: Opts, label: Opts };
        })
      : [{ key: "", label: "" }],
  ][0];
  const parts = myquestion?.question.split("?");
  return (
    <div className="w-full flex h-screen my-5 p-2 flex-col justify-center items-center">
      <div className="md:w-1/3 w-full md:shadow-md md:rounded-lg">
        <div className="w-full p-5 bg-faidMainBlue flex justify-between items-center rounded-lg">
          <div>
            <div className="text-white flex text-[0.6rem] gap-2">
              <p className="font-semibold">{session?.user?.name}</p>
              <p className="font-semibold">{session?.user?.matric}</p>
            </div>
            <div className="text-white flex text-[0.6rem] gap-2">
              <p className="font-semibold">{userDepartment}</p>
            </div>
            <div className="text-white flex text-[0.6rem] gap-2">
              <p className="font-semibold">{userLevel}</p>
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-[0.7rem] font-semibold text-white">{`${QuizDetails.courseCode}`}</h1>
            <h1 className="text-[0.7rem] font-semibold text-white">{`Question ${
              questionNumber + 1
            }`}</h1>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-[0.7rem] text-white font-semibold">
              Time Remaining
            </h1>
            <h1 className={`${EndingAlert}`}>{remainingTime}</h1>
          </div>
        </div>
        <h1 className="p-5 font-semibold text-black">
          {session?.user.department} Question {questionNumber + 1}
        </h1>
        <div className="flex bg-faidBlueShadow2 rounded-md w-[90%] mx-auto p-5 flex-col gap-4">
          <h1 className="text-[0.7rem] font-semibold">
            Question {questionNumber + 1}
          </h1>

          <div>
            {myquestion?.quetionType.includes("(Single blank)") ||
            myquestion?.quetionType.includes("(Multiple blanks)") ||
            myquestion?.quetionType.includes("(Structural)") ? (
              <>
                {myquestion?.questionImg && (
                  <>
                    <Image
                      src={myquestion?.questionImg as string}
                      alt="Quiz"
                      width={100}
                      height={100}
                      className="w-20 h-20 rounded-md mx-auto my-3"
                      priority
                      quality={95}
                    />
                  </>
                )}
                <h1 className="text-medium my-3 font-semibold">
                  {parts?.map((part, index) => (
                    <React.Fragment key={index}>
                      {part}
                      {index < parts.length - 1 && (
                        <input
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setIsStructural(e.target.value)
                          }
                          value={isStructural}
                          className="w-full h-12 border-2 border-black pl-4 mt-5 rounded-md text-medium"
                          type="text"
                          placeholder="Answer here"
                        />
                      )}
                    </React.Fragment>
                  ))}
                </h1>
              </>
            ) : (
              <>
                {myquestion?.questionImg && (
                  <>
                    <Image
                      src={myquestion?.questionImg as string}
                      alt="Quiz"
                      width={100}
                      height={100}
                      className="w-20 h-20 rounded-md mx-auto my-3"
                      priority
                      quality={95}
                    />
                  </>
                )}
                <h1 className="text-medium my-3 font-semibold">
                  {myquestion?.question}
                </h1>
              </>
            )}
            {myquestion?.quetionType === "Ordering/Sequencing" && (
              <>
                <Select
                  className="max-w-xs"
                  label="Pick Answer Sequencially"
                  placeholder="Pick Answer Sequencially"
                  selectedKeys={values}
                  selectionMode="multiple"
                  onChange={handleSelectionChange}
                >
                  {QuestOption.map((QuestOpt) => (
                    <SelectItem key={QuestOpt.key}>{QuestOpt.label}</SelectItem>
                  ))}
                </Select>
              </>
            )}
            {myquestion?.quetionType ===
              "Objective (Single correct answer)" && (
              <>
                <Select
                  className="max-w-xs"
                  label="Choose correct Answer"
                  placeholder="Choose correct Answer"
                  selectedKeys={values}
                  selectionMode="single"
                  onChange={handleSelectionChange}
                >
                  {QuestOption.map((QuestOpt) => (
                    <SelectItem key={QuestOpt.key}>{QuestOpt.label}</SelectItem>
                  ))}
                </Select>
              </>
            )}
            {myquestion?.quetionType ===
              "Objective (Multiple correct answers)" && (
              <>
                <Select
                  className="max-w-xs"
                  label="Pick All Correct answer"
                  placeholder="Pick All Correct answer"
                  selectedKeys={values}
                  selectionMode="multiple"
                  onChange={handleSelectionChange}
                >
                  {QuestOption.map((QuestOpt) => (
                    <SelectItem key={QuestOpt.key}>{QuestOpt.label}</SelectItem>
                  ))}
                </Select>
              </>
            )}
          </div>
          <div className="flex justify-between items-center w-full">
            {questionNumber > 0 && (
              <>
                <Button
                  onPress={() => {
                    handlePrevious();
                  }}
                  size="sm"
                  className="w-max text-[0.8rem] bg-faidBlue text-white font-semibold"
                >
                  Previous
                </Button>
              </>
            )}
            <div className="flex w-full justify-end items-center">
              <Button
                onPress={() => {
                  handleNext();
                }}
                size="sm"
                className="w-max text-[0.8rem] bg-faidBlue text-white font-semibold"
              >
                {AllQuestion.length === questionNumber + 1 ? "Submit" : "Next"}
              </Button>
            </div>
          </div>
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

export default UserQuestion;
