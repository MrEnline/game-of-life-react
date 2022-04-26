import Field from "../field/Field";
import Buttons from "../buttons/Buttons";
import { useCallback, useState } from "react";
import { runNextStep } from "../../utils/RunNextStep";
import { DELAY } from "../../utils/Constants";
import { useInterval } from "../../hooks/useInterval";
import { initField } from "../../utils/Init";

function App() {
    const [runGame, setRunGame] = useState(false);
    const [liveCellObj, setLiveCellObj] = useState(initField(false));

    const handleNextStep = useCallback(() => {
        setLiveCellObj(runNextStep(liveCellObj));
    });

    useInterval(handleNextStep, runGame ? DELAY : null);

    const handleClearField = useCallback(() => {
        setLiveCellObj(initField(false));
    });

    const handleRandomField = () => {
        console.log("handleRandomField");
        setLiveCellObj(initField(true));
    };

    return (
        <div className="App">
            <Buttons
                runGame={runGame}
                onStartGame={setRunGame}
                onNextStep={handleNextStep}
                onRandomField={handleRandomField}
                onClearField={handleClearField}
            />
            <Field
                runGame={runGame}
                onChangeField={setLiveCellObj}
                liveCellObj={liveCellObj}
            />
        </div>
    );
}

export default App;
