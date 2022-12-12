import { solution_word } from "../lib/words";

export const KeyboardLetter = ({ letter, used, correctlyPlacedLetters }) => {
  const determineColor = () => {
    if (used && correctlyPlacedLetters.includes(letter)) {
      return "bg-[#5F8D41]";
    } else if (used && solution_word.includes(letter)) {
      return "bg-[#C4A240]";
    } else if (used) {
      return "bg-gray-500 text-gray-200";
    } else {
      return "bg-gray-200";
    }
  };

  return (
    <div
      onClick={() =>
        document.dispatchEvent(
          new KeyboardEvent("keyup", { key: letter.toUpperCase() })
        )
      }
      className={`cursor-pointer ${determineColor()}  opacity-90 h-10 h-14 text-xs md:text-sm font-bold active:bg-gray-400 flex grow shrink items-center justify-center rounded-md m-1`}
    >
      {letter}
    </div>
  );
};
