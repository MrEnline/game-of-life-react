import Field from '../field/Field'
import Buttons from '../buttons/Buttons'
import { useCallback, useState } from "react";
import {runNextStep} from '../../utils/RunNextStep';
import {DELAY} from '../../utils/Constants'
import {useInterval} from '../hooks/useInterval'
import {initField} from '../../utils/Init';

function App() {
    const [runGame, setRunGame] = useState(false);
    const [liveBoxMap, setLiveBoxMap] = useState(initField(false));

    // const handleChangeField = useCallback((coord) => {
    //     const newBox = {};
    //     newBox[coord] = !liveBoxMap[coord];
    //     if (!newBox[coord]) {
    //         const copyOfObject = {...liveBoxMap};
    //         delete copyOfObject[coord];
    //         setLiveBoxMap(copyOfObject); 
    //     } else {
    //         setLiveBoxMap({...liveBoxMap, ...newBox});  
    //     }
    // })

    const handleNextStep = useCallback(() => {
        setLiveBoxMap(runNextStep(liveBoxMap));
    })

    useInterval(handleNextStep, runGame ? DELAY : null);

    const handleClearField = useCallback(() => {
        setLiveBoxMap(initField(false));
    })

    const handleRandomField = useCallback(() => {
        setLiveBoxMap(initField(true));
    })

    return (
        <div className="App">
            <Buttons runGame={runGame} 
                    onStartGame={setRunGame} 
                    onNextStep={handleNextStep} 
                    onRandomField={handleRandomField} 
                    onClearField={handleClearField}/>
            <Field runGame={runGame}
                    onChangeField={setLiveBoxMap}
                    liveBoxMap={liveBoxMap}/>
        </div>
    );
}

export default App;
