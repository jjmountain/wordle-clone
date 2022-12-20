import { useEffect, useState } from "react";

import { useWords } from "../hooks/word-hooks";
import { Header } from "../components/Header";
import { Keyboard } from "../components/Keyboard";
import useCopyToClipboard from "../hooks/useCopyToClipboard";

import {
  solution_word,
  solutionIndex,
  VALIDLETTERS,
  createArray,
} from "../lib/words";
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
        duration: 0.35,
      },
    },
  };

  return (
    <>
      <motion.div
        className={`h-14 w-14`}
        style={{
          // position: "relative",
          // top: 0,
          // left: 0,
          rotateX: 180,
          backgroundColor: props.color,
          color: "white",
          // backfaceVisibility: "visible",
          // WebkitBackfaceVisibility: "visible",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        variants={itemCounterSpinVariants}
        animate={letterState}
      >
        <motion.span className="font-bold text-3xl" animate={{ rotateX: 180 }}>
          {props.letter}
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
        duration: 0.5,
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
      opacity: 1,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.7,
        duration: 0.5,
      },
    },
    flip: {
      rotateX: 180,
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
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

export const Modal = ({ show, title, message }) => {
  const { currentAttemptIndex, wordState, answer } = useWords();

  const variants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  const [copyText, setCopyText] = useState(null);

  const [_, copy] = useCopyToClipboard();

  const copyScore = () => {
    copy(result);
    setCopyText("Copied!");
  };

  let coloredBlocks = [...wordState]
    .map((word) => {
      const chars = word.split("");
      return chars
        .map((char, i) => {
          if (char === answer[i]) {
            return "🟩";
          } else if (answer.includes(char)) {
            return "🟨";
          } else return "⬛";
        })
        .join("");
    })
    .join("\n");

  let result =
    `Britle.netlify.app #${solutionIndex}\n\n${coloredBlocks}`.trim();

  return (
    <motion.div
      animate={show ? "open" : "closed"}
      initial="closed"
      variants={variants}
      transition={{
        ease: "easeOut",
        type: "tween",
        duration: 1.5,
      }}
      className="z-50 center mx-2  text-white my-2 px-5 py-2 bg-gray-800/90  shadow-xl rounded text-lg font-thin leading-relaxed tracking-wider w-max"
    >
      <div className="mt-0">
        {" "}
        <span className="text-xl text-left font-medium inline">
          {title}{" "}
        </span>- {message}
      </div>
      <button
        onClick={() => copyScore()}
        className="mt-4 mb-2 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-black font-medium text-base tracking-normal leading-normal px-2 py-1 rounded"
      >
        Share my score
      </button>{" "}
      <motion.span
        animate={copyText ? "open" : "closed"}
        variants={variants}
        className="ml-5"
      >
        {copyText}
      </motion.span>
    </motion.div>
  );
};

function GameBox() {
  return (
    <div className="flex flex-col items-center z-10">
      <div className="flex flex-row justify-center grid grid-rows-5 gap-1 m-4">
        {createArray(6).map((number, rowIndex) => (
          <LetterRow key={rowIndex} rowIndex={rowIndex} />
        ))}
      </div>
    </div>
  );
}

export default function Main() {
  const {
    wordState,
    setWordState,
    currentAttemptIndex,
    incrementAttemptState,
    showModal,
    modalTitle,
    modalMessage,
    gameState,
    setGameState,
    answer,
  } = useWords();

  const checkWord = () => {
    if (wordState[currentAttemptIndex()] === solution_word) {
      console.log("you won!");
      incrementAttemptState();
      setGameState("won");
    } else if (currentAttemptIndex() < 6) {
      incrementAttemptState();
    } else if (currentAttemptIndex() === 6) {
      setGameState("lost");
    }
  };

  useEffect(() => {
    function handleKeyUp(e) {
      if (gameState !== "playing") return;
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
    console.log(
      "enter key pushed",
      currentAttemptIndex(),
      wordState[currentAttemptIndex()]
    );
    // return if word is shorter than 5 letters
    if (wordState[currentAttemptIndex()].length < solution_word.length) {
      console.log("returning");
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
    <div className="max-w-3xl mx-auto h-screen flex flex-col justify-between py-4 ">
      <Header />

      <GameBox />
      <Keyboard />
    </div>
  );
}
