import { useRef } from "react";
import "./Field.scss"

const Field = (props) => {

    return (
        <div className="field">
            <ViewBox runGame={props.runGame} 
                    numbersField={props.numbersField} 
                    setStateBoxArr={props.setStateBoxArr}
                    getLiveBoxMap={props.getLiveBoxMap}
                    getLiveBoxArr={props.getLiveBoxArr}/>
        </div>
    );
}

const ViewBox = ({runGame, numbersField, setStateBoxArr, getLiveBoxMap, getLiveBoxArr}) => {
    
    const itemRefs = useRef([]);

    const generateField = () => {
        console.log("generateField");
        const arrItems = [];
        for (let i = 1; i <= numbersField; i++) {
            for(let j = 1; j <= numbersField; j++){
                arrItems.push(<div className="box"
                                        data-xy={i.toString() + "_" + j.toString()}
                                        onClick={() => changeBackgroundColor(i.toString() + "_" + j.toString())}
                                        ref={el => itemRefs.current[i.toString() + "_" + j.toString()] = el}>
                              </div>)
            }
        }
        return (arrItems)
    }

    const changeBackgroundColor = (id) => {
        const liveBoxXY = getLiveBoxMap;
        const liveBoxXY1 = getLiveBoxArr;
        if (!runGame) {
            itemRefs.current[id].classList.toggle("box-color");
            liveBoxXY[id] = !liveBoxXY[id];
            setStateBoxArr(liveBoxXY, id);
            if (!liveBoxXY[id])
                delete liveBoxXY[id];  
        }
    }

    const items = generateField();

    return(
        <>
            {items}
        </>
    )
}

export default Field;