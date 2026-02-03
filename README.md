# Memoy Card Game 🧠 

A fun and interactive **Memory Card Game** built with **React**. The goal is to match all card pairs before the Timer runs out. The game includes sound effects, animation, and clear win/lose feedback.


---


## Link:

    https://jamila-ait-hamou.github.io/Memory-Card-Game/


## Features 

  - Classic memory card matching gameplay
  - Countdown timer that starts on first move
  - sound effects (card flip, win, lose)
  - Confetti animation on win 
  - Board lock to prevent invalid clicks
  - Restart game functionality
  - Responsive layout


## Built With:

    - **React** (Hooks)
      - `useState`
      - `useEffect1
      - `useRef`
    - **JavaScript (ES6+)**
    - **CSS**
    - **react-confetti**


## Game logic overview

  - Cards are shuffled at the start of each game
  - The timer starts on the first card flip
  - Two cards can be flipped at a time
  - If cards match, they stay flipped
  - If they don't match, they flip back after a short delay
  - the game ends when:
    - All cards are matched (win)
    - Time reachs zero (lose)