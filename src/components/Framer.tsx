"use client";
import React from "react";
import { motion } from "framer-motion";

const Framer = () => {
  return (
    <div>
      <motion.div
        initial={{ color: "yellow", opacity: 1 }}
        animate={{
          color: "blue",
          opacity: 1,
          transition: {
            delay: 2,
            stiffness: 2000,
            type: "spring",
            when: "beforeChildren",
            staggerChildren: 1,
          },
        }}
      >
        <h1>awayu</h1>
        <motion.p
          initial={{ color: "red", fontSize: "20px" }}
          animate={{
            color: "green",
            fontSize: "100px",
            transition: { delay: 3, duration: 5 },
          }}
        >
          How are u
        </motion.p>
      </motion.div>
      <motion.h1 whileHover={{ textShadow: "2px 2px 2px gray" }}>
        Hello World
      </motion.h1>
      <motion.button>Submit</motion.button>
    </div>
  );
};

export default Framer;
