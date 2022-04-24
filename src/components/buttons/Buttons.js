import "./Buttons.scss"

const Buttons = (props) => {
    const {runGame, onStartGame, onNextStep, onRandomField, onClearField} = props;

    return (
        <div className="buttons">
            <button className="button" onClick={() => onStartGame(!runGame)}>{runGame ? "Stop game" : "Start game"}</button>
            <button className="button" onClick={onNextStep} disabled={runGame}>Next step</button>
            <button className="button" onClick={onRandomField} disabled={runGame}>Random game</button>
            <button className="button" onClick={onClearField} disabled={runGame}>Clear field</button>
        </div>
    )
}

export default Buttons;