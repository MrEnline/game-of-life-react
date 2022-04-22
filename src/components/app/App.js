import Field from '../field/Field'
import Buttons from '../buttons/Buttons'
import { useState } from "react";
import {runNextStep} from '../../utils/RunNextStep';
import {FIELD_SIZE, DELAY, BOX_SIZE} from '../../utils/Constants'
import {useInterval} from '../hooks/useInterval'
import {randomInit} from '../../utils/RandomInit';

function App() {
    const [runGame, setRunGame] = useState(false);
    const [liveBoxMap, setLiveBoxMap] = useState(randomInit(false));

    const startGame = () => {
        setRunGame(!runGame);
    }

    const handleChangeField = (coord) => {
        const newBox = {};
        newBox[coord] = !liveBoxMap[coord];
        if (!newBox[coord]) {
            const copyOfObject = {...liveBoxMap};
            delete copyOfObject[coord];
            setLiveBoxMap(copyOfObject); 
        } else {
            setLiveBoxMap({...liveBoxMap, ...newBox});  
        }
    }

    const nextStep = () => {
        const newLiveBoxMap = runNextStep(FIELD_SIZE, Object.assign({}, liveBoxMap));
        setLiveBoxMap(newLiveBoxMap ? newLiveBoxMap : randomInit(false));
    }

    useInterval(nextStep, runGame ? DELAY : null);

    const clearField = () => {
        setLiveBoxMap(randomInit(false));
    }

    const randomField = () => {
        setLiveBoxMap(randomInit(true));
    }

    return (
        <div className="App">
            <Buttons runGame={runGame} 
                    startGame={startGame} 
                    nextStep={nextStep} 
                    randomField={randomField} 
                    clearField={clearField}/>
            <Field fieldSize={FIELD_SIZE}
                    boxSize={BOX_SIZE}
                    runGame={runGame}
                    changeField={handleChangeField}
                    liveBoxMap={liveBoxMap}/>
        </div>
    );
}

export default App;
