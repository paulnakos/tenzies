import React from 'react'
import './die.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faDiceOne,faDiceTwo,faDiceThree,faDiceFour,faDiceFive,faDiceSix} from  '@fortawesome/free-solid-svg-icons'

  
const Die = (props) => {
    const {name, rolling} = props.die

    const diceArray = [faDiceOne,faDiceTwo,faDiceThree,faDiceFour,faDiceFive,faDiceSix]

    const findDice = () => diceArray.find(die => die.iconName.includes(name))
    
    return (
      <div className='box' 
      onClick={props.updateDie}
      style={props.die.isHeld ? {backgroundColor:'rgb(89 227 145)'} : {}}
      >
        <FontAwesomeIcon 
        className={`Die ${rolling && 'Die-shaking'}`} 
        icon={findDice()} />
      </div>
      )
  
}
  
export default Die