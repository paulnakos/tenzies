import React,{useState,useEffect} from "react"
import Die from './dice/Die'
import Confetti from 'react-confetti'
import Timer from "./timer/Timer"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Record from "./timer/Record";


const Game = ({gameTime,matchHistory,setMatchHistory}) => {
  
  const array = {
    sides : ['one', 'two', 'three', 
             'four', 'five', 'six']
  }

  const getRandomNumber = () => Math.floor(Math.random() * 6);

  const allNewDice = () => {
    let diceArray = [];
    for(let i =0;i<10;i++) {
      let number = getRandomNumber();
      diceArray.push({
        number: number + 1,
        isHeld:false,
        rolling:false,
        name:array.sides[number]
      });
    }
    return diceArray;
  }

  const [state,setState] = useState({
    isWinner:false,
    isDisabled:false,
    timer:gameTime,
    startGame:false,
    dice:allNewDice()
  })

  const {isWinner,isDisabled,timer,startGame,dice} = state;

  useEffect(() => {
    let number = dice[0].number;
    const time = new Date().toLocaleString();
    if(dice.every(die => die.number === number && die.isHeld)) {
      setState(prevState => ({...prevState,isWinner:true}));
      setMatchHistory(state => ({...state,matchHistory:[...state.matchHistory,{won:true,time,elapsed: gameTime - timer}]}))
    }

    if(timer === 0 && !isWinner) {
      let timer = setTimeout(() => {
        setMatchHistory(state => ({...state,matchHistory:[...state.matchHistory,{won:false,time}]}))
      }, 1000);

      return () => clearTimeout(timer)
    }
      
    
  },[dice,timer])

  const updateDie = (id) => {
    setState(state => ({...state,dice:state.dice.map((die,i) => 
    i === id ? {...die,isHeld:!die.isHeld} : die)}));
  }

  const diceElements = 
    dice.map((die,i) => 
    <Die updateDie={() => updateDie(i)} 
      key={i} 
      die={die}
    />)
    
  

  const RollDice = () => {
    setState(state => ({...state,
      dice:state.dice.map(die => {
      let number = getRandomNumber();
      return die.isHeld ? 
      die : 
      {...die,
        number:number + 1,
        rolling:true,
        name:array.sides[number]
      }
    }),
    isDisabled:true
  }));
      
    setTimeout(() => {
      setState(state => ({...state,
        dice:state.dice.map(die =>
        die.isHeld ? die : {...die,rolling:false}),
        isDisabled:false
      }));
    },700)

    if(isWinner) {
      setState(state => ({...state,
        isWinner:false,
        dice:allNewDice()}))
    }
  }
  
  const start = () => {
    if (timer > 0 && !startGame)
      setState(state => ({...state,startGame:true}))
  }
  
  return (
    <>
    <div>
          <div className="header">
            <Timer timer={timer} setGameState={setState} startGame={startGame} isWinner={isWinner}/>
            <Record isWinner={isWinner} matchHistory={matchHistory}/>
            <h2 style={{'color': '#3498db','marginTop': '27px'}}>Current Time: {isWinner ? gameTime - timer : 0}s</h2>
          </div>
          <div className="title-parent">
              <h1 className="title">Tenzies</h1>
              <p className="instructions">Roll until all dice are the same. 
              Click each die to freeze it at its current value between rolls.
            </p>
          </div>
          <main>
              {isWinner && <Confetti />}
              <div className="container">
              {diceElements}
              </div>
          </main>
          <div className="button-parent">
            {(!isWinner &&  timer > 0) && 
            <button onClick={() => {RollDice(); start()} }
              className={isDisabled ? 'rolling' : ''}
              disabled={isDisabled} 
            >
              {isDisabled ? "Rolling" : "Roll"}
            </button>
            }
            {(isWinner || timer === 0) && 
            <button 
              onClick={() => setState(state => ({...state,dice:allNewDice(),isWinner:false,timer:gameTime,startGame:false}))}
            >
              Next Game
            </button>
            }
          </div>
        </div>
        <ToastContainer />
    </>
        
        
    )
}

export default Game
