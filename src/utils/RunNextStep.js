export const runNextStep = (sizeBoard, liveBoxMap) => {

    let keysLiveBox = Object.keys(liveBoxMap);
    if (keysLiveBox.length === 0) {
        return;
    }

    //3-й вариант - пройдемся по живым клеткам без общего поля, только с живыми клетками
    let allNeighbors = [];
    for (let i = 0; i < keysLiveBox.length; i++) {
        const sumNeighbors = getSumNeighbors(keysLiveBox[i], sizeBoard, keysLiveBox);
        allNeighbors = [...allNeighbors, ...sumNeighbors.currNeighbors];                //соберем всех соседей
        if (sumNeighbors.result < 2 || sumNeighbors.result > 3) {
            liveBoxMap[keysLiveBox[i]] = false;                                         //пометим клетки, которые умерли
        }
    }

    allNeighbors = [...new Set(allNeighbors)];                                          //с помощью множества почистим все повторяющиеся клетки
    //пройдемся по соседям и поменяем им состояние
    for (let i = 0; i < allNeighbors.length; i++) {
        if (keysLiveBox.includes(allNeighbors[i])) continue;                            //по живым клеткам пробегать не будем
        const sumNeighbors = getSumNeighbors(allNeighbors[i], sizeBoard, keysLiveBox);
        if (sumNeighbors.result === 3) {
            liveBoxMap[allNeighbors[i]] = true;                                         //добавим новые живые клетки в общий массив
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

const getSumNeighbors = (xy, sizeBoard, keysLiveBox) => {
    const coord = parseCoordinates(xy);           //получим координаты живой клетки
    const currNeighbors = getNeighbors(coord, sizeBoard);     //получим координаты соседей живой клетки
    const result = sumLiveBox(currNeighbors, keysLiveBox);
    return {currNeighbors, result};
}

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

    //для тороидальной поверхности
    //вправо на 1 клетку
    if (x + 1 <= sizeBoard.rows) 
        arrNeighbors.push(`${y}_${x + 1}`);
    else
        arrNeighbors.push(`${y}_${1}`);  
    
    //по диагонали вправо вниз на 1 клетку
    if (x + 1 <= sizeBoard.rows && y + 1 <= sizeBoard.columns)
        arrNeighbors.push(`${y + 1}_${x + 1}`);
    else if (x + 1 <= sizeBoard.rows && y + 1 > sizeBoard.columns)    
        arrNeighbors.push(`${1}_${x + 1}`);
    else if (x + 1 > sizeBoard.rows && y + 1 <= sizeBoard.columns)
        arrNeighbors.push(`${y + 1}_${1}`);
    else
        arrNeighbors.push(`${1}_${1}`);
    
    //вниз на 1 клетку  
    if (y + 1 <= sizeBoard.columns) 
        arrNeighbors.push(`${y + 1}_${x}`);
    else
        arrNeighbors.push(`${1}_${x}`);
    
    //по диагонали влево вниз на 1 клетку
    if (x - 1 > 0 && y + 1 <= sizeBoard.columns)
        arrNeighbors.push(`${y + 1}_${x - 1}`);
    else if (x - 1 > 0 && y + 1 > sizeBoard.columns)
        arrNeighbors.push(`${1}_${x - 1}`);    
    else if (x - 1 < 1 && y + 1 <= sizeBoard.columns)  
        arrNeighbors.push(`${y + 1}_${sizeBoard.rows}`);
    else 
        arrNeighbors.push(`${1}_${sizeBoard.rows}`);
        
    //влево на 1 клетку
    if (x - 1 > 0) 
        arrNeighbors.push(`${y}_${x - 1}`);
    else
        arrNeighbors.push(`${y}_${sizeBoard.rows}`);
    
    //по диагонали вверх влево на 1 клетку
    if (x - 1 > 0 && y - 1 > 0)
        arrNeighbors.push(`${y - 1}_${x - 1}`);
    else if(x - 1 < 1 && y - 1 > 0)
        arrNeighbors.push(`${y - 1}_${sizeBoard.rows}`);
    else if(x - 1 > 0 && y - 1 < 1)
        arrNeighbors.push(`${sizeBoard.columns}_${x - 1}`);    
    else
        arrNeighbors.push(`${sizeBoard.columns}_${sizeBoard.rows}`);
    
    //вверх на 1 клетку
    if (y - 1 > 0) 
        arrNeighbors.push(`${y - 1}_${x}`);    
    else
        arrNeighbors.push(`${sizeBoard.columns}_${x}`); 

    //по диагонали вверх вправо на 1 клетку
    if (x + 1 <= sizeBoard.rows && y - 1 > 0)
        arrNeighbors.push(`${y - 1}_${x + 1}`);
    else if(x + 1 > sizeBoard.rows && y - 1 > 0)
        arrNeighbors.push(`${y - 1}_${1}`);
    else if(x + 1 <= sizeBoard.rows && y - 1 < 1) 
        arrNeighbors.push(`${sizeBoard.columns}_${x + 1}`);
    else
        arrNeighbors.push(`${sizeBoard.columns}_${1}`);
    
    //для замкнутой поверхности
    // if (x + 1 > 0 && x + 1 <= sizeBoard.rows) 
    //     arrNeighbors.push(`${y}_${x + 1}`); //->
    // if (x + 1 > 0 && x + 1 <= sizeBoard.rows && y + 1 > 0 && y + 1 <= sizeBoard.columns)
    //     arrNeighbors.push(`${y + 1}_${x + 1}`);
    // if (y + 1 > 0 && y + 1 <= sizeBoard.columns) 
    //     arrNeighbors.push(`${y + 1}_${x}`);
    // if (x - 1 > 0 && x - 1 <= sizeBoard.rows && y + 1 > 0 && y + 1 <= sizeBoard.columns)
    //     arrNeighbors.push(`${y + 1}_${x - 1}`);
    // if (x - 1 > 0 && x - 1 <= sizeBoard.rows) 
    //     arrNeighbors.push(`${y}_${x - 1}`);
    // if (x - 1 > 0 && x - 1 <= sizeBoard.rows && y - 1 > 0 && y - 1 <= sizeBoard.columns)
    //     arrNeighbors.push(`${y - 1}_${x - 1}`);
    // if (y - 1 > 0 && y - 1 <= sizeBoard.rows) 
    //     arrNeighbors.push(`${y - 1}_${x}`);
    // if (x + 1 > 0 && x + 1 <= sizeBoard.rows && y - 1 > 0 && y - 1 <= sizeBoard.columns)
    //     arrNeighbors.push(`${y - 1}_${x + 1}`);
    return arrNeighbors;
};
