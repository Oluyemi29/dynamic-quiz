"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/welcome");
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);
  return (
    <div className="w-full h-screen justify-center flex flex-col items-center">
      <h1 className="text-6xl font-bold animate-pulse">QuizGo</h1>
    </div>
  );
}
