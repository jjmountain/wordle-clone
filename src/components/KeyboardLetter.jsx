import { useWords } from "../hooks/word-hooks";

export const KeyboardLetter = ({ letter, used }) => {
  const { answer } = useWords();

  const determineColor = (letter) => {
    if (answer.includes(letter)) {
      return "#5F8D41";
    } else {
      return "gray";
    }
  };

  return (
    <div
      onClick={() =>
        document.dispatchEvent(
          new KeyboardEvent("keyup", { key: letter.toUpperCase() })
        )
      }
      className={`cursor-pointer w-12 h-10 md:h-14 text-xs md:text-sm font-bold bg-gray-200 active:bg-gray-400 flex grow shrink items-center justify-center rounded-md m-1`}
      style={{
        backgroundColor: used && determineColor(letter),
      }}
    >
      {letter}
    </div>
  );
};
