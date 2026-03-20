import './App.css';
import Laskuri from './Laskuri';
import Viesti from './Viesti';
import Posts from './Posts';
import {useState} from 'react';


const App = () => {

  // App komponentin tila
  const [showLaskuri, setShowLaskuri] = useState(false)

  const huomio = () => {
    alert("Huomio!")
  }


  return (
    <div className="App">
        <h1>Hello from React</h1>

        <Posts />

        {showLaskuri && <Laskuri huomio={huomio}/>}

        {showLaskuri && <button onClick={() => setShowLaskuri(!showLaskuri)}>Piilota laskuri</button>}

        {!showLaskuri && <button onClick={() => setShowLaskuri(!showLaskuri)}>Näytä laskuri</button>}

        <Viesti teksti="tervehdys app komponentista"/>


    </div>
  );
}

export default App;
