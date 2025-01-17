"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import AdminNav from "./AdminNav";
import { useSession } from "next-auth/react";
import DeleteOngoingQuiz from "./delete/DeleteOngoingQuiz";

type DepartProps = {
  department: {
    id: string;
    email: string;
    password: string;
    department: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  quizOn: {
    id: string;
    department: string;
    courseCode: string;
    startDate: Date;
    endDate: Date;
    studySession: number;
  }[];
};

const AdminOngoingQuiz = ({ department, quizOn }: DepartProps) => {
  const { data: session } = useSession();
  const checkDepartMent = session?.user?.department;
  const adminDepartment = department.find((AddDepart) => {
    return AddDepart.department === checkDepartMent;
  });
  const AllQuiz = quizOn.filter((Quizes) => {
    return Quizes.department === checkDepartMent;
  });
  const OnQuiz = AllQuiz.filter((AQuizes) => {
    const todayDate = new Date();
    const endDate = new Date(AQuizes.endDate);
    return todayDate <= endDate;
  });

  return (
    <div>
      <AdminNav />
      <h1 className="mt-5 font-semibold text-faidBlue">
        {adminDepartment?.department} Students Ongoing Quiz
      </h1>
      <Table className="mt-5 ">
        <TableCaption className="font-semibold text-faidBlue">
          {OnQuiz.length > 0
            ? "List Of Ongoing Quiz"
            : "No Quiz Ongoing currently"}
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-faidBlue py-2 rounded-md hover:bg-faidBlue hover:text-white ">
            <TableHead className="font-bold text-white">S/N</TableHead>
            <TableHead className="font-bold text-white">Course</TableHead>
            <TableHead className="font-bold text-white">S Ssession</TableHead>
            <TableHead className="font-bold text-white">Start date</TableHead>
            <TableHead className="font-bold text-white">End date</TableHead>
            <TableHead className="font-bold text-white">Edit</TableHead>
            <TableHead className="font-bold text-white">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {OnQuiz.length > 0 &&
            OnQuiz.map((QuizIndex, index) => {
              return (
                <TableRow key={index} className="odd:bg-slate-100">
                  <TableCell className="font-semibold">{index + 1}</TableCell>
                  <TableCell className="">{QuizIndex.courseCode}</TableCell>
                  <TableCell className="">{QuizIndex.studySession}</TableCell>
                  <TableCell className="">
                    {QuizIndex.startDate.toDateString()}
                  </TableCell>
                  <TableCell className="">
                    {QuizIndex.endDate.toDateString()}
                  </TableCell>
                  <TableCell>
                    <Link href={`/Admin/editQuiz/${QuizIndex.id}`}>
                      <Button className="bg-faidBlue text-white">
                        Edit Quiz
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <DeleteOngoingQuiz
                      id={QuizIndex.id as string}
                      couserCode={QuizIndex.courseCode as string}
                      studySession={QuizIndex.studySession as number}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminOngoingQuiz;
