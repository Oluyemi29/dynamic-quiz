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
import { Button } from "@nextui-org/react";
import Modals from "./Modal";
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
  User: {
    id: string;
    name: string;
    matric: number;
    level: string;
    department: string;
    craetedAt: Date;
    updatedAt: Date;
  }[];
};
const AdminStudent = ({ department, User }: DepartProps) => {
  const [id, setId] = useState("");
  const [matricNo, setMatricNo] = useState("");
  const [name, setName] = useState("");
  const { data: session } = useSession();
  const checkDepartMent = session?.user?.department;
  const adminDepartment = department.find((AddDepart) => {
    return AddDepart.department === checkDepartMent;
  });
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <AdminNav />
      <h1 className="mt-5 font-semibold text-faidBlue">
        {adminDepartment?.department} Students Details
      </h1>
      <Table className="mt-5 ">
        <TableCaption>The List of Student Details</TableCaption>
        <TableHeader>
          <TableRow className="bg-faidBlue py-2 rounded-md hover:bg-faidBlue hover:text-white ">
            <TableHead className="font-bold text-white">S/N</TableHead>
            <TableHead className="font-bold text-white">Name</TableHead>
            <TableHead className="font-bold text-white">Matric No</TableHead>
            <TableHead className="font-bold text-white">Departmnt</TableHead>
            <TableHead className="font-bold text-white">Created Time</TableHead>
            <TableHead className="font-bold text-white">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {User.length > 0 ? (
            <>
              {User.map((Data, index) => {
                return (
                  <TableRow key={index} className="odd:bg-slate-100">
                    <TableCell className="font-semibold">1</TableCell>
                    <TableCell>{Data.name}</TableCell>
                    <TableCell>{Data.matric}</TableCell>
                    <TableCell className="">{Data.department}</TableCell>
                    <TableCell className="">
                      {Data.craetedAt.toDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        onPress={() => {
                          setIsOpen(true);
                          setMatricNo(Data.matric.toString());
                          setName(Data.name);
                          setId(Data.id);
                        }}
                        className="bg-red-600 text-white"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </>
          ) : (
            <>
              <h1 className="text-center font-semibold text-faidBlue">
                No User Currently
              </h1>
            </>
          )}
        </TableBody>
      </Table>
      <Modals
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        Title={`Delete ${name}`}
        Body={`Are u sure u want to delete ${name} details from the Register Students?, once delete, this Action can not be reversed`}
        id={id}
        matricNo={matricNo}
      />
    </div>
  );
};

export default AdminStudent;
