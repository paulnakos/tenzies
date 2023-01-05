

const Difficulty = ({difficulty,setDifficulty}) => {
    

    const handleClick = e => {
        e.preventDefault();
        setDifficulty(state => ({...state,difficulty: e.target.name}));
    }

    return (
        <>
            <div className="difficulty">
                <h1><a href="/" name="easy" onClick={handleClick} style={difficulty === "easy" ? {color:'red'} : {}}>Easy</a></h1>
                <h1><a href="/" name="medium" onClick={handleClick} style={difficulty === "medium" ? {color:'red'} : {}}>Medium</a></h1>
                <h1><a href="/" name="hard" onClick={handleClick} style={difficulty === "hard" ? {color:'red'} : {}}>Hard</a></h1>
                <h1><a href="/" name="veryHard" onClick={handleClick} style={difficulty === "veryHard" ? {color:'red'} : {}}>Very Hard</a></h1>
            </div>
            <div className="info">
                <p>
                    Select appropriate difficulty. Each level gives you less time to complete the game.
                </p>
                <p>
                    Choose wisely.
                </p>
            </div>
            
        </>
    )
}

export default Difficulty