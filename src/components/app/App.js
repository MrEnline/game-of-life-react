import Field from '../field/Field'
import Buttons from '../buttons/Buttons'
import {initField} from '../../utils/InitField';
import { useState, useEffect, useMemo } from "react";
import {runNextStep} from '..//../utils/RunNextStep';

function App() {
    const {liveBoxMap, liveBoxArr, getNumberField} = initField();
    let itemRefs = initField().itemRefs;
    const [stateGame, setStateGame] = useState(false);
    //const [liveBoxArr, setLiveBoxArr] = useState(initArrDefaultValue());

    const startGame = () => {
        setStateGame(!stateGame);
    }

    const nextStep = () => {
        const _liveBoxArr = getLiveBoxArr;
        const _liveBoxMap = getLiveBoxMap;
        const _itemRefs = getItemRefs;
        if (stateGame)
            runNextStep(_liveBoxArr, _liveBoxMap, _itemRefs);
    }

    // useEffect(() => {
    //     //liveBoxArr = Init(_NUMBERS_FIELD);
    //     //testFunc();
    //     itemRefs = initField().itemRefs;
    // }, []);

    const getLiveBoxMap = useMemo(() => {
        return liveBoxMap;
    }, []);

    const getLiveBoxArr = useMemo(() => {
        return liveBoxArr;
    }, []);

    const getItemRefs = useMemo(() => {
        return itemRefs;
    }, []);

    const setStateBoxArr = (liveBoxXY, id) => {
        const Y = id.split("_")[0];
        const X = id.split("_")[1];
        const value = Number(liveBoxXY[id]);
        const _liveBoxArr = getLiveBoxArr;
        _liveBoxArr[Y][X] = value;
        //console.log(initArrDefaultValue);
        // if (value)
        //     liveBoxMap[id] = value;
        // else
        //     delete liveBoxMap[id];    
    }

    const getRefsBox = (_itemRefs) => {
        //console.log(itemRefs.current);
        itemRefs = _itemRefs.current;
        //itemRefs.current["1_1"].classList.toggle("box-color");
    }

    const numberField = getNumberField();

    return (
        <div className="App">
            <Buttons runGame={stateGame} startGame={startGame} nextStep={nextStep}/>
            <Field numbersField={numberField}
                    setStateBoxArr={setStateBoxArr}
                    runGame={stateGame}
                    getLiveBoxMap={getLiveBoxMap}
                    getLiveBoxArr={getLiveBoxArr}
                    getRefsBox={getRefsBox}/>
        </div>
    );
}

export default App;
