"use client";
import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import React from "react";

const SignOut = () => {
  return (
    <div>
      <Button
        onPress={() => {
          signOut();
        }}
        className="text-white bg-red-600 border-2 border-red-600/50"
      >
        Sign Out
      </Button>
    </div>
  );
};

export default SignOut;
