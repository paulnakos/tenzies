

const History = ({matchHistory}) => {
    const matches = matchHistory;
    const wonMatches = matchHistory.filter(game => game.won)
    const sum = wonMatches.map(game => game.elapsed).reduce((a, b) =>  a + b,0)
    const avg = sum / wonMatches.length || 0;
    
    return (
        <>
            <div className="history">
                <h1>Match History</h1>
                <h3 className="average">Average Game Time: <span style={{color: 'navy'}}>{avg.toFixed(2)} s</span></h3>

                {
                   matches.length === 0 ?
                    <h2 style={{textAlign:'center'}}>Played games appear here</h2>
                    :
                    
                    <ul>
                        {matches.map((game,id) => 
                        <li key={id}>
                            <h3>Result:  
                                <span style={game.won ? {color:'green'} : {color:'red'}}>
                                    {game.won ? " Victory" : " Defeat"}
                                </span>
                            </h3> 
                            <h3>Time: {game.time}</h3>
                            {
                                game.won ? 
                                <h3>Completed in: <span style={{color:'blue'}}>{game.elapsed} seconds</span></h3> 
                                : <></>
                            }
                        </li>)}
                    </ul>
                    
                
                }   

            </div>
        </>
    )
}

export default History