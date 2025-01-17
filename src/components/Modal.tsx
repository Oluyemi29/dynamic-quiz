"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { deleteUSer } from "@/app/api/Action";

type OpenProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  Title: string;
  Body: string;
  id: string;
  matricNo: string;
};
const Modals = ({
  isOpen,
  setIsOpen,
  Title,
  Body,
  id,
  matricNo,
}: OpenProps) => {
  const handleAction = async () => {
    if (!id || !matricNo) {
      setIsOpen(false);
      return;
    }
    await deleteUSer({ id, matricNo: Number(matricNo) });
    setIsOpen(false);
  };
  return (
    <div>
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
            <ModalHeader className="flex flex-col gap-1">{Title}</ModalHeader>
            <ModalBody>
              <p>{Body}</p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => setIsOpen(false)}
              >
                Close
              </Button>
              <Button color="primary" onPress={() => handleAction()}>
                Yes
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Modals;
