"use client";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Quiz1 from "@/components/images/Quiz1.png";
import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Department } from "./Categories";

const AdminLogin = () => {
  const { pending } = useFormStatus();
  const router = useRouter();
  const formSchema = z.object({
    email: z.string().email("not an email format"),
    password: z
      .string()
      .min(4, "Password length too low")
      .max(20, "Password length too much"),
    department: z.string(),
  });
  type formSchemaType = z.infer<typeof formSchema>;
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    reset,
  } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });
  const submit = async (data: formSchemaType) => {
    const { email, password, department } = data;

    try {
      const result = await signIn("credentials", {
        email: email,
        password: password,
        department: department,
        redirect: false,
      });

      if (result?.error) {
        if (result.error === "CredentialsSignin") {
          toast.error("Invalid Admin Login details");
        } else {
          toast.error("pls check your internet connection and try again");
        }
      } else {
        toast.success("Login Successfully");
        router.push("/Admin/student");
      }
    } catch (error) {
      console.log(error);
    }
    reset();
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="md:w-2/6 w-full p-5 rounded-lg border-2 ">
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
            label={"Email address"}
            {...register("email")}
            errorMessage={errors?.email?.message}
            isInvalid={!!errors.email}
          />
          <Input
            label={"Password"}
            {...register("password")}
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password}
          />
          <div>
            <Controller
              name="department"
              control={control}
              render={({ field: { onChange } }) => {
                return (
                  <Select
                    {...register("department")}
                    onValueChange={(value) => onChange(value)}
                  >
                    <SelectTrigger className="w-full h-14">
                      <SelectValue placeholder="Select your DepartMent" />
                    </SelectTrigger>
                    <SelectContent>
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
                );
              }}
            />
            <p className="text-[0.6rem] text-red-600">
              {errors.department && errors.department.message}
            </p>
          </div>
          <Button
            type="submit"
            className="bg-faidBlue font-bold text-white h-14 mt-5"
            disabled={pending}
          >
            {pending ? (
              <Loader2 className="animate-spinner-linear-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
