import { useEffect, useRef } from "react";
import "./Field.scss"

const Field = (props) => {

    return (
        <div className="field">
            <ViewBox runGame={props.runGame} 
                    numbersField={props.numbersField} 
                    setStateBoxArr={props.setStateBoxArr}
                    getLiveBoxMap={props.getLiveBoxMap}
                    getLiveBoxArr={props.getLiveBoxArr}
                    getRefsBox={props.getRefsBox}/>
        </div>
    );
}

const ViewBox = ({runGame, numbersField, setStateBoxArr, getLiveBoxMap, getLiveBoxArr, getRefsBox}) => {
    
    const itemRefs = useRef([]);

    // useEffect(() => {
    //     getRefsBox(itemRefs.current);
    // }, []);

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
        // if (Object.entries(itemRefs.current).length > 0)
        //     getRefsBox(itemRefs.current);
        if (runGame)
            getRefsBox(itemRefs.current);
        return (arrItems)
    }

    const changeBackgroundColor = (id) => {
        const liveBoxMap = getLiveBoxMap;
        const liveBoxArr = getLiveBoxArr;
        if (!runGame) {
            itemRefs.current[id].classList.toggle("box-color");
            liveBoxMap[id] = !liveBoxMap[id];
            const coord = parseCoordinates(id);
            const value = Number(liveBoxMap[id]);
            liveBoxArr[coord.x][coord.x] = value;
            //setStateBoxArr(liveBoxXY, id);
            if (!liveBoxMap[id])
                delete liveBoxMap[id];  
        }
    }

    const items = generateField();

    return(
        <>
            {items}
        </>
    )
}

const parseCoordinates = (xy) => {
    const x = xy.split("_")[0];
    const y = xy.split("_")[1];
    return {x, y};
}

export default Field;
