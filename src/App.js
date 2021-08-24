import './App.css';
import Time from './Timer';
import {useState} from 'react';

function App() {
  const [interval, setInterval] = useState(1000);

  return (
    <>
      <Time interval={interval} />
      <h2>{`Interval: ${interval}`}</h2>
      <input type="range" min="1" value={interval} max="10000" onChange={e => setInterval(e.target.value)}/>
    </>
  );
}

export default App;
