import { useEffect, useState } from "react";
import { useWords } from "../hooks/word-hooks";
import { ROWONE, ROWTWO, ROWTHREE } from "../lib/words";
import { KeyboardLetter } from "./KeyboardLetter";

export const Keyboard = () => {
  const { wordState, rowAnimationState } = useWords();

  const [usedLetters, setUsedLetters] = useState([]);

  useEffect(() => {
    const usedLetters = [...wordState].reduce((acc, row) => acc + row);
    setUsedLetters(usedLetters);
  }, [rowAnimationState]);

  return (
    <div className="px-3">
      <div className="w-full flex justify-center">
        {ROWONE.map((letter) => (
          <KeyboardLetter
            key={letter}
            letter={letter}
            used={usedLetters.includes(letter)}
          />
        ))}
      </div>
      <div className="w-full flex justify-center px-4">
        {ROWTWO.map((letter) => (
          <KeyboardLetter
            key={letter}
            letter={letter}
            used={usedLetters.includes(letter)}
          />
        ))}
      </div>
      <div className="w-full flex justify-center">
        <div className="px-4 w-12 h-10 md:h-14 text-sm font-bold bg-gray-200 flex-1 flex grow items-center justify-center rounded-md m-1">
          ENTER
        </div>
        {ROWTHREE.map((letter) => (
          <KeyboardLetter
            key={letter}
            letter={letter}
            used={usedLetters.includes(letter)}
          />
        ))}
        <div className="px-4 w-12 h-10 md:h-14 text-sm font-bold bg-gray-200 flex-1 flex grow items-center justify-center rounded-md m-1">
          DEL
        </div>
      </div>
    </div>
  );
};
