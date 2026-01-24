import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  const cardsArr=[{
    id:1,
    text:"A",
    lockBoard:false,
    matched:false,
  },{
    id:2,
    text:"B",
    lockBoard:false,
    matched:false,
  },{
    id:3,
    text:"C",
    lockBoard:false,
    matched:false,
  },{
    id:4,
    text:"A",
    lockBoard:false,
    matched:false,
  },{
    id:5,
    text:"C",
    lockBoard:false,
    matched:false,
  },{
    id:6,
    text:"B",
    lockBoard:false,
    matched:false,
  },{
    id:7,
    text:"D",
    lockBoard:false,
    matched:false,
  },{
    id:8,
    text:"D",
    lockBoard:false,
    matched:false,
  },
]

  const [cards, setCards]=useState(cardsArr)
  const [firstCard, setFirstCard]=useState(null)
  const [secondCard, setScondCard]=useState(null)
  const [lockBoard, setLockBoard]=useState(false)

  
  

  
  
  
  function flipCard(card){
    if(lockBoard) return
    if(card.matched) return;
    if(card===firstCard) return
    if (!firstCard){
      setFirstCard(card) 
      console.log("its the first")
      return
    }
    else{
      setScondCard(card)
      console.log("its the second")
      setLockBoard(true)
      
      
    }
    
  }
  function restTurn(){
    setFirstCard(null)
    setScondCard(null)
    setLockBoard(false)
  }

  useEffect(()=>{
    if(!firstCard || !secondCard) return
    if(firstCard.text===secondCard.text){
      setCards(prev=>prev.map(card=>(
        card.text===firstCard.text ? {...card, matched:true}: card)
      ))
      
      console.log("match")
      restTurn()
    }else{
      console.log("not matched")
      setTimeout(()=>{
        restTurn()
      }, 1500)
    }


  }, [firstCard, secondCard])

  const allMatched= cards.every(card=>card.matched)
  function shuffleArray(array){
    return [...array].sort(()=>Math.random()  - 0.5)
  }

  useEffect(()=>{
    if(allMatched){
      setTimeout(()=>{
        setCards(shuffleArray(cards.map(card=>({...card, matched:false}))))
        restTurn()
      }, 1500)
    }

  }, [allMatched])

  return (
    <section>
      <h1>Memory Card Game</h1>
      <div id="cards">
        {cards.map(card=>(
          <button id="card" key={card.id}  disabled={lockBoard || card.matched} onClick={()=>flipCard(card)}>{card===firstCard || card===secondCard || card.matched ? card.text : "?"}</button>
        ))}
        
      </div>
    </section>

  )
}

export default App
