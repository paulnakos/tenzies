import { useState,useEffect } from "react";

const Record = ({matchHistory ,isWinner}) => {
    const wonMatches = matchHistory.filter(game => game.won)
    const findRecord = wonMatches => [...wonMatches.map(game => game.elapsed)].reduce((a, b) =>  Math.min(a, b))
    const initRecord = wonMatches.length === 0 ? 0 : findRecord(wonMatches)
    const [record,setRecord] = useState(initRecord)
    

    useEffect(() => {
        if(isWinner) setRecord(findRecord(wonMatches))
       
    },[isWinner])
    
    return <h1 style={{'color': '#07bc0c','marginTop': '27px'}}>Record: {record}s</h1>
}

export default Record;