import {FIELD_SIZE} from '../utils/Constants'

export const runNextStep = (liveBoxMap) => {

    let keysLiveBox = Object.keys(liveBoxMap);
    if (keysLiveBox.length === 0) {
        return;
    }

    let allNeighbors = [];
    for (let i = 0; i < keysLiveBox.length; i++) {
        const sumNeighbors = getSumNeighbors(keysLiveBox[i], FIELD_SIZE, keysLiveBox);
        allNeighbors = [...allNeighbors, ...sumNeighbors.currNeighbors];
        if (sumNeighbors.result < 2 || sumNeighbors.result > 3) {
            liveBoxMap[keysLiveBox[i]] = false;
        }
    }

    allNeighbors = [...new Set(allNeighbors)];
    for (let i = 0; i < allNeighbors.length; i++) {
        if (keysLiveBox.includes(allNeighbors[i])) continue;
        const sumNeighbors = getSumNeighbors(allNeighbors[i], FIELD_SIZE, keysLiveBox);
        if (sumNeighbors.result === 3) {
            liveBoxMap[allNeighbors[i]] = true;
        }
    }

    keysLiveBox = Object.keys(liveBoxMap);
    for (let i = 0; i < keysLiveBox.length; i++) {
        if (!liveBoxMap[keysLiveBox[i]]) {
            delete liveBoxMap[keysLiveBox[i]];
        }
    }

    return liveBoxMap;
};

const getSumNeighbors = (xy, sizeBoard, keysLiveBox) => {
    const coord = parseCoordinates(xy);
    const currNeighbors = getNeighbors(coord, sizeBoard);
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

    if (x + 1 <= sizeBoard.rows) {
        arrNeighbors.push(`${y}_${x + 1}`);       
    } 
    else {
        arrNeighbors.push(`${y}_${1}`);          
    }
  
    if (x + 1 <= sizeBoard.rows && y + 1 <= sizeBoard.columns) {
        arrNeighbors.push(`${y + 1}_${x + 1}`);        
    }
    else if (x + 1 <= sizeBoard.rows && y + 1 > sizeBoard.columns) {
        arrNeighbors.push(`${1}_${x + 1}`);        
    }   
    else if (x + 1 > sizeBoard.rows && y + 1 <= sizeBoard.columns) {
        arrNeighbors.push(`${y + 1}_${1}`);       
    }
    else {
        arrNeighbors.push(`${1}_${1}`);        
    }
    
    if (y + 1 <= sizeBoard.columns) {
        arrNeighbors.push(`${y + 1}_${x}`);        
    }
    else {
        arrNeighbors.push(`${1}_${x}`);        
    }

    if (x - 1 > 0 && y + 1 <= sizeBoard.columns) {
        arrNeighbors.push(`${y + 1}_${x - 1}`);        
    }
    else if (x - 1 > 0 && y + 1 > sizeBoard.columns) {
        arrNeighbors.push(`${1}_${x - 1}`);          
    }
    else if (x - 1 < 1 && y + 1 <= sizeBoard.columns) {
        arrNeighbors.push(`${y + 1}_${sizeBoard.rows}`);        
    } 
    else {
        arrNeighbors.push(`${1}_${sizeBoard.rows}`);        
    }

    if (x - 1 > 0) {
        arrNeighbors.push(`${y}_${x - 1}`);        
    }
    else {
        arrNeighbors.push(`${y}_${sizeBoard.rows}`);       
    }

    if (x - 1 > 0 && y - 1 > 0) {
        arrNeighbors.push(`${y - 1}_${x - 1}`);        
    }
    else if(x - 1 < 1 && y - 1 > 0) {
        arrNeighbors.push(`${y - 1}_${sizeBoard.rows}`);        
    }
    else if(x - 1 > 0 && y - 1 < 1) {
        arrNeighbors.push(`${sizeBoard.columns}_${x - 1}`);        
    }
    else {
        arrNeighbors.push(`${sizeBoard.columns}_${sizeBoard.rows}`);        
    }

    if (y - 1 > 0) {
        arrNeighbors.push(`${y - 1}_${x}`);          
    } 
    else {
        arrNeighbors.push(`${sizeBoard.columns}_${x}`);         
    }

    if (x + 1 <= sizeBoard.rows && y - 1 > 0) {
        arrNeighbors.push(`${y - 1}_${x + 1}`);        
    }
    else if(x + 1 > sizeBoard.rows && y - 1 > 0) {
        arrNeighbors.push(`${y - 1}_${1}`);        
    }
    else if(x + 1 <= sizeBoard.rows && y - 1 < 1) {
        arrNeighbors.push(`${sizeBoard.columns}_${x + 1}`);        
    }
    else {
        arrNeighbors.push(`${sizeBoard.columns}_${1}`);        
    }

    return arrNeighbors;
};
