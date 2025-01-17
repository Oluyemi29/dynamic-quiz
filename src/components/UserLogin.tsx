"use client";
import Image from "next/image";
import React from "react";
import Quiz1 from "@/components/images/Quiz1.png";

import { Department, Levels } from "@/components/Categories";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { SelectContent } from "@radix-ui/react-select";
import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const UserLogin = () => {
  const router = useRouter();
  const formSchema = z.object({
    name: z.string().min(3, "Name too short").max(40, "Name too long"),
    matric: z
      .string()
      .min(8, "Matric No should be minimum of 8 digits")
      .max(14, "Matric No should be maximum of 14 digits"),
    department: z.string().min(1, "pls select your department"),
    level: z.string().min(1, "pls select your level"),
  });
  type formSchemaType = z.infer<typeof formSchema>;
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
  } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });
  const submit = async (value: formSchemaType) => {
    const { department, level, matric, name } = value;
    const result = await signIn("credentials", {
      department,
      level,
      matric,
      name,
      redirect: false,
    });
    if (result?.error) {
      if (result.error === "CredentialsSignin") {
        toast.error("Invalid Student login details");
      } else {
        toast.error("Pls check your network and try again");
      }
    } else {
      toast.success("Login was successfull");
      router.push("/dashboard");
    }
  };
  return (
    <div className="md:w-2/6 w-full p-5 my-5 rounded-lg border-2 ">
      <Image
        src={Quiz1}
        alt="Quiz"
        width={100}
        height={100}
        className="w-full mx-auto"
        priority
        quality={95}
      />
      <form
        onSubmit={handleSubmit(submit)}
        action=""
        method="post"
        className="flex flex-col gap-3 mt-5"
      >
        <Input
          {...register("name")}
          type="text"
          label={"Name"}
          isInvalid={!!errors.name}
          errorMessage={errors.name?.message}
        />
        <Input
          {...register("matric")}
          isInvalid={!!errors.matric}
          errorMessage={errors.matric?.message}
          type="number"
          label={"Matric Number"}
        />
        <Controller
          name="department"
          control={control}
          render={({ field: { onChange } }) => {
            return (
              <>
                <Select
                
                  {...register("department")}
                  onValueChange={(value) => onChange(value)}
                >
                  <SelectTrigger className="w-full h-14">
                    <SelectValue placeholder="Select your DepartMent" />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-10 rounded-md">
                    <SelectGroup>
                      <SelectLabel>Department</SelectLabel>
                      {Department.map((Depart) => {
                        return (
                          <SelectItem key={Depart} value={Depart}>
                            {Depart}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.department && (
                  <>
                    <p className="text-red-600 text-[0.7rem]">
                      {errors.department.message}
                    </p>
                  </>
                )}
              </>
            );
          }}
        />

        <Controller
          name="level"
          control={control}
          render={({ field: { onChange } }) => {
            return (
              <>
                <Select
                  {...register("level")}
                  onValueChange={(value) => onChange(value)}
                >
                  <SelectTrigger className="w-full h-14">
                    <SelectValue placeholder="Select your DepartMent" />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-10 rounded-md">
                    <SelectGroup>
                      <SelectLabel>Level</SelectLabel>
                      {Levels.map((level) => {
                        return (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.level && (
                  <>
                    <p className="text-red-600 text-[0.7rem]">
                      {errors.level.message}
                    </p>
                  </>
                )}
              </>
            );
          }}
        />
        {/* <Select label="Favorite Animal" placeholder="Select Your Level">
          {Department.map((depart) => (
            <SelectItem key={depart.key}>{depart.label}</SelectItem>
          ))}
        </Select>
        <Select
          name=""
          value={""}
          label="Favorite Animal"
          placeholder="Select Your Level"
        >
          {Levels.map((level) => (
            <SelectItem key={level.key}>{level.label}</SelectItem>
          ))}
        </Select> */}
        <Button
          type="submit"
          className="bg-faidBlue font-bold text-white h-14 mt-5"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default UserLogin;
