"use client";
import { submitFeedback } from "@/app/api/Action";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Textarea } from "@nextui-org/react";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const UserFeedback = () => {
  const formSchema = z.object({
    department: z
      .string()
      .min(1, "Department cant be empty")
      .max(50, "too much"),
    course: z.string().min(1, "Course cant be empty").max(50, "too much"),
    level: z.string().min(1, "Level cant be empty").max(50, "too much"),
    studySession: z.string().min(1, "Level cant be empty").max(50, "too much"),
    description: z.string().min(1, "Level cant be empty").max(200, "too much"),
  });
  type formSchemaType = z.infer<typeof formSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });
  const submit = async (value: formSchemaType) => {
    const { course, department, studySession, description, level } = value;
    const result = await submitFeedback({
      course,
      department,
      studySession,
      description,
      level,
    });
    if (result === true) {
      toast.success("feedback submitted anonymously");
    } else {
      toast.error("Error when submitting feedback");
    }
    reset();
  };
  return (
    <div className="w-full flex h-screen flex-col my-5 p-2 justify-center items-center">
      <div className="md:w-1/3 w-full md:shadow-md border-2 border-faidBlue md:rounded-lg p-5">
        <Link href={"/dashboard"}>
          <MoveLeft className="text-faidBlue" />
        </Link>
        <h1 className="text-sm font-semibold italic text-faidBlue my-5">
          Kindly Fill in your Quiz review or Feedback
        </h1>
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col gap-3"
          action=""
        >
          <Input
            {...register("department")}
            isInvalid={!!errors.department}
            errorMessage={errors.department?.message}
            label="Department"
          />
          <Input
            {...register("course")}
            isInvalid={!!errors.course}
            errorMessage={errors.course?.message}
            label="Corse Code"
          />
          <Input
            {...register("studySession")}
            isInvalid={!!errors.studySession}
            errorMessage={errors.studySession?.message}
            label="Study Session"
            type="number"
          />
          <Input
            {...register("level")}
            isInvalid={!!errors.level}
            errorMessage={errors.level?.message}
            label="Level"
          />
          <Textarea
            label="Description"
            {...register("description")}
            isInvalid={!!errors.description}
            errorMessage={errors.description?.message}
          />

          <Button className="mt-5 h-14 bg-faidBlue text-white" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UserFeedback;
