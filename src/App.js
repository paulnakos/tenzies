import { Routes, Route } from "react-router-dom";
import { useState,useEffect } from "react";
import Game from "./Game";
import Difficulty from "./Difficulty";
import Layout from "./Layout";
import History from "./History";

const App = () => {
    const [state,setState] = useState({
        difficulty:'easy',
        gameTime:0,
        matchHistory:JSON.parse(localStorage.getItem('matches')) || []
    })

    const {difficulty,gameTime,matchHistory} = state;

    useEffect(() => {
        switch(difficulty) {
            case "easy":
                setState(state => ({...state,gameTime:60}));
                break;
            case "medium":
                setState(state => ({...state,gameTime:35}));
                break;
            case "hard":
                setState(state => ({...state,gameTime:25}));
                break;
            default:
                setState(state => ({...state,gameTime:15}));
                break;
        }

        localStorage.setItem('matches',JSON.stringify(matchHistory))
    },[difficulty,matchHistory])

    return (
        <>
            <Layout />
            <Routes>
                <Route path="/" element={<Difficulty difficulty={difficulty} setDifficulty={setState}/>} />
                <Route path="game" element={<Game gameTime={gameTime} matchHistory={matchHistory} setMatchHistory={setState}/>} />
                <Route path="history" element={<History matchHistory={matchHistory}/>} />
            </Routes>
        </>
        
    )
}

export default App