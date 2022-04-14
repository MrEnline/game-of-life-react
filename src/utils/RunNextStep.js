
export const runNextStep = (liveBoxArr, liveBoxMap, itemRefs) => {
    console.log(liveBoxArr);
    console.log(liveBoxMap);
    console.log(itemRefs);
    itemRefs["1_1"].classList.toggle("box-color");
}