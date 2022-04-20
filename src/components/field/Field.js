import { useEffect, useRef } from "react";
import "./Field.scss"

const Field = (props) => {

    return (
        <div className="field">
            <ViewBox runGame={props.runGame} 
                     numbersField={props.numbersField} 
                     getLiveBoxMap={props.getLiveBoxMap}
                     getLiveBoxArr={props.getLiveBoxArr}
                     getRefsBox={props.getRefsBox}/>
        </div>
    );
}

const ViewBox = ({runGame, numbersField, getLiveBoxMap, getLiveBoxArr, getRefsBox}) => {
    
    const itemRefs = useRef([]);

    useEffect(() => {
        getRefsBox(itemRefs.current);
    }, []);

    const generateField = () => {
        console.log("generateField");
        const arrItems = [];
        for (let i = 1; i <= numbersField; i++) {
            for(let j = 1; j <= numbersField; j++){
                arrItems.push(<div className="box"
                                    data-xy={`${i}_${j}`}
                                    onClick={() => changeBackgroundColor(`${i}_${j}`)}
                                    ref={el => itemRefs.current[`${i}_${j}`] = el}>
                              </div>)
            }
        }
        console.log("Перерендер");
        // if (Object.entries(itemRefs.current).length > 0)
        //     getRefsBox(itemRefs.current);
        // if (runGame)
        //     getRefsBox(itemRefs.current);
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
            liveBoxArr[coord.y][coord.x] = Number(value);
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
    const y = xy.split("_")[0];
    const x = xy.split("_")[1];
    return {x, y};
}

export default Field;
