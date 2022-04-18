import { useEffect, useState } from "react";
import "./Buttons.scss"

const Buttons = (props) => {
    const {runGame, startGame, nextStep, clearField} = props;
    const [stateRunButton, setStateRunButton] = useState("Start game");

    useEffect(() => {
        if (runGame)
            setStateRunButton("Stop game");
        else
            setStateRunButton("Start game");    
    }, [runGame]);

    return (
        <div className="buttons">
            <button className="button" onClick={startGame}>{stateRunButton}</button>
            <button className="button" onClick={nextStep} disabled={runGame}>Next step</button>
            <button className="button" disabled={runGame}>Random game</button>
            <button className="button" onClick={clearField} disabled={runGame}>Clear field</button>
        </div>
    )
}

// const Button = ({descButtons}) => {
    
//     const renderButtons = () => {

//         const arrButtons = [];
//         for(let i = 0; i < descButtons.length; i++) {
//             arrButtons.push(<button className="button" >{descButtons[i]}</button>)
//         }
        
//         return (arrButtons)
//     }
    
//     const buttons = renderButtons();

//     return(buttons)
// }



export default Buttons;