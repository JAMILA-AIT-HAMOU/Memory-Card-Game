import React from "react";

function Card({id, isFlipped, disabled, onClick, text}){
  return(
    <button
      key={id}
      className={`card ${isFlipped ? "card--flipped" : ""}`}
      disabled={disabled}
      onClick={onClick}
    >
      {isFlipped ? text: "?"}
    </button>
  )
}
export default React.memo(Card);