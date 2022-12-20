import React from "react";
import { Modal } from "../views/Main";
import { useWords } from "../hooks/word-hooks";

export const Header = () => {
  const { showModal, modalTitle, modalMessage, answer } = useWords();
  return (
    <div
      style={{
        // borderBottom: "solid 1px #CA0529",
        maxWidth: "100vw",
      }}
      className="mx-auto w-96 pb-4"
    >
      <h1 className="text-white mt-1 text-4xl text-center font-black uppercase tracking-wider">
        Britle
      </h1>
      <div className="flex justify-center relative mt-5">
        <Modal
          show={showModal}
          title={modalTitle}
          message={modalMessage}
          answer={answer}
        />
      </div>
    </div>
  );
};
