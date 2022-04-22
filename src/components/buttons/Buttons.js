import "./Buttons.scss"

const Buttons = (props) => {
    const {runGame, startGame, nextStep, randomField, clearField} = props;

    return (
        <div className="buttons">
            <button className="button" onClick={startGame}>{runGame ? "Stop game" : "Start game"}</button>
            <button className="button" onClick={nextStep} disabled={runGame}>Next step</button>
            <button className="button" onClick={randomField} disabled={runGame}>Random game</button>
            <button className="button" onClick={clearField} disabled={runGame}>Clear field</button>
        </div>
    )
}

export default Buttons;