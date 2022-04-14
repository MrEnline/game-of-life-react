export const initField = () => {
    const _NUMBERS_FIELD = 20;
    let liveBoxMap = {};
    let liveBoxArr = [];
    let itemRefs = [];
    
    const initArrDefaultValue = () => {
        //1-й вариант - возврат матрицы состояний после первичной инициализации
        for (let i = 1; i <= _NUMBERS_FIELD; i++) {
            liveBoxArr[i] = [];
            for(let j = 1; j <= _NUMBERS_FIELD; j++){
                liveBoxArr[i][j] = 0;
            }
        }
    }

    initArrDefaultValue();

    const getNumberField = () => {
        return _NUMBERS_FIELD;
    }

    return {liveBoxMap, liveBoxArr, itemRefs, getNumberField}
}
