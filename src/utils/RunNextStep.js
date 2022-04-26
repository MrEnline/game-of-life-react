import { FIELD_SIZE } from "../utils/Constants";
const NEW_LIVE_CELL = [3];
const LIVE_CELL = [2, 3];

export const runNextStep = (liveCellObj) => {
    const coordLiveCellArr = Object.keys(liveCellObj);

    if (coordLiveCellArr.length === 0) {
        return liveCellObj;
    }

    let allNeighborsArr = coordLiveCellArr.reduce((allNeighbors, coord) => {
        return [...allNeighbors, ...getNeighbors(parseCoordinates(coord))];
    }, []);

    allNeighborsArr = [...new Set(allNeighborsArr)];

    let newLiveCellObj = allNeighborsArr.reduce((allLiveCellObj, coord) => {
        const arrNeighbors = getNeighbors(parseCoordinates(coord));
        const sum = sumLiveBox(arrNeighbors.slice(1), liveCellObj);
        if (
            (!liveCellObj[coord] && NEW_LIVE_CELL.includes(sum)) ||
            (liveCellObj[coord] && LIVE_CELL.includes(sum))
        ) {
            allLiveCellObj[coord] = true;
        }
        return allLiveCellObj;
    }, {});
    return newLiveCellObj;
};

const sumLiveBox = (arrNeighbors, liveCellObj) => {
    return arrNeighbors.reduce((sum, coord) => {
        return liveCellObj[coord] ? sum + 1 : sum;
    }, 0);
};

const parseCoordinates = (xy) => {
    const y = xy.split("_")[0];
    const x = xy.split("_")[1];
    return { x, y };
};

const getNeighbors = (coord) => {
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
