import React, { createContext, useState } from "react";
import { useContext, useRef, useEffect } from "react";
import {
  solution_word,
  solution_definition,
  createArray,
  allWords,
} from "../lib/words";

const DataContext = createContext();

export const useWords = () => useContext(DataContext);

export default function DataProvider({ children }) {
  // useState hooks

  const [answer] = useState(solution_word);

  const [shake, setShake] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [modalTitle, setModalTitle] = useState("");

  const [modalMessage, setModalMessage] = useState("");

  const [gameState, setGameState] = useState("playing");

  const [wordState, setWordState] = useState(createArray(6, ""));

  const [attemptsState, setAttemptsState] = useState(createArray(6));

  const [rowAnimationState, setRowAnimationState] = useState(createArray(6));

  // useRef hooks

  const currentAttemptIndexRef = useRef(0);

  // getters
  const currentAttemptIndex = () => currentAttemptIndexRef.current;

  const getRowLetters = (rowIndex) => {
    return wordState[rowIndex];
  };

  // mutations
  const incrementAttemptState = () => {
    const newAttemptsState = [...attemptsState].map((el, index) =>
      index <= currentAttemptIndex() ? true : el
    );
    currentAttemptIndexRef.current += 1;
    setAttemptsState(newAttemptsState);
  };

  // useEffects

  useEffect(() => {
    console.log("run effect");
    console.log(rowAnimationState, currentAttemptIndex());
    if (rowAnimationState[currentAttemptIndex() - 1]) {
      if (gameState === "won") {
        const capitalized =
          answer.charAt(0).toUpperCase() + answer.slice(1).toLowerCase();
        setModalTitle(capitalized);
        setModalMessage(solution_definition);
        setShowModal(true);
      } else if (gameState === "lost") {
        setModalTitle("You lost!");
        setModalMessage("You didn't guess the word!");
        setShowModal(true);
      } else {
        return;
      }
    }
  }, [rowAnimationState, currentAttemptIndex(), gameState]);

  return (
    <DataContext.Provider
      value={{
        answer,
        wordState,
        attemptsState,
        rowAnimationState,
        incrementAttemptState,
        getRowLetters,
        setWordState,
        setAttemptsState,
        setRowAnimationState,
        currentAttemptIndex,
        showModal,
        setShowModal,
        modalTitle,
        modalMessage,
        gameState,
        setGameState,
        shake,
        setShake,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
