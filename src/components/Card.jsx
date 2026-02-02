import React from "react";

function Card({isFlipped, disabled, onClick, text}){
  return(
    <button
      className={`card ${isFlipped ? "card--flipped" : ""}`}
      disabled={disabled}
      onClick={onClick}
    >
      {isFlipped ? text: "?"}
    </button>
  )
}
export default React.memo(Card);