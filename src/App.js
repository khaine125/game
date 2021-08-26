import './App.css';
import { Game } from './views';
import {useState} from 'react';

function App() {
  const [interval, setInterval] = useState(1000);

  return (
    <>
      <Game />
    </>
  );
}

export default App;
