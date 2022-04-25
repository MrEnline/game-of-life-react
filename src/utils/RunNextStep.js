import { FIELD_SIZE } from "../utils/Constants";
const NEW_LIVE_BOX = [3];
const LIVE_BOX = [2, 3];

export const runNextStep = (liveBoxMap) => {
    const coordLiveBoxArr = Object.keys(liveBoxMap);

    if (coordLiveBoxArr.length === 0) {
        return liveBoxMap;
    }

    let allNeighborsArr = coordLiveBoxArr.reduce((allNeighbors, coordBox) => {
        return [...allNeighbors, ...getNeighbors(parseCoordinates(coordBox))];
    }, []);

    allNeighborsArr = [...new Set(allNeighborsArr)];

    let newLiveBoxMap = allNeighborsArr.reduce((allLiveBoxMap, coordBox) => {
        const arrNeighbors = getNeighbors(parseCoordinates(coordBox));
        const sum = sumLiveBox(arrNeighbors.slice(1), liveBoxMap);
        if (
            (!liveBoxMap[coordBox] && NEW_LIVE_BOX.includes(sum)) ||
            (liveBoxMap[coordBox] && LIVE_BOX.includes(sum))
        ) {
            allLiveBoxMap[coordBox] = true;
        }
        return allLiveBoxMap;
    }, {});

    return newLiveBoxMap;
};

const sumLiveBox = (arrNeighbors, liveBoxMap) => {
    return arrNeighbors.reduce((sum, coordBox) => {
        return liveBoxMap[coordBox] ? sum + 1 : sum;
    }, 0);
};

const parseCoordinates = (xy) => {
    const y = xy.split("_")[0];
    const x = xy.split("_")[1];
    return { x, y };
};

const getNeighbors = (coord, sizeBoard) => {
    const x = Number(coord.x);
    const y = Number(coord.y);

    const topCoord = y === 1 ? FIELD_SIZE.columns : y - 1;
    const bottomCoord = y === FIELD_SIZE.columns ? 1 : y + 1;
    const rightCoord = x === FIELD_SIZE.rows ? 1 : x + 1;
    const leftCoord = x === 1 ? FIELD_SIZE.rows : x - 1;

    return [
        `${y}_${x}`,
        `${y}_${rightCoord}`,
        `${bottomCoord}_${rightCoord}`,
        `${bottomCoord}_${x}`,
        `${bottomCoord}_${leftCoord}`,
        `${y}_${leftCoord}`,
        `${topCoord}_${leftCoord}`,
        `${topCoord}_${x}`,
        `${topCoord}_${rightCoord}`,
    ];
};
