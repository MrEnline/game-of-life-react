
export const runNextStep = (liveBoxArr, liveBoxMap, itemRefs) => {

    const newLiveBoxMap = {};   //переработанные клетки с новым состоянием
    const length = liveBoxArr[1].length - 1;

    const keysLiveBox = Object.keys(liveBoxMap);
     if (keysLiveBox.length > 0) {
        //     //1-й рабочий вариант c повторным прохождением по соседям
    //     for(let i = 0; i < keysLiveBox.length; i++) {
    // //        if (!liveBoxNeighbors.has(keysLiveBox[i])) {
    //             coord = parseCoordinates(keysLiveBox[i]);                           //получаем координаты живой клетки
    //             let arrNeighbors = getNeighbors(coord.x, coord.y, length);              //находим соседей
    //             let result = sumLiveBox(liveBoxArr, arrNeighbors, coord.x, coord.y);    //получаем сумму живых клеток-соседей
    //             if (result < 2 || result > 3)
    //                 newLiveBoxMap[keysLiveBox[i]] = false;                              //добавляем в новый массив клетки, которые умерли
    //             for (let j = 0; j < arrNeighbors.length; j++) {
    //                 //пройдемся по соседям живой клетки
    //                 coord = parseCoordinates(arrNeighbors[j]);                          //получаем координаты
    //                 let _arrNeighbors = getNeighbors(coord.x, coord.y, length);         //получаем координаты соседей
    //                 result = sumLiveBox(liveBoxArr, _arrNeighbors, coord.x, coord.y);   //получаем количество живых соседей
    //                 if (result < 2 || result > 3)
    //                     newLiveBoxMap[arrNeighbors[j]] = false;  //добавляем в новый массив клетки, которые умерли
    //                 if (result === 3) 
    //                     newLiveBoxMap[arrNeighbors[j]] = true;  //добавляем в новый массив клетки, которые стали живыми    
    //             }   
    // //        }
    //     }
        
        //2-й вариант без дубляжа соседей живых клеток с помощью множества
        //пройдемся сначала по живым клеткам
        let allNeighbors = new Set();
        for(let i = 0; i < keysLiveBox.length; i++) {
            let allRes =  getSumLiveBox(keysLiveBox[i], length, liveBoxArr);
            allNeighbors = new Set([...allNeighbors, ...allRes.arrNeighbors]); 
            setStateBox(allRes.result, newLiveBoxMap, keysLiveBox[i]);
        }
        //пройдемся по соседям и выставим им состояние
        allNeighbors = Array.from(allNeighbors);
        for (let j = 0; j < allNeighbors.length; j++) {
            let allRes =  getSumLiveBox(allNeighbors[j], length, liveBoxArr);
            setStateBox(allRes.result, newLiveBoxMap, allNeighbors[j]);
        }  

        //покрасим клетки
        const keysCheckBox = Object.keys(newLiveBoxMap);
        if (keysCheckBox.length > 0) {
            for(let i = 0; i < keysCheckBox.length; i++) {
                setDataForBox(keysCheckBox[i], liveBoxArr, liveBoxMap, newLiveBoxMap);
                toggleColorBox(newLiveBoxMap, keysCheckBox[i], itemRefs);
            }
        }
        //избавимся от мертвых
        const keysBox = Object.keys(liveBoxMap);
        if (keysBox.length > 0) {
            for(let i = 0; i < keysBox.length; i++) {
                if (!liveBoxMap[keysBox[i]]) 
                    delete liveBoxMap[keysBox[i]];
            }
        }
    }
}

const toggleColorBox = (newLiveBoxMap, key, itemRefs) => {
    if (newLiveBoxMap[key] && !itemRefs[key].classList.contains("box-color"))
        itemRefs[key].classList.add("box-color");
    if (!newLiveBoxMap[key] && itemRefs[key].classList.contains("box-color"))
        itemRefs[key].classList.remove("box-color");
}

const setDataForBox = (key, liveBoxArr, liveBoxMap, newLiveBoxMap) => {
    let coord = parseCoordinates(key);
    liveBoxArr[coord.y][coord.x] = Number(newLiveBoxMap[key]);
    liveBoxMap[key] = newLiveBoxMap[key];
}

const getSumLiveBox = (key, length, liveBoxArr) => {
    let coord = parseCoordinates(key);                                      //получаем координаты живой клетки
    let arrNeighbors = getNeighbors(coord.x, coord.y, length);              //находим соседей и добавляем в множество
    let _arrNeighbors = Array.from(arrNeighbors);
    let result = sumLiveBox(liveBoxArr, _arrNeighbors, coord.x, coord.y);    //получаем сумму живых клеток-соседей
    return {arrNeighbors, result};
}

const setStateBox = (result, newLiveBoxMap, key) => {
    if (result < 2 || result > 3)
        newLiveBoxMap[key] = false;
    if (result === 3) 
        newLiveBoxMap[key] = true;  //добавляем в новый массив клетки, которые стали живыми
}

const getNeighbors = (x, y, length) => {
    // let arrNeighbors = [];
    // x = Number(x);
    // y = Number(y);
    // if (x + 1 > 0 && x + 1 <= length) arrNeighbors.push(`${y}_${x + 1}`);    //->
    // if (x + 1 > 0 && x + 1 <= length && y + 1 > 0 &&  y + 1 <= length) arrNeighbors.push(`${y + 1}_${x + 1}`);
    // if (y + 1 > 0 && y + 1 <= length) arrNeighbors.push(`${y + 1}_${x}`);
    // if (x - 1 > 0 && x - 1 <= length && y + 1 > 0 && y + 1 <= length) arrNeighbors.push(`${y + 1}_${x - 1}`);
    // if (x - 1 > 0 && x - 1 <= length) arrNeighbors.push(`${y}_${x - 1}`);
    // if (x - 1 > 0 && x - 1 <= length && y - 1 > 0 && y - 1 <= length) arrNeighbors.push(`${y - 1}_${x - 1}`);
    // if (y - 1 > 0 && y - 1 <= length) arrNeighbors.push(`${y - 1}_${x}`);
    // if (x + 1 > 0 && x + 1 <= length && y - 1 > 0 && y - 1 <= length) arrNeighbors.push(`${y - 1}_${x + 1}`);
    // return arrNeighbors;

    let arrNeighbors = new Set();
    x = Number(x);
    y = Number(y);
    if (x + 1 > 0 && x + 1 <= length) arrNeighbors.add(`${y}_${x + 1}`);    //->
    if (x + 1 > 0 && x + 1 <= length && y + 1 > 0 &&  y + 1 <= length) arrNeighbors.add(`${y + 1}_${x + 1}`);
    if (y + 1 > 0 && y + 1 <= length) arrNeighbors.add(`${y + 1}_${x}`);
    if (x - 1 > 0 && x - 1 <= length && y + 1 > 0 && y + 1 <= length) arrNeighbors.add(`${y + 1}_${x - 1}`);
    if (x - 1 > 0 && x - 1 <= length) arrNeighbors.add(`${y}_${x - 1}`);
    if (x - 1 > 0 && x - 1 <= length && y - 1 > 0 && y - 1 <= length) arrNeighbors.add(`${y - 1}_${x - 1}`);
    if (y - 1 > 0 && y - 1 <= length) arrNeighbors.add(`${y - 1}_${x}`);
    if (x + 1 > 0 && x + 1 <= length && y - 1 > 0 && y - 1 <= length) arrNeighbors.add(`${y - 1}_${x + 1}`);
    return arrNeighbors;
}

const sumLiveBox = (liveBoxArr, arrNeighbors) => {
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