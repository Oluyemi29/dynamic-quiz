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
import AdminNav from "./AdminNav";
import { useSession } from "next-auth/react";

type DepartProps = {
  department: {
    id: string;
    email: string;
    password: string;
    department: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  Feedback: {
    id: string;
    department: string;
    courseCOde: string;
    level: string;
    studySession: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

const AdminFeedback = ({ department, Feedback }: DepartProps) => {
  const { data: session } = useSession();
  const checkDepartMent = session?.user?.department;
  const adminDepartment = department.find((AddDepart) => {
    return AddDepart.department === checkDepartMent;
  });
  return (
    <div>
      <AdminNav />
      <h1 className="mt-5 font-semibold text-faidBlue">
        {adminDepartment?.department} Students Feedback
      </h1>
      <Table className="mt-5 ">
        <TableCaption>FeedBacks so far</TableCaption>
        <TableHeader>
          <TableRow className="bg-faidBlue py-2 rounded-md hover:bg-faidBlue hover:text-white ">
            <TableHead className="font-bold text-white">S/N</TableHead>
            <TableHead className="font-bold text-white">Message</TableHead>
            <TableHead className="font-bold text-white">Departent</TableHead>
            <TableHead className="font-bold text-white">Code</TableHead>
            <TableHead className="font-bold text-white">S session</TableHead>
            <TableHead className="font-bold text-white">Level</TableHead>
            <TableHead className="font-bold text-white">Created Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Feedback.length > 0 ? (
            <>
              {Feedback.map((eachFeed, index) => {
                return (
                  <TableRow key={index} className="odd:bg-slate-100">
                    <TableCell className="font-semibold">1</TableCell>
                    <TableCell className="line-clamp-1">
                      {eachFeed.description}
                    </TableCell>
                    <TableCell >
                      {eachFeed.department}
                    </TableCell>
                    <TableCell >
                      {eachFeed.courseCOde}
                    </TableCell>
                    <TableCell >
                      {eachFeed.studySession}
                    </TableCell>
                    <TableCell >
                      {eachFeed.level}
                    </TableCell>
                    <TableCell className="">
                      {eachFeed.createdAt.toDateString()}
                    </TableCell>
                  </TableRow>
                );
              })}
            </>
          ) : (
            <>
              <h1 className="text-center text-faidBlue font-semibold">
                No feedback currently
              </h1>
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminFeedback;
