"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AdminNav from "./AdminNav";
import ScoreEditModel from "./ScoreEditModel";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { useSession } from "next-auth/react";

type OverAllProps = {
  Overall: string;
  department: {
    id: string;
    email: string;
    password: string;
    department: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

export const animals = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
  { key: "lion", label: "Lion" },
  { key: "tiger", label: "Tiger" },
  { key: "giraffe", label: "Giraffe" },
  { key: "dolphin", label: "Dolphin" },
  { key: "penguin", label: "Penguin" },
  { key: "zebra", label: "Zebra" },
  { key: "shark", label: "Shark" },
  { key: "whale", label: "Whale" },
  { key: "otter", label: "Otter" },
  { key: "crocodile", label: "Crocodile" },
];
const AdminStudentScore = ({ Overall, department }: OverAllProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const checkDepartMent = session?.user?.department;
  const AdminDepartment = department.find((AddDepart) => {
    return AddDepart.department === checkDepartMent;
  });
  return (
    <div>
      <AdminNav />
      <h1 className="mt-5 font-semibold text-faidBlue">
        {AdminDepartment?.department} Students Scores
      </h1>
      <Select
        className="md:w-1/4 mt-2"
        items={animals}
        label="Course"
        placeholder="Select a Course"
      >
        {(animal) => <SelectItem>{animal.label}</SelectItem>}
      </Select>
      <Table className="mt-5 ">
        <TableCaption>The List of Student Scores</TableCaption>
        <TableHeader>
          <TableRow className="bg-faidBlue py-2 rounded-md hover:bg-faidBlue hover:text-white ">
            <TableHead className="font-bold text-white">S/N</TableHead>
            <TableHead className="font-bold text-white">Name</TableHead>
            <TableHead className="font-bold text-white">Matric No</TableHead>
            <TableHead className="font-bold text-white">Score</TableHead>
            <TableHead className="font-bold text-white">Edit Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="odd:bg-slate-100">
            <TableCell className="font-semibold">1</TableCell>
            <TableCell>Oluyemi</TableCell>
            <TableCell>20001213</TableCell>
            <TableCell className="">38 / 40</TableCell>
            <TableCell>
              <Button
                onPress={() => {
                  setIsOpen(true);
                }}
                className="bg-faidBlue text-white"
              >
                Edit Score
              </Button>
            </TableCell>
          </TableRow>
          <TableRow className="odd:bg-slate-100">
            <TableCell className="font-semibold">1</TableCell>
            <TableCell>Oluyemi</TableCell>
            <TableCell>20001213</TableCell>
            <TableCell className="">38 / 40</TableCell>
            <TableCell>
              <Button
                onPress={() => {
                  setIsOpen(true);
                }}
                className="bg-faidBlue text-white"
              >
                Edit Score
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <ScoreEditModel
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        Title="Edit Oluyemi Score"
        Body="Kindly enter the new score to be updated for Oluyemi"
        Label="New Score"
        Overall={Overall}
      />
    </div>
  );
};

export default AdminStudentScore;
