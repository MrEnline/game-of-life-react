
export const runNextStep = (liveBoxArr, liveBoxMap, itemRefs) => {
    // console.log(liveBoxArr);
    // console.log(liveBoxMap);
    // console.log(itemRefs);
    // itemRefs["1_1"].classList.toggle("box-color");

    const newLiveBoxMap = {};   //переработанные клетки с новым состоянием
    const liveBoxNeighbors = new Set(); 
    const length = liveBoxArr[1].length - 1;
    let coord = {};

    const keysLiveBox = Object.keys(liveBoxMap);
    if (keysLiveBox.length > 0) {
        for(let i = 0; i < keysLiveBox.length; i++) {
            if (!liveBoxNeighbors.has(keysLiveBox[i])) {
                coord = parseCoordinates(keysLiveBox[i]);                           //получаем координаты живой клетки
                let arrNeighbors = getNeighbors(coord.x, coord.y, length);              //находим соседей
                let result = sumLiveBox(liveBoxArr, arrNeighbors, coord.x, coord.y);    //получаем сумму живых клеток-соседей
                if (result < 2 || result > 3)
                    newLiveBoxMap[keysLiveBox[i]] = false;                              //добавляем в новый массив клетки, которые умерли
                for (let j = 0; j < arrNeighbors.length; j++) {
                    //пройдемся по соседям живой клетки
                    coord = parseCoordinates(arrNeighbors[j]);                          //получаем координаты
                    let _arrNeighbors = getNeighbors(coord.x, coord.y, length);         //получаем координаты соседей
                    result = sumLiveBox(liveBoxArr, _arrNeighbors, coord.x, coord.y);   //получаем количество живых соседей
                    if (liveBoxArr[coord.y][coord.x]) {
                        //проверим клетку-соседа на то что она живая и добавим в множество, 
                        //чтобы не проходить еще раз
                        liveBoxNeighbors.add(arrNeighbors[j]);   
                        if (result < 2 || result > 3)
                            newLiveBoxMap[arrNeighbors[j]] = false;  //добавляем в новый массив клетки, которые умерли
                        continue;    
                    }
                    if (result === 3) 
                        newLiveBoxMap[arrNeighbors[j]] = true;  //добавляем в новый массив клетки, которые стали живыми    
                }   
            }
        }
        const keysCheckBox = Object.keys(newLiveBoxMap);
        if (keysCheckBox.length > 0) {
            for(let i = 0; i < keysCheckBox.length; i++) {
                coord = parseCoordinates(keysCheckBox[i]);
                liveBoxArr[coord.y][coord.x] = newLiveBoxMap[keysCheckBox[i]];
                liveBoxMap[keysCheckBox[i]] = newLiveBoxMap[keysCheckBox[i]];
                if (newLiveBoxMap[keysCheckBox[i]] && !itemRefs[keysCheckBox[i]].classList.contains("box-color"))
                    itemRefs[keysCheckBox[i]].classList.add("box-color");
                if (!newLiveBoxMap[keysCheckBox[i]] && itemRefs[keysCheckBox[i]].classList.contains("box-color"))
                    itemRefs[keysCheckBox[i]].classList.remove("box-color");
            }
        }
    }
}

const getNeighbors = (x, y, length) => {
    let arrNeighbors = [];
    x = Number(x);
    y = Number(y);
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

const sumLiveBox = (liveBoxArr, arrNeighbors, x, y) => {
    return arrNeighbors.reduce((sum, currValue) => {
        let coord = parseCoordinates(currValue);
        return sum + liveBoxArr[coord.y][coord.x];
    }, 0);
}

const parseCoordinates = (xy) => {
    const y = xy.split("_")[0];
    const x = xy.split("_")[1];
    return {x, y};
}