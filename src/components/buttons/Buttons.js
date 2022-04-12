
import "./Buttons.css"

const Buttons = (props) => {
    
    
    return (
        <div className="buttons">
            <button className="button" onClick={props.startGame}>{props.descButtons[0]}</button>
            <button className="button" >{props.descButtons[1]}</button>
            <button className="button" >{props.descButtons[2]}</button>
            <button className="button" >{props.descButtons[3]}</button>
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