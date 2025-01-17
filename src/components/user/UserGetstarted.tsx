"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { MessageCircleQuestion } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Start from "@/components/images/Start.png";
import { useSession } from "next-auth/react";
import { updateSTartQuiz } from "@/app/api/Action";

type QuizCodeProps = {
  Quiz: {
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
  };
};

export default function UserGetStarted({ Quiz }: QuizCodeProps) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const userId = session?.user.id;
  const { id, timeDuration } = Quiz;
  const handleStart = async () => {
    setIsOpen(true);
    const startTime = new Date();
    const endTime = new Date(new Date().getTime() + timeDuration * 60 * 1000);
    await updateSTartQuiz({userId,quizId:id,startTime,endTime})
  };

  return (
    <>
      <div
        onClick={() => {
          setIsOpen(true);
        }}
        className="flex gap-3 cursor-pointer bg-faidBlueShadow2 shadow-md rounded-md items-center justify-between p-2"
      >
        <div className="flex flex-col gap-2">
          <div className="flex gap-3">
            <MessageCircleQuestion size={15} className="text-faidMainBlue" />
            <h1 className="text-black text-[0.8rem] font-semibold">
              {Quiz.courseCode} - SS {Quiz.studySession}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[0.6rem] font-semibold">
              {Quiz.startDate.toDateString()}
            </span>
            <span className="text-[0.6rem] font-semibold">
              {Quiz.endDate.toDateString()}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1 justify-between text-black">
          <p className="text-[0.6rem] font-semibold">remain 2 Attempt</p>
          <p className="text-[0.6rem] font-semibold">
            {Quiz.timeDuration} Minute
          </p>
        </div>
      </div>

      <Modal
        onClose={() => {
          setIsOpen(false);
        }}
        isOpen={isOpen}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Start {Quiz.courseCode} Quiz
          </ModalHeader>
          <ModalBody>
            <Image
              src={Start}
              alt="Start"
              width={100}
              height={100}
              quality={95}
              priority
              className="mx-auto w-40 h-32"
            />
            <p className="text-center text-sm font-semibold">
              Are You sure u want to Start {Quiz.courseCode} Quiz ?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={() => {
                setIsOpen(false);
              }}
            >
              Close
            </Button>
            <Link href={`/dashboard/${Quiz.courseCode}/${Quiz.id}`}>
            <Button
              color="primary"
              onPress={() => {
                handleStart();
              }}
            >
              Start
            </Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
