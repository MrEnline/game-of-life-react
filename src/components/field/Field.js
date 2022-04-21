import "./Field.scss"

const Field = (props) => {

    const runGame = props.runGame;
    const rows = props.fieldSize.rows;
    const columns = props.fieldSize.columns;
    const changeField = props.changeField;
    const liveBoxMap = props.liveBoxMap ? props.liveBoxMap : {};
    const boxSize = props.boxSize;
    const widthBoard = columns * boxSize;

    const generateField = () => {
        const arrItems = [];
        for (let i = 1; i <= columns; i++) {
            for(let j = 1; j <= rows; j++){
                const boxColor = liveBoxMap[`${i}_${j}`] ? "box-color" : "";
                arrItems.push(<div className={`box ${boxColor}`}
                                    key={`${(i - 1) * columns + j}`}
                                    data-xy={`${i}_${j}`}
                                    onClick={() => changeBackgroundColor(`${i}_${j}`)}>
                              </div>)
            }   
        }
        return (arrItems);
    }

    const changeBackgroundColor = (id) => {
        if (!runGame) {
            changeField(id);
        }
    }

    const items = generateField();
    
    return (
        <div className="field" style={{'width' : widthBoard}}>
            {items}
        </div>
    );
}

export default Field;
