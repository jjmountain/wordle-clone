import { useEffect, useState } from "react";
import { useWords } from "../hooks/word-hooks";
import { ROWONE, ROWTWO, ROWTHREE } from "../lib/words";
import { KeyboardLetter } from "./KeyboardLetter";
import { solution_word } from "../lib/words";

export const Keyboard = () => {
  const { wordState, rowAnimationState } = useWords();

  const [usedLetters, setUsedLetters] = useState([]);

  const [correctlyPlacedLetters, setCorrectlyPlacedLetters] = useState([]);

  useEffect(() => {
    const usedLetters = [...wordState].reduce((acc, row) => acc + row);
    setUsedLetters(usedLetters);
  }, [rowAnimationState]);

  useEffect(() => {
    const lastFinishedRowIndex = rowAnimationState.lastIndexOf(true);
    console.log("last finished row index", lastFinishedRowIndex);
    if (lastFinishedRowIndex !== -1) {
      const lastRow = wordState[lastFinishedRowIndex];
      const lettersInCorrectPosition = lastRow
        .split("")
        .filter(
          (letter) => lastRow.indexOf(letter) === solution_word.indexOf(letter)
        );
      setCorrectlyPlacedLetters([
        ...correctlyPlacedLetters,
        ...lettersInCorrectPosition,
      ]);
    }
  }, [rowAnimationState]);

  return (
    <div className="px-3 mt-5">
      <div className="w-full flex justify-center">
        {ROWONE.map((letter) => (
          <KeyboardLetter
            key={letter}
            letter={letter}
            used={usedLetters.includes(letter)}
            correctlyPlacedLetters={correctlyPlacedLetters}
          />
        ))}
      </div>
      <div className="w-full flex justify-center px-4">
        {ROWTWO.map((letter) => (
          <KeyboardLetter
            key={letter}
            letter={letter}
            used={usedLetters.includes(letter)}
            correctlyPlacedLetters={correctlyPlacedLetters}
          />
        ))}
      </div>
      <div className="w-full flex justify-center">
        <div
          onClick={() =>
            document.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter" }))
          }
          className="cursor-pointer active:bg-gray-400 px-4 w-12 h-10 md:h-14 text-sm font-bold bg-gray-200 flex-1 flex grow items-center justify-center rounded-md m-1"
        >
          ENTER
        </div>
        {ROWTHREE.map((letter) => (
          <KeyboardLetter
            key={letter}
            letter={letter}
            used={usedLetters.includes(letter)}
            correctlyPlacedLetters={correctlyPlacedLetters}
          />
        ))}
        <div
          onClick={() =>
            document.dispatchEvent(
              new KeyboardEvent("keyup", { key: "Backspace" })
            )
          }
          className="cursor-pointer active:bg-gray-400 px-4 w-12 h-10 md:h-14 text-sm font-bold bg-gray-200 flex-1 flex grow items-center justify-center rounded-md m-1"
        >
          DEL
        </div>
      </div>
    </div>
  );
};
