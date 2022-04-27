import styles from "./Buttons.module.scss";
import { runNextStep } from "../../utils/RunNextStep";
import { DELAY } from "../../utils/Constants";
import { useInterval } from "../../hooks/useInterval";
import { initField } from "../../utils/Init";

const Buttons = ({ runGame, onStartGame, onSetLiveCellObj, liveCellObj }) => {
    const handleNextStep = () => {
        onSetLiveCellObj(runNextStep(liveCellObj));
    };

    useInterval(handleNextStep, runGame ? DELAY : null);

    const handleClearField = () => {
        onSetLiveCellObj(initField(false));
    };

    const handleRandomField = () => {
        onSetLiveCellObj(initField(true));
    };

    return (
        <div className={styles.buttons}>
            <button
                className={styles.button}
                onClick={() => onStartGame(!runGame)}
            >
                {runGame ? "Stop game" : "Start game"}
            </button>
            <button
                className={styles.button}
                onClick={handleNextStep}
                disabled={runGame}
            >
                Next step
            </button>
            <button
                className={styles.button}
                onClick={handleRandomField}
                disabled={runGame}
            >
                Random game
            </button>
            <button
                className={styles.button}
                onClick={handleClearField}
                disabled={runGame}
            >
                Clear field
            </button>
        </div>
    );
};

export default Buttons;
