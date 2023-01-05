import React,{ useEffect, useState } from 'react'
import './rollDice.css'
import Die from './Die'
  
const RollDice = () => {
    let randomNumber = Math.floor(Math.random() * 6);
  // Face numbers passes as default props
  const array = {
    sides : ['one', 'two', 'three', 
             'four', 'five', 'six']
  }
  const [dice,setDice] = useState([]);
  const [state,setState] = useState({
    name : 'one',
    number:'',
    rolling: false
  })

  useEffect(() => {
      setDice(allNewDice())
  },[])

  function roll() {
    const {sides} = array
    const number = randomNumber;
    setState({
      // Changing state upon click
      name : sides[number],
      number:number + 1,
      rolling:true
    })
    setDice(allNewDice().map(die => ({...die,rolling:true})))
    // Start timer of one sec when rolling start
    setTimeout(() => {
      
      // Set rolling to false again when time over
      setState(prevState => ({...prevState,rolling:false}))
      setDice(prevDice => prevDice.map(die => ({...die,rolling:false})))
    },1000)
  }

  const allNewDice = () => {
    let diceArray = [];
    for(let i =0;i<6;i++) {
        let number = Math.floor(Math.random() * 6);
      diceArray.push({
        number:number + 1,
        rolling:false,
        name:array.sides[number]
      });
      
    }
    return diceArray;
  }
  console.log(dice)
   const dieElements = dice.map((die,i) => 
    <Die face={die.name} rolling={die.rolling} number={die.number} key={i}/>)

    const handleBtn = state.rolling ? 
                      'RollDice-rolling' : '';
    const {name,rolling,number} = state;

    return(
      <div className='RollDice'>
        <div className='RollDice-container'>
          {/* <Die face={die1} rolling={rolling} number={number}/> */}
          {dieElements}
        </div>
        <button className={handleBtn}
                disabled={state.rolling} 
                onClick={roll}>
          {state.rolling ? 'Rolling' : 'Roll Dice!'}
        </button>
      </div>
    )
  
}
  
export default RollDice