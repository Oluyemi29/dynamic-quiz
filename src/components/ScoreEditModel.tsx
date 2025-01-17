"use client";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";

type ScoreProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  Title: string;
  Body: string;
  Label: string;
  Overall: string;
};
const ScoreEditModel = ({
  isOpen,
  setIsOpen,
  Title,
  Body,
  Label,
  Overall,
}: ScoreProps) => {
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
              <Input label={Label} endContent={`/${Overall}`} />
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => setIsOpen(false)}
              >
                Close
              </Button>
              <Button color="primary" onPress={() => setIsOpen(false)}>
                Action
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ScoreEditModel;
