import Field from '../field/Field'
import Buttons from '../buttons/Buttons'
import Init from '../../utils/Init';
import { useState, useEffect } from "react";
import { useMemo } from 'react';

function App() {
    const _NUMBERS_FIELD = 20;
    let liveBoxMap = {};
    let liveBoxArr = Init(_NUMBERS_FIELD);
    const [stateGame, setStateGame] = useState(false);

    const startGame = () => {
        setStateGame(!stateGame);
    }

    // useEffect(() => {
    //     liveBoxArr = Init(_NUMBERS_FIELD);
    // }, []);

    const getLiveBoxMap = useMemo(() => {
        return liveBoxMap;
    }, []);

    const getLiveBoxArr = useMemo(() => {
        return liveBoxArr;
    }, []);

    const setStateBoxArr = (liveBoxXY, id) => {
        const Y = id.split("_")[0];
        const X = id.split("_")[1];
        const value = Number(liveBoxXY[id]);
        liveBoxArr[Y][X] = value;
        console.log(liveBoxMap);
        // if (value)
        //     liveBoxMap[id] = value;
        // else
        //     delete liveBoxMap[id];    
    }

    return (
        <div className="App">
            <Buttons runGame={stateGame} startGame={startGame}/>
            <Field numbersField={_NUMBERS_FIELD}
                    setStateBoxArr={setStateBoxArr}
                    runGame={stateGame}
                    getLiveBoxMap={getLiveBoxMap}
                    getLiveBoxArr={getLiveBoxArr}/>
        </div>
    );
}

export default App;
