import Field from '../field/Field'
import Buttons from '../buttons/Buttons'
import { useState } from "react";

function App() {
  
  const descButtons = ['Start game', 'Step', 'Random game', 'Clear field'];

  const [stateGame, setStateGame] = useState(false);

  const startGame = () => {
      setStateGame(!stateGame);
  }
  
  return (
      <div className="App">
          <Buttons descButtons={descButtons} startGame={startGame}/>
          <Field runGame={stateGame}/>
      </div>
  );
}

export default App;
