export const runNextStep = (sizeBoard, liveBoxMap) => {

    let keysLiveBox = Object.keys(liveBoxMap);
    if (keysLiveBox.length === 0) return;

    //3-й вариант - пройдемся по живым клеткам без общего поля, только с живыми клетками
    let allNeighbors = [];
    for (let i = 0; i < keysLiveBox.length; i++) {
        let coord = parseCoordinates(keysLiveBox[i]); //получим координаты живой клетки
        let currNeighbors = getNeighbors(coord, sizeBoard); //получим координаты соседей живой клетки
        allNeighbors = [...allNeighbors, ...currNeighbors]; //соберем всех соседей
        let result = sumLiveBox(currNeighbors, keysLiveBox);
        if (result < 2 || result > 3) {
            liveBoxMap[keysLiveBox[i]] = false; //пометим клетки, которые умерли
        }
    }

    allNeighbors = [...new Set(allNeighbors)]; //с помощью множества почистим все повторяющиеся клетки
    //пройдемся по соседям и поменяем им состояние
    for (let i = 0; i < allNeighbors.length; i++) {
        if (keysLiveBox.includes(allNeighbors[i])) continue; //по живым клеткам пробегать не будем
        let coord = parseCoordinates(allNeighbors[i]); //получим координаты клетки
        let currNeighbors = getNeighbors(coord, sizeBoard); //получим координаты соседей живой клетки
        let result = sumLiveBox(currNeighbors, keysLiveBox);
        if (result === 3) {
            liveBoxMap[allNeighbors[i]] = true; //добавим новые живые клетки в общий массив
        }
    }

    //удалим мертвые клетки
    keysLiveBox = Object.keys(liveBoxMap);
    for (let i = 0; i < keysLiveBox.length; i++) {
        if (!liveBoxMap[keysLiveBox[i]]) {
            delete liveBoxMap[keysLiveBox[i]];
        }
    }

    return liveBoxMap;
};

const sumLiveBox = (arrNeighbors, keysLiveBox) => {
    let sum = 0;
    arrNeighbors.forEach((value) => {
        sum = keysLiveBox.includes(value) ? sum + 1 : sum;
    });
    return sum;
};

const parseCoordinates = (xy) => {
    const y = xy.split('_')[0];
    const x = xy.split('_')[1];
    return { x, y };
};

const getNeighbors = (coord, sizeBoard) => {
    let arrNeighbors = [];
    let x = Number(coord.x);
    let y = Number(coord.y);
    if (x + 1 > 0 && x + 1 <= sizeBoard.rows) 
        arrNeighbors.push(`${y}_${x + 1}`); //->
    if (x + 1 > 0 && x + 1 <= sizeBoard.rows && y + 1 > 0 && y + 1 <= sizeBoard.columns)
        arrNeighbors.push(`${y + 1}_${x + 1}`);
    if (y + 1 > 0 && y + 1 <= sizeBoard.columns) 
        arrNeighbors.push(`${y + 1}_${x}`);
    if (x - 1 > 0 && x - 1 <= sizeBoard.rows && y + 1 > 0 && y + 1 <= sizeBoard.columns)
        arrNeighbors.push(`${y + 1}_${x - 1}`);
    if (x - 1 > 0 && x - 1 <= sizeBoard.rows) 
        arrNeighbors.push(`${y}_${x - 1}`);
    if (x - 1 > 0 && x - 1 <= sizeBoard.rows && y - 1 > 0 && y - 1 <= sizeBoard.columns)
        arrNeighbors.push(`${y - 1}_${x - 1}`);
    if (y - 1 > 0 && y - 1 <= sizeBoard.rows) 
        arrNeighbors.push(`${y - 1}_${x}`);
    if (x + 1 > 0 && x + 1 <= sizeBoard.rows && y - 1 > 0 && y - 1 <= sizeBoard.columns)
        arrNeighbors.push(`${y - 1}_${x + 1}`);
    return arrNeighbors;
};
