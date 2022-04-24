import styles from "./Buttons.module.scss";

const Buttons = (props) => {
    const {runGame, onStartGame, onNextStep, onRandomField, onClearField} = props;

    return (
        <div className={styles.buttons}>
            <button className={styles.button} onClick={() => onStartGame(!runGame)}>{runGame ? "Stop game" : "Start game"}</button>
            <button className={styles.button} onClick={onNextStep} disabled={runGame}>Next step</button>
            <button className={styles.button} onClick={onRandomField} disabled={runGame}>Random game</button>
            <button className={styles.button} onClick={onClearField} disabled={runGame}>Clear field</button>
        </div>
    )
}

export default Buttons;