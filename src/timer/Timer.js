import {useEffect} from "react";
import { toast } from 'react-toastify';

const Timer = ({timer,setGameState,startGame,isWinner}) => {
    
    useEffect(() => {
        const interval = setInterval(() => {
            if( timer > 0 && startGame && !isWinner) setGameState(state => ({...state,timer:state.timer -= 1}))
        },1000)
        
        if (timer === 0 && !isWinner) {
            toast.error("You lost. You can try again",{
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        })} 

        if (isWinner) toast.success("You won. Congratulations",{
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        })

        return () => clearInterval(interval)
    },[timer,startGame,isWinner])
    

    return <h1 style={{color:'#616161','marginTop': '27px'}}>Timer: <span style={timer <= 10? {color:'red'} : {}}>{timer}s</span></h1>
}

export default Timer;