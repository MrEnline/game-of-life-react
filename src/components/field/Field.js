import classNames from "classnames";
import styles from "./Field.module.scss";
import { FIELD_SIZE, BOX_SIZE } from "../../utils/Constants";

const Field = ({ runGame, liveBoxMap, onChangeField }) => {
    const generateField = () => {
        const arrItems = [];
        for (let i = 1; i <= FIELD_SIZE.columns; i++) {
            for (let j = 1; j <= FIELD_SIZE.rows; j++) {
                arrItems.push(
                    <div
                        className={classNames(styles.box, {
                            [styles.box_color]: liveBoxMap[`${i}_${j}`],
                        })}
                        key={`${(i - 1) * FIELD_SIZE.columns + j}`}
                        data-xy={`${i}_${j}`}
                        onClick={() => changeStateBox(`${i}_${j}`)}
                    ></div>,
                );
            }
        }
        return arrItems;
    };

    const changeStateBox = (id) => {
        let newLiveBoxMap = { ...liveBoxMap };
        if (runGame) {
            return;
        }
        if (newLiveBoxMap[id]) {
            delete newLiveBoxMap[id];
        } else {
            newLiveBoxMap[id] = true;
        }
        onChangeField(newLiveBoxMap);
    };

    return (
        <div
            className={styles.field}
            style={{ width: FIELD_SIZE.columns * BOX_SIZE }}
        >
            {generateField()}
        </div>
    );
};

export default Field;
