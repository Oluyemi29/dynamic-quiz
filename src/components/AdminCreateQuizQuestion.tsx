"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Camera } from "lucide-react";
import Image from "next/image";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { Questiontype } from "./Categories";
import AdminNav from "./AdminNav";
import { useSession } from "next-auth/react";
import { createQuestion } from "@/app/api/Action";
import { useRouter } from "next/navigation";

type QuizDetails = {
  quizDetails: {
    id: string;
    courseCode: string;
    studySession: number;
    department: string;
  }[];
};

const AdminCreateQuizQuestion = ({ quizDetails }: QuizDetails) => {
  const router = useRouter();
  const { data: session } = useSession();
  const myDepartment = session?.user.department as string;
  const quizInfo = quizDetails.filter((details) => {
    return details.department === myDepartment;
  });
  const cloudName = "devoluyemi";
  const upload_preset = "quizapplication";
  const defaultQuestImg =
    "https://i.pinimg.com/736x/71/04/81/710481d3edf7d59107623e3c75b3c511.jpg";
  const [objetives, setObjective] = useState({
    question: "",
    option: "",
  });
  const [availableOption, setAvailableOption] = useState<string[]>([]);
  const [CorrectAnswer, setCorrectAnswer] = useState<string[]>([]);
  const [questType, setQuestType] = useState("");
  const [questImage, setQuestImage] = useState<Blob>(new Blob());
  const [previewImage, setPreviewImage] = useState(defaultQuestImg);
  const [courseCodeId, setCourseCodeId] = useState("");

  const handleObjectiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setObjective((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const getImagelinks = async () => {
    const ImageDetails = new FormData();

    ImageDetails.append("file", questImage);
    ImageDetails.append("upload_preset", upload_preset);

    const data = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: ImageDetails,
      }
    );
    const response = await data.json();
    return response.url;
  };
  const handleObjectiveOption = () => {
    const { option, question } = objetives;
    if (question !== "" && option !== "" && questType !== "") {
      if (questType.startsWith("Fill") || questType.includes("Structural")) {
        if (!question.includes("?")) {
          toast.error(
            "pls add ? to indicate where user will fill in the question"
          );
        } else if (questType.includes("Single blank")) {
          if (availableOption.length < 1) {
            setAvailableOption((prevData) => [...prevData, option]);
          }
        } else {
          if (!availableOption.includes(option)) {
            setAvailableOption((prevData) => [...prevData, option]);
          }
        }
      } else {
        if (!availableOption.includes(option)) {
          setAvailableOption((prevData) => [...prevData, option]);
        }
      }
    }
    setObjective((prevData) => {
      return {
        ...prevData,
        option: "",
      };
    });
  };

  const handleSubmitQuestion = async () => {
    const imageLink = await getImagelinks();
    const { question } = objetives;
    if (
      !question ||
      availableOption.length < 1 ||
      CorrectAnswer.length < 1 ||
      !questType ||
      !courseCodeId ||
      (questType.startsWith("Image-Based") && !imageLink)
    ) {
      toast.error("kindly fill all input");
    } else {
      const result = await createQuestion({
        courseCodeId,
        question,
        availableOption,
        CorrectAnswer,
        questType,
        questionImg: imageLink as string | null | undefined,
      });
      if (result !== true) {
        toast.error("An error occur when creating the question");
      } else {
        toast.success("Question Added success");
      }
      router.refresh();

      setObjective((prevData) => {
        return {
          ...prevData,
          question: "",
          option: "",
        };
      });
      setAvailableOption(() => []);
      setCorrectAnswer(() => []);
      setPreviewImage("");
      setQuestImage(new Blob());
    }
  };

  return (
    <div>
      <AdminNav />
      <h1 className="text-[0.7rem] mb-1 mt-4 text-faidBlue font-semibold">
        Select {session?.user.department} Quiz Coursecode and StudySession
      </h1>
      <div className="grid grid-cols-3">
        <Select
          className="w-full col-span-2 mt-2"
          items={quizInfo}
          label="Question type"
          onSelectionChange={(value) => {
            setCourseCodeId(value.currentKey as string);
          }}
        >
          {(quizInfo) => (
            <SelectItem>{`${quizInfo.courseCode} - Study Session ${quizInfo.studySession}`}</SelectItem>
          )}
        </Select>
      </div>
      <h1 className="text-lg underline my-5 text-center text-faidBlue font-semibold">
        Set {session?.user.department} Quiz Question and Answer here
      </h1>
      <div className="flex w-full my-10 px-5 justify-between gap-5">
        <div className="w-1/3">
          <h1 className="text-[0.7rem] mb-1 mt-4 text-faidBlue font-semibold">
            Pick Question type
          </h1>
          <Select
            className="w-full mt-2"
            items={Questiontype}
            label="Question type"
            onChange={(e) => {
              setQuestType(e.target.value);
              setObjective((prevData) => {
                return {
                  ...prevData,
                  option: "",
                  question: "",
                };
              });
              setQuestImage(new Blob());
              setPreviewImage("");
              setAvailableOption([]);
              setCorrectAnswer([]);
            }}
          >
            {(Questiontype) => <SelectItem>{Questiontype.label}</SelectItem>}
          </Select>
        </div>
        <div className="w-2/3">
          <div className="w-full flex flex-col gap-3">
            {questType.startsWith("Image-Based") && (
              <>
                <div className="grid grid-cols-2 w-full items-start py-3">
                  <div className="w-full flex justify-center  ">
                    <label className="w-2/4 cursor-pointer h-20 flex flex-col bg-stone-200 rounded-md justify-center items-center ">
                      <input
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          if (e.target.files) {
                            setQuestImage(e.target.files[0]);
                          }
                          if (e.target.value && e.target.files) {
                            setPreviewImage(
                              URL.createObjectURL(e.target.files[0])
                            );
                          }
                        }}
                        type="file"
                        hidden
                      />
                      <Camera size={40} className="" strokeWidth={1.75} />
                      <p className="text-[0.6rem] font-semibold text-foreground">
                        Choose Image
                      </p>
                    </label>
                  </div>
                  <div className="w-full flex justify-center h-20">
                    <Image
                      src={previewImage ? previewImage : defaultQuestImg}
                      alt="questImg"
                      width={100}
                      height={100}
                      priority
                      quality={95}
                      className="mx-auto rounded-md"
                    />
                  </div>
                </div>
              </>
            )}
            <Textarea
              name="question"
              value={objetives.question}
              onChange={(e) => {
                handleObjectiveChange(e);
              }}
              label={"Type the question here"}
            />
            <Input
              type="text"
              name="option"
              value={objetives.option}
              onChange={(e) => {
                handleObjectiveChange(e);
              }}
              label={
                questType.startsWith("Fill")
                  ? "Enter Answer"
                  : questType.startsWith("Ordering")
                  ? "Enter answer non sequencially"
                  : "Add option"
              }
            />
            <Button
              onPress={() => {
                handleObjectiveOption();
              }}
              className="max-w-max px-5 mx-auto bg-faidBlue text-white"
              type="button"
            >
              {questType.startsWith("Fill")
                ? "Enter Answer"
                : questType.startsWith("Ordering")
                ? "Enter answer"
                : "Add Option"}
            </Button>
          </div>
          <div className="mb-3 flex mt-3 flex-col gap-3">
            <p className="text-[0.7rem] font-semibold text-faidBlue">
              {availableOption.length > 0 && questType.startsWith("Fill")
                ? "Click on All answer to select them"
                : availableOption.length > 0 &&
                  questType.startsWith("Objective")
                ? "Click on Correct answer(s)"
                : availableOption.length > 0 && questType.startsWith("Ordering")
                ? "Click answer sequencially"
                : availableOption.length > 0 &&
                  questType.startsWith("Image-Based")
                ? "Click on the correct answer(s)"
                : ""}{" "}
            </p>
            <div className="grid grid-cols-4 w-full gap-3">
              {availableOption.length > 0 && (
                <>
                  {availableOption.map((AvailOpt, index) => {
                    return (
                      <Button
                        className={
                          CorrectAnswer.includes(AvailOpt)
                            ? "bg-faidBlue text-white"
                            : "border-2 border-faidBlue bg-transparent text-faidBlue font-semibold"
                        }
                        key={index}
                        value={AvailOpt}
                        type="button"
                        onPress={() => {
                          if (CorrectAnswer.includes(AvailOpt)) {
                            setCorrectAnswer((prevAnswer) =>
                              prevAnswer.filter((index) => index !== AvailOpt)
                            );
                          } else {
                            if (
                              questType.includes("Single correct answer") ||
                              questType.includes("True/False") ||
                              questType.includes(
                                "Image-Based Questions (Objective)"
                              )
                            ) {
                              if (CorrectAnswer.length < 1) {
                                setCorrectAnswer((prevOption) => [
                                  ...prevOption,
                                  AvailOpt,
                                ]);
                              }
                            } else {
                              setCorrectAnswer((prevOption) => [
                                ...prevOption,
                                AvailOpt,
                              ]);
                            }
                          }
                        }}
                      >
                        {AvailOpt}
                      </Button>
                    );
                  })}
                </>
              )}
            </div>
          </div>

          <Button
            type="button"
            onPress={() => {
              handleSubmitQuestion();
            }}
            className="text-white bg-faidBlue"
          >
            Submit Question
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateQuizQuestion;
