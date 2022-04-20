import Field from '../field/Field'
import Buttons from '../buttons/Buttons'
import { useState } from "react";
import {runNextStep} from '../../utils/RunNextStep';
import {FIELD_SIZE, TIMEOUT} from '../../utils/Constants'

let timerId;

function App() {
    const [runGame, setRunGame] = useState(false);
    const [liveBoxMap, setLiveBoxMap] = useState({});

    const startGame = () => {
        setRunGame(!runGame);
        if (!runGame) {
            timerId = setInterval(() => {
                nextStep();     
            }, TIMEOUT);
        }
        if (runGame) {
            clearInterval(timerId);
        }
    }

    const handleChangeField = (coord) => {
        const newBox = {};
        newBox[coord] = !liveBoxMap[coord];
        setLiveBoxMap({...liveBoxMap, ...newBox});
    }

    const nextStep = () => {
        const newLiveBoxMap = runNextStep(FIELD_SIZE, Object.assign({}, liveBoxMap));
        setLiveBoxMap(newLiveBoxMap);
    }

    const clearField = () => {
        setLiveBoxMap({});
    }

    return (
        <div className="App">
            <Buttons runGame={runGame} startGame={startGame} nextStep={nextStep} clearField={clearField}/>
            <Field numbersField={FIELD_SIZE}
                    runGame={runGame}
                    changeField={handleChangeField}
                    liveBoxMap={liveBoxMap}/>
        </div>
    );
}

export default App;
