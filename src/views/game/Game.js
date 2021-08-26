import { Fragment, useState } from 'react';
import { Mole, Score, Timer } from '../../components';
import * as constants from '../../utils/constants/timer.constants';
import './Game.css';

const Moles = ({ children }) => <div>{children}</div>;

function Game() {
  const [playing, setPlaying] = useState(false);
  console.log(constants);

  return (
    <Fragment>
      {!playing && <h1>Whac-A-Mole</h1>}
      <button onClick={() => setPlaying(!playing)}>
        {playing ? 'Stop' : 'Start'}
      </button>
      {playing && (
        <Fragment>
          <Score />
          <Timer time={constants.TIME_LIMIT} interval={1000} onEnd={null} />
          <Moles>
            <Mole />
            <Mole />
            <Mole />
            <Mole />
            <Mole />
          </Moles>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Game;
