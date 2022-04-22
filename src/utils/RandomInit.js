import {FIELD_SIZE} from '../utils/Constants'
export const randomInit = (generateRandom) => {
    const liveBoxMap = {};
    if (!generateRandom) {
        return liveBoxMap;
    }

    for(let i = 1; i < FIELD_SIZE.columns; i++) {
        for(let j = 1; j < FIELD_SIZE.rows; j++) {
            const rand = Boolean(Math.round(Math.random()));
            if (rand) {
                liveBoxMap[`${i}_${j}`] = rand;
            }
        }
    }
    return liveBoxMap;
}