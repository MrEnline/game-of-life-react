import { useRef } from "react";
import "./Field.scss"

const Field = (props) => {
   
    return (
        <div className="field">
            <ViewBox runGame={props.runGame}/>
        </div>
    );
}

const ViewBox = ({runGame}) => {
    
    const itemRefs = useRef([]);

    const generateField = () => {
        const arrItems = [];
        for (let index = 0; index < 400; index++) {
            arrItems.push(<div className="box" 
                                    onClick={() => changeBackgroundColor(index)}
                                    ref={el => itemRefs.current[index] = el}>
                          </div>)
        }
        return (arrItems)
    }

    const changeBackgroundColor = (id) => {
        if (!runGame)
            itemRefs.current[id].classList.toggle("box-color")
    }

    const items = generateField();

    return(
        <>
            {items}
        </>
    )
}

export default Field;