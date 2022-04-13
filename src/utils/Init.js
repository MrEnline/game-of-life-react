
const test = () => {
    console.log("TEST");
}

const init = (numberBox) => {
    const liveBoxArr = [];

    //1-й вариант - возврат матрицы состояний после первичной инициализации
    for (let i = 1; i <= numberBox; i++) {
        liveBoxArr[i] = [];
        for(let j = 1; j <= numberBox; j++){
            liveBoxArr[i][j] = 0;
        }
    }
    return (liveBoxArr);
}

export default init;