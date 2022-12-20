import wordData from "../data/english_words.json";

const WORDS = JSON.parse(JSON.stringify(wordData));

export const ROWONE = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];

export const ROWTWO = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];

export const ROWTHREE = ["Z", "X", "C", "V", "B", "N", "M"];

export const VALIDLETTERS = [...ROWONE, ...ROWTWO, ...ROWTHREE];

const getWordOfDay = () => {
  const epochMs = new Date("January 30, 2022 00:00:00").valueOf();
  const now = Date.now();
  const msInDay = 86400000;
  const index = Math.floor((now - epochMs) / msInDay);
  const nextday = (index + 1) * msInDay + epochMs;
  console.log(index);
  return {
    solution_word: WORDS[index % WORDS.length].word.toUpperCase(),
    solution_definition: WORDS[index % WORDS.length].definition,
    solutionIndex: index,
    tomorrow: nextday,
    allWords: WORDS.map((word) => word.word.toUpperCase()),
  };
};

export const {
  solution_word,
  solution_definition,
  solutionIndex,
  tomorrow,
  allWords,
} = getWordOfDay();

export const createArray = (length, value = false) =>
  [...Array(length)].map(() => value);
