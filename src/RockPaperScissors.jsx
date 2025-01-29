import { useState } from "react";
import { motion } from "framer-motion";

const choices = ["rock", "paper", "scissors"];
const getRandomChoice = () => choices[Math.floor(Math.random() * choices.length)];
const getResult = (player, computer) => {
  if (player === computer) return "It's a Tie!";
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "You Win!";
  }
  return "You Lose!";
};

export default function RockPaperScissors() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({ wins: 0, losses: 0 });

  const playGame = (choice) => {
    const computer = getRandomChoice();
    setPlayerChoice(choice);
    setComputerChoice(computer);
    const gameResult = getResult(choice, computer);
    setResult(gameResult);
    
    if (gameResult === "You Win!") {
      setScore((prev) => ({ ...prev, wins: prev.wins + 1 }));
    } else if (gameResult === "You Lose!") {
      setScore((prev) => ({ ...prev, losses: prev.losses + 1 }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4">
      <motion.h1 initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8">
        Rock Paper Scissors
      </motion.h1>

      <div className="flex space-x-4 mb-6">
        {choices.map((choice) => (
          <motion.button whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }}
            key={choice} onClick={() => playGame(choice)}
            className="px-6 py-3 bg-white text-black rounded-lg font-semibold shadow-lg capitalize">
            {choice}
          </motion.button>
        ))}
      </div>

      {playerChoice && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
          className="text-lg mt-4">
          <p>You chose: <span className="font-bold capitalize">{playerChoice}</span></p>
          <p>Computer chose: <span className="font-bold capitalize">{computerChoice}</span></p>
          <p className="text-2xl font-bold mt-2">{result}</p>
        </motion.div>
      )}

      <div className="mt-8 text-lg">
        <p>Wins: <span className="font-bold">{score.wins}</span></p>
        <p>Losses: <span className="font-bold">{score.losses}</span></p>
      </div>
    </div>
  );
}
