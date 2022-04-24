import "./Field.scss"
import classNames from "classnames";
import {FIELD_SIZE, BOX_SIZE} from '../../utils/Constants'

const Field = ({runGame, liveBoxMap, onChangeField}) => {

    const generateField = () => {
        const arrItems = [];
        for (let i = 1; i <= FIELD_SIZE.columns; i++) {
            for(let j = 1; j <= FIELD_SIZE.rows; j++){
                arrItems.push(<div className={classNames('box', {'box-color': liveBoxMap[`${i}_${j}`]})}
                                    key={`${(i - 1) * FIELD_SIZE.columns + j}`}
                                    data-xy={`${i}_${j}`}
                                    onClick={() => changeBackgroundColorBox(`${i}_${j}`)}>
                              </div>)
            }   
        }
        return (arrItems);
    }

    const changeBackgroundColorBox = (id) => {
        let newLiveBoxMap = {...liveBoxMap};
        if (!runGame) {
            if (newLiveBoxMap[id]) {
                delete newLiveBoxMap[id];
            } else {
                newLiveBoxMap[id] = true;
            }
            onChangeField(newLiveBoxMap);
        }
    }

    const items = generateField();
    
    return (
        <div className="field" style={{'width' : FIELD_SIZE.columns * BOX_SIZE}}>
            {items}
        </div>
    );
}

export default Field;
