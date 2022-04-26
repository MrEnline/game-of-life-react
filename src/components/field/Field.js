import classNames from "classnames";
import styles from "./Field.module.scss";
import { FIELD_SIZE, BOX_SIZE } from "../../utils/Constants";

const Field = ({ runGame, liveCellObj, onChangeField }) => {
    const generateField = () => {
        const arrItems = [];
        for (let i = 1; i <= FIELD_SIZE.columns; i++) {
            for (let j = 1; j <= FIELD_SIZE.rows; j++) {
                arrItems.push(
                    <div
                        className={classNames(styles.box, {
                            [styles.box_color]: liveCellObj[`${i}_${j}`],
                        })}
                        key={`${(i - 1) * FIELD_SIZE.columns + j}`}
                        data-xy={`${i}_${j}`}
                    ></div>,
                );
            }
        }
        return arrItems;
    };

    const changeStateCell = (event) => {
        const newLiveCellObj = { ...liveCellObj };
        const id = event.target.dataset.xy;
        if (runGame) {
            return;
        }
        if (newLiveCellObj[id]) {
            delete newLiveCellObj[id];
        } else {
            newLiveCellObj[id] = true;
        }
        onChangeField(newLiveCellObj);
    };

    return (
        <div
            onClick={(event) => changeStateCell(event)}
            className={styles.field}
            style={{ width: FIELD_SIZE.columns * BOX_SIZE }}
        >
            {generateField()}
        </div>
    );
};

export default Field;
