export const runNextStep = (liveBoxArr, liveBoxMap, itemRefs) => {

    const length = liveBoxArr[1].length - 1;

    const keysLiveBox = Object.keys(liveBoxMap);
    if (keysLiveBox.length === 0) return;
        
     //3-й вариант - пройдемся по живым клеткам без общего поля, только с живыми клетками
    let allNeighbors = [];
    for(let i = 0; i < keysLiveBox.length; i++) {
        let coord = parseCoordinates(keysLiveBox[i]);    //получим координаты живой клетки
        let currNeighbors = getNeighbors(coord, length); //получим координаты соседей живой клетки
        allNeighbors = [...allNeighbors, ...currNeighbors]; //соберем всех соседей
        let result = sumLiveBox(currNeighbors, keysLiveBox);
        if (result < 2 || result > 3) {
            liveBoxMap[keysLiveBox[i]] = false;             //пометим клетки, которые умерли
        }
    }

    allNeighbors = [...new Set(allNeighbors)];  //с помощью множества почистим все повторяющиеся клетки
    //пройдемся по соседям и поменяем им состояние
    for(let i = 0; i < allNeighbors.length; i++) {
        if (keysLiveBox.includes(allNeighbors[i])) continue; //по живым клеткам пробегать не будем
        let coord = parseCoordinates(allNeighbors[i]);    //получим координаты клетки
        let currNeighbors = getNeighbors(coord, length); //получим координаты соседей живой клетки
        let result = sumLiveBox(currNeighbors, keysLiveBox);
        if (result === 3) {
            liveBoxMap[allNeighbors[i]] = true;     //добавим новые живые клетки в общий массив
        }
    }

    //покрасим клетки
    const keysCheckBox = Object.keys(liveBoxMap);
    if (keysCheckBox.length > 0) {
        for(let i = 0; i < keysCheckBox.length; i++) {
            toggleColorBox(liveBoxMap, keysCheckBox[i], itemRefs);
        }
    }

    //избавимся от мертвых
    for(let i = 0; i < keysCheckBox.length; i++) {
        if (!liveBoxMap[keysCheckBox[i]]) 
            delete liveBoxMap[keysCheckBox[i]];
    }
}

const sumLiveBox = (arrNeighbors, keysLiveBox) => {
    let sum = 0;
    arrNeighbors.forEach((value) => {
        sum = keysLiveBox.includes(value) ? sum + 1 : sum;
    });
    return sum;
}

const parseCoordinates = (xy) => {
    const y = xy.split("_")[0];
    const x = xy.split("_")[1];
    return {x, y};
}

const toggleColorBox = (newLiveBoxMap, key, itemRefs) => {
    if (newLiveBoxMap[key] && !itemRefs[key].classList.contains("box-color"))
        itemRefs[key].classList.add("box-color");
    if (!newLiveBoxMap[key] && itemRefs[key].classList.contains("box-color"))
        itemRefs[key].classList.remove("box-color");
}

const getNeighbors = (coord, length) => {
    let arrNeighbors = [];
    let x = Number(coord.x);
    let y = Number(coord.y);
    if (x + 1 > 0 && x + 1 <= length) arrNeighbors.push(`${y}_${x + 1}`);    //->
    if (x + 1 > 0 && x + 1 <= length && y + 1 > 0 &&  y + 1 <= length) arrNeighbors.push(`${y + 1}_${x + 1}`);
    if (y + 1 > 0 && y + 1 <= length) arrNeighbors.push(`${y + 1}_${x}`);
    if (x - 1 > 0 && x - 1 <= length && y + 1 > 0 && y + 1 <= length) arrNeighbors.push(`${y + 1}_${x - 1}`);
    if (x - 1 > 0 && x - 1 <= length) arrNeighbors.push(`${y}_${x - 1}`);
    if (x - 1 > 0 && x - 1 <= length && y - 1 > 0 && y - 1 <= length) arrNeighbors.push(`${y - 1}_${x - 1}`);
    if (y - 1 > 0 && y - 1 <= length) arrNeighbors.push(`${y - 1}_${x}`);
    if (x + 1 > 0 && x + 1 <= length && y - 1 > 0 && y - 1 <= length) arrNeighbors.push(`${y - 1}_${x + 1}`);
    return arrNeighbors;
}


