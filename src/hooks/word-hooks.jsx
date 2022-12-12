import React, { createContext, useState } from "react";
import { useContext, useRef } from "react";
import { solution_word, createArray } from "../lib/words";

const DataContext = createContext();

export const useWords = () => useContext(DataContext);

export default function DataProvider({ children }) {
  // useState hooks
  const [answer] = useState(solution_word);

  const [wordState, setWordState] = useState(createArray(6, ""));

  const [attemptsState, setAttemptsState] = useState(createArray(6));

  const [rowAnimationState, setRowAnimationState] = useState(createArray(6));

  // useRef hooks
  const prevWordStateRef = useRef(createArray(6, ""));

  const prevWordState = prevWordStateRef.current;

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

  return (
    <DataContext.Provider
      value={{
        answer,
        wordState,
        attemptsState,
        rowAnimationState,
        prevWordState,
        incrementAttemptState,
        currentAttemptIndex,
        getRowLetters,
        setWordState,
        setAttemptsState,
        setRowAnimationState,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
