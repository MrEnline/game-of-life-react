
export const runNextStep = (liveBoxArr, liveBoxMap, itemRefs) => {
    // console.log(liveBoxArr);
    // console.log(liveBoxMap);
    // console.log(itemRefs);
    // itemRefs["1_1"].classList.toggle("box-color");

    const newLiveBoxMap = [];
    const length = liveBoxArr[1].length - 1;
    
    const keysLiveBox = Object.keys(liveBoxMap);
    if (keysLiveBox.length > 0) {
        for(let i = 0; i < keysLiveBox.length; i++) {
            let coord = parseCoordinates(keysLiveBox[i]);
            let result = sumLiveBox1(liveBoxArr, coord.x, coord.y);
            
            if (result < 2 || result > 3)
                newLiveBoxMap[keysLiveBox[i]] = false;
        }
    }
}

const sumLiveBox1 = (liveBoxArr, x, y) => {
    const _x = Number(x);
    const _y = Number(y);
    let sum = 0;
    sum  = liveBoxArr[_y - 1].slice(_x - 1, _x + 2);
    sum = [...sum, ...liveBoxArr[_y].slice(_x - 1, _x + 2)];
    sum = [...sum, ...liveBoxArr[_y + 1].slice(_x - 1, _x + 2)];
    return sum.reduce((sum, currValue) => sum + currValue, 0) - 1;
}

const parseCoordinates = (xy) => {
    const x = xy.split("_")[0];
    const y = xy.split("_")[1];
    return {x, y};
}