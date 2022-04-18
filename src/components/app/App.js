import Field from '../field/Field'
import Buttons from '../buttons/Buttons'
import {initField} from '../../utils/InitField';
import { useState, useMemo } from "react";
import {runNextStep} from '..//../utils/RunNextStep';

let timerId;
let itemRefs;

function App() {
    const {liveBoxMap, liveBoxArr, getNumberField} = initField();
    const [stateGame, setStateGame] = useState(false);

    const startGame = () => {
        setStateGame(!stateGame);
        if (!stateGame) {
            timerId = setInterval(() => {
                nextStep();     
            }, 700);
        }
        if (stateGame) {
            clearInterval(timerId);
        }
    }

    const nextStep = () => {
        const _liveBoxArr = getLiveBoxArr;
        const _liveBoxMap = getLiveBoxMap;
        runNextStep(_liveBoxArr, _liveBoxMap, itemRefs);
    }

    const clearField = () => {
        const _liveBoxArr = getLiveBoxArr;
        const _liveBoxMap = getLiveBoxMap;
        const keysLiveBox = Object.keys(_liveBoxMap);
        if (keysLiveBox.length > 0) {
            for (const item of keysLiveBox) {
                _liveBoxArr[item.split("_")[0]][item.split("_")[1]] = 0;
                if (itemRefs[item].classList.contains("box-color"))
                    itemRefs[item].classList.remove("box-color");
                delete _liveBoxMap[item];
            } 
        }
    }

    const getLiveBoxMap = useMemo(() => {
        return liveBoxMap;
    }, []);

    const getLiveBoxArr = useMemo(() => {
        return liveBoxArr;
    }, []);

    const getRefsBox = (_itemRefs) => {
        itemRefs = _itemRefs;
    }

    const numberField = getNumberField();

    return (
        <div className="App">
            <Buttons runGame={stateGame} startGame={startGame} nextStep={nextStep} clearField={clearField}/>
            <Field numbersField={numberField}
                    runGame={stateGame}
                    getLiveBoxMap={getLiveBoxMap}
                    getLiveBoxArr={getLiveBoxArr}
                    getRefsBox={getRefsBox}/>
        </div>
    );
}

export default App;
