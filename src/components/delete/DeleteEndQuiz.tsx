"use client";
import { deleteEndQuiz } from "@/app/api/Action";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

type QuizProps = {
  id: string;
  couserCode: string;
  studySession: number;
};

const DeleteEndQuiz = ({ id, couserCode, studySession }: QuizProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    const result = await deleteEndQuiz(id);
    if (result === true) {
      toast.success("Quiz deleted Successfully");
    } else {
      toast.error("Error when trying to delete the Quiz");
    }
    setIsOpen(false);
  };
  return (
    <div>
      <Button
        onPress={() => {
          setIsOpen(true);
        }}
        className="bg-red-600 text-white"
      >
        Delete Quiz
      </Button>

      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">Title</ModalHeader>
            <ModalBody>
              <p>{`Are you sure you want to delete ${couserCode} Quiz study session ${studySession}, once delete, it can not be reversed`}</p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => setIsOpen(false)}
              >
                Close
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  handleDelete();
                }}
              >
                Yes
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DeleteEndQuiz;
