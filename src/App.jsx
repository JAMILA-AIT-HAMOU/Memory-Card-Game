import { useEffect, useState, useRef } from "react";
import "./App.css";
import Confetti from "react-confetti";
import Card from "./components/Card";
import cardsArr from "./data";
import shuffleArray from "./utils";
import flipSound from "./assets/sounds/card-flip.wav";
import winSound from "./assets/sounds/win.mp3";
import loseSound from "./assets/sounds/lose.wav";

function App() {
  const [cards, setCards] = useState(() => shuffleArray(cardsArr));
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [lockBoard, setLockBoard] = useState(false);
  const [moves, setMoves] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25);
  const [isRunning, setIsRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const allMatched = cards.every((card) => card.matched);
  const isWin = allMatched;
  const isLose = timeLeft === 0 && !allMatched;

  const flipAudio = useRef(new Audio(flipSound));
  const winAudio = useRef(new Audio(winSound));
  const loseAudio = useRef(new Audio(loseSound));

  function flipCard(card) {
    if (lockBoard || card.matched || card === firstCard) return;
    if (!isRunning) setIsRunning(true);
    if (!firstCard) {
      setFirstCard(card);
      return;
    } else {
      setMoves((prev) => prev + 1);
      setSecondCard(card);
      setLockBoard(true);
    }
  }
  function restTurn() {
    setFirstCard(null);
    setSecondCard(null);
    setLockBoard(false);
  }
  useEffect(() => {
    if (!isRunning || allMatched) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, allMatched]);

  useEffect(() => {
    

    flipAudio.current.currentTime = 0;
    flipAudio.current.play();

    if (!firstCard || !secondCard) return;
    if (firstCard.text === secondCard.text) {
      setCards((prev) =>
        prev.map((card) =>
          card.text === firstCard.text ? { ...card, matched: true } : card,
        ),
      );

      restTurn();
    } else {
      setTimeout(() => {
        restTurn();
        flipAudio.current.play();
      }, 1500);
    }
  }, [firstCard, secondCard]);

  function resetGame() {
    setCards(
      shuffleArray(cardsArr.map((card) => ({ ...card, matched: false }))),
    );
    restTurn();
    setMoves(0);
    setTimeLeft(25);
    setIsRunning(false);
    setGameOver(false);
  }

  useEffect(() => {
    if (timeLeft === 0 && !allMatched) {
      loseAudio.current.play();
      setIsRunning(false);
      setGameOver(true);
    }
    if (allMatched) {
      winAudio.play();
      setIsRunning(false);
      setGameOver(true);
    }
  }, [allMatched, timeLeft]);

  return (
    <section>
      {allMatched && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={2000}
          colors={["#fb730a", "#632d03", "#ffffffff"]}
          recycle={false}
        />
      )}
      <h1>Memory Card Game</h1>
      <div className={gameOver && timeLeft === 0 ? "display shake" : "display"}>
        <p id="moves">
          <span>{moves}</span> {moves === 1 ? "Move" : "Moves"}
        </p>
        <p id="timer">
          Timer:<span>{timeLeft}s</span>
        </p>
      </div>
      {!gameOver ? (
        <div id="cards">
          {cards.map((card) => {
            const isFlipped =
              card === firstCard || card === secondCard || card.matched;
            return (
              <Card
                key={card.id}
                isFlipped={isFlipped}
                disabled={lockBoard || card.matched}
                onClick={() => flipCard(card)}
                text={card.text}
              />

            );
          })}
        </div>
      ) : (
        <div className="result">
          {isLose && <p>Time's up! You lose 😢</p>}
          {isWin && (
            <p>
              🎉 Congratulations! You won in {moves} moves, {timeLeft}s! 🎉
            </p>
          )}
          <button className="restart-btn" onClick={resetGame}>
            Play Again
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
