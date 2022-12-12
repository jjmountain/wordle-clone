import { useEffect } from "react";

import { useWords } from "../hooks/word-hooks";
import { Header } from "../components/Header";
import { Keyboard } from "../components/Keyboard";

import { solution_word, VALIDLETTERS, createArray } from "../lib/words";
import { motion } from "framer-motion";
import React from "react";

const LetterBack = (props) => {
  const letterState = () => {
    if (props.letter && props.attempted) {
      return "flip";
    } else if (props.letter) {
      return "show";
    } else {
      return "hidden";
    }
  };

  const itemCounterSpinVariants = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 0,
    },
    flip: {
      rotateX: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <>
      <motion.div
        className={`h-14 w-14`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          rotateX: 180,
          backgroundColor: props.color,
          color: "white",
          backfaceVisibility: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        variants={itemCounterSpinVariants}
        animate={letterState}
      >
        <motion.span className="font-bold text-3xl" animate={{ rotateX: 180 }}>
          {" "}
          {props.letter}{" "}
        </motion.span>
      </motion.div>
    </>
  );
};

const LetterFront = (props) => {
  const letterState = () => {
    if (props.letter && props.attempted) {
      return "flip";
    } else if (props.letter) {
      return "show";
    } else {
      return "hidden";
    }
  };

  const itemSpinVariants = {
    hidden: {
      rotateX: 0,
      scale: 0,
    },
    show: {
      rotateX: 0,
      scale: 1,
    },
    flip: {
      rotateX: 180,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <>
      <motion.div
        className="h-14 w-14 border font-bold text-3xl text-gray-200"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          backfaceVisibility: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        variants={itemSpinVariants}
        animate={letterState}
      >
        {props.letter}
      </motion.div>
    </>
  );
};

const Letter = (props) => {
  const letterState = () => {
    if (props.letter && props.attempted) {
      return "flip";
    } else if (props.letter) {
      return "show";
    } else {
      return "hidden";
    }
  };

  const letterVariant = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.7,
        duration: 0.9,
      },
    },
    flip: {
      rotateX: 180,
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  };
  return (
    <div
      className={`${
        props.letter
          ? "h-14 w-14 flex justify-center grow shrink mx-0.5"
          : "border border-gray-300 h-14 w-14 flex justify-center grow shrink mx-0.5 "
      }`}
    >
      <motion.div
        variants={letterVariant}
        animate={letterState}
        className={`${
          letterState === "show"
            ? "h-full w-full flex border border-gray-500 justify-center items-center grow shrink relative text-xl font-semibold text-gray-900"
            : "h-full w-full flex justify-center items-center grow shrink relative text-xl"
        }`}
      >
        <LetterFront letter={props.letter} attempted={props.attempted} />
        <LetterBack
          letter={props.letter}
          attempted={props.attempted}
          color={props.color}
        />
      </motion.div>
    </div>
  );
};

const LetterRow = ({ rowIndex }) => {
  const { answer, attemptsState, wordState, setRowAnimationState } = useWords();

  let letters = wordState[rowIndex];
  const attempted = attemptsState[rowIndex];

  const determineColor = (letter, index) => {
    if (letter === answer[index]) {
      return "#5F8D41";
    } else if (answer.includes(letter)) {
      return "#C4A240";
    } else {
      return "#787C7E";
    }
  };

  const container = {
    hidden: { opacity: 1 },
    flip: {
      transition: {
        staggerChildren: 0.45,
      },
    },
    shake: {
      transition: {},
    },
  };

  return (
    <motion.div
      variants={container}
      animate={attempted ? "flip" : "hidden"}
      className={`flex justify-between mt-0.5`}
      onAnimationComplete={(definition) => {
        definition === "flip" && setRowAnimationState(attemptsState);
      }}
    >
      {createArray(solution_word.length).map((number, letterIndex) => (
        <Letter
          key={letterIndex}
          index={letterIndex}
          letter={letters[letterIndex]}
          answerLetter={answer[letterIndex]}
          attempted={attempted}
          color={attempted && determineColor(letters[letterIndex], letterIndex)}
        />
      ))}
    </motion.div>
  );
};

function GameBox() {
  return (
    <div className="flex flex-row justify-center grid grid-rows-5 gap-1 m-4">
      {createArray(6).map((number, rowIndex) => (
        <LetterRow key={rowIndex} rowIndex={rowIndex} />
      ))}
    </div>
  );
}

export default function Main() {
  const {
    wordState,
    setWordState,
    currentAttemptIndex,
    incrementAttemptState,
  } = useWords();

  const checkWord = () => {
    if (wordState[currentAttemptIndex()] === solution_word) {
      console.log("Correct!");
    } else {
      console.log("Wrong!");
    }
    if (currentAttemptIndex() < 6) {
      incrementAttemptState();
    }
  };

  useEffect(() => {
    function handleKeyUp(e) {
      if (e.key === "Enter") {
        handleEnterKey();
      } else if (e.key === "Backspace") {
        handleBackspace();
      } else if (VALIDLETTERS.includes(e.key.toUpperCase())) {
        handleKey(e.key);
      } else return;
    }

    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [wordState]);

  function handleEnterKey() {
    if (wordState[currentAttemptIndex()].length < solution_word.length) {
      return;
    } else if (
      wordState[currentAttemptIndex()].length === solution_word.length
    ) {
      checkWord();
    }
  }

  function handleBackspace() {
    const updatedWord = [...wordState][currentAttemptIndex()].slice(0, -1);

    updateWord(updatedWord);
  }

  function handleKey(key) {
    if (wordState[currentAttemptIndex()].length >= solution_word.length) {
      return;
    }
    const updatedWord =
      [...wordState][currentAttemptIndex()] + key.toUpperCase();

    updateWord(updatedWord);
  }

  function updateWord(updatedWord) {
    const newWordState = [...wordState];
    newWordState[currentAttemptIndex()] = updatedWord;
    setWordState(newWordState);
  }

  return (
    <div className="max-w-3xl px-10 mx-auto h-screen flex flex-col justify-between py-4 ">
      <Header />
      <GameBox />
      <Keyboard />
    </div>
  );
}
