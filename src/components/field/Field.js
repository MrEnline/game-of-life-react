import { useRef } from "react";
import "./Field.css"

const Field = () => {
   
    return (
        <div className="field">
            <ViewBox/>
        </div>
    );
}

const ViewBox = () => {
    
    let arrItems = [];

    const itemRefs = useRef([]);

    const generateField = () => {
        const elementGrid = [];
        for (let index = 0; index < 400; index++) {
            arrItems.push(<div className="box" 
                                    onClick={() => changeBackgroundColor(index)}
                                    ref={el => itemRefs.current[index] = el}>
                          </div>)
        }
    }

    const changeBackgroundColor = (id) => {
        itemRefs.current[id].classList.toggle("box-color")
    }

    generateField();

    return(
        <>
            {arrItems}
        </>
    )
}

export default Field;