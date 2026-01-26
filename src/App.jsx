import { useEffect, useState } from "react";
import "./App.css";
import Confetti from "react-confetti";

function App() {
  const cardsArr = [
    {
      id: 1,
      text: "A",

      matched: false,
    },
    {
      id: 2,
      text: "B",

      matched: false,
    },
    {
      id: 3,
      text: "C",

      matched: false,
    },
    {
      id: 4,
      text: "A",

      matched: false,
    },
    {
      id: 5,
      text: "C",

      matched: false,
    },
    {
      id: 6,
      text: "B",

      matched: false,
    },
    {
      id: 7,
      text: "D",

      matched: false,
    },
    {
      id: 8,
      text: "D",

      matched: false,
    },
    {
      id: 9,
      text: "E",

      matched: false,
    },
    {
      id: 10,
      text: "E",

      matched: false,
    },
  ];

  const [cards, setCards] = useState(cardsArr);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setScondCard] = useState(null);
  const [lockBoard, setLockBoard] = useState(false);
  const [moves, setMoves] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25);
  const [isRunning, setIsRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const allMatched = cards.every((card) => card.matched);

  function flipCard(card) {
    if (!isRunning) setIsRunning(true);
    if (lockBoard) return;
    if (card.matched) return;
    if (card === firstCard) return;
    if (!firstCard) {
      setFirstCard(card);
      return;
    } else {
      setMoves((prev) => prev + 1);
      setScondCard(card);
      setLockBoard(true);
    }
  }
  function restTurn() {
    setFirstCard(null);
    setScondCard(null);
    setLockBoard(false);
  }
  useEffect(() => {
    if (!isRunning || allMatched) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if(prev === 1){
          clearInterval(timer)
          return 0
        }
        return prev - 1
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, allMatched]);

  useEffect(() => {
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
      }, 1500);
    }
  }, [firstCard, secondCard]);

  function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  useEffect(() => {
    if (timeLeft === 0 && !allMatched) {
      setIsRunning(false);
      setGameOver(true);
    }
    if (allMatched) {
      /*
      setTimeout(() => {
        setCards(
          shuffleArray(cards.map((card) => ({ ...card, matched: false }))),
        );
        
      }, 1500);
      */
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
          numberOfPieces={500}
           colors={[
            "#fb730a", "#632d03", "#ffffffff"
          ]}
          recycle/>
      )}
      <h1>Memory Card Game</h1>
      <div className="display">
        <p id="moves">
          <span>{moves}</span> {moves === 1 ? "Move" : "Moves"}
        </p>
        <p id="timer">
          Timer:<span>{timeLeft}s</span>
        </p>
      </div>
      {!gameOver ? (
        <div id="cards">
          {cards.map((card) => (
            <button
              id="card"
              key={card.id}
              disabled={lockBoard || card.matched}
              onClick={() => flipCard(card)}
            >
              {card === firstCard || card === secondCard || card.matched
                ? card.text
                : "?"}
            </button>
          ))}
        </div>
      ) : (
        <div className="result">
          {timeLeft === 0 && !allMatched && <p>Time's up! You lose 😢</p>}
          {allMatched && <p>🎉 Congratulations! You won in {moves} moves! 🎉</p>}
        </div>
      )}
    </section>
  );
}

export default App;
