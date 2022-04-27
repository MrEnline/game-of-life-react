import Field from "../field/Field";
import Buttons from "../buttons/Buttons";
import { useState } from "react";
import { initField } from "../../utils/Init";

function App() {
    const [runGame, setRunGame] = useState(false);
    const [liveCellObj, setLiveCellObj] = useState(initField(false));

    return (
        <div className="App">
            <Buttons
                runGame={runGame}
                onStartGame={setRunGame}
                onSetLiveCellObj={setLiveCellObj}
                liveCellObj={liveCellObj}
            />
            <Field
                runGame={runGame}
                onChangeField={setLiveCellObj}
                liveCellObj={liveCellObj}
            />
        </div>
    );
}

export default App;
