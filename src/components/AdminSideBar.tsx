import React from "react";
import { MdQuiz } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
// import { MdScore } from "react-icons/md";
import { MdFeedback } from "react-icons/md";
import { MdOutlineQuiz } from "react-icons/md";
import { FaStopCircle } from "react-icons/fa";
import Link from "next/link";

const AdminSideBar = () => {
  return (
    <div className="w-full flex flex-col h-screen gap-1 bg-faidBlue p-5 text-white">
      <h1 className="my-5 font-bold text-2xl">Welcome Admin</h1>
      <Link href={"/Admin/createQuiz"}>
        <div className="flex gap-3 hover:bg-slate-100 py-3 hover:animate-appearance-in hover:px-2 rounded-md hover:text-faidBlue items-center">
          <MdQuiz />
          <h1 className="">Create Quiz</h1>
        </div>
      </Link>
      <Link href={"/Admin/student"}>
        <div className="flex gap-3 hover:bg-slate-100 py-3 hover:animate-appearance-in hover:px-2 rounded-md hover:text-faidBlue items-center">
          <PiStudent />
          <h1 className="">Students</h1>
        </div>
      </Link>
      {/* <Link href={"/Admin/score"}>
        <div className="flex gap-3 hover:bg-slate-100 py-3 hover:animate-appearance-in hover:px-2 rounded-md hover:text-faidBlue items-center">
          <MdScore />
          <h1 className="">Scores</h1>
        </div>
      </Link> */}
      <Link href={"/Admin/feedback"}>
        <div className="flex gap-3 hover:bg-slate-100 py-3 hover:animate-appearance-in hover:px-2 rounded-md hover:text-faidBlue items-center">
          <MdFeedback />
          <h1 className="">FeedBacks</h1>
        </div>
      </Link>
      <Link href={"/Admin/ongoingQuiz"}>
        <div className="flex gap-3 hover:bg-slate-100 py-3 hover:animate-appearance-in hover:px-2 rounded-md hover:text-faidBlue items-center">
          <MdOutlineQuiz />
          <h1 className="">OnGoing Quiz</h1>
        </div>
      </Link>
      <Link href={"/Admin/endedQuiz"}>
        <div className="flex gap-3 hover:bg-slate-100 py-3 hover:animate-appearance-in hover:px-2 rounded-md hover:text-faidBlue items-center">
          <FaStopCircle />
          <h1 className="">Ended Quiz</h1>
        </div>
      </Link>
    </div>
  );
};

export default AdminSideBar;
