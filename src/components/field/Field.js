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

    useEffect(() => {
        getRefsBox(itemRefs.current);
    }, []);

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
        if (Object.entries(itemRefs.current).length > 0)
            getRefsBox(itemRefs.current);
        return (arrItems)
    }

    const changeBackgroundColor = (id) => {
        const liveBoxXY = getLiveBoxMap;
        const liveBoxArr = getLiveBoxArr;
        if (!runGame) {
            itemRefs.current[id].classList.toggle("box-color");
            liveBoxXY[id] = !liveBoxXY[id];
            const Y = id.split("_")[0];
            const X = id.split("_")[1];
            const value = Number(liveBoxXY[id]);
            liveBoxArr[Y][X] = value;
            //setStateBoxArr(liveBoxXY, id);
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
