import { Fragment, useState } from 'react';
import { Mole, Score, Timer } from '../../components';
import * as timerConstants from '../../utils/constants/timer.constants';
import * as moleConstants from '../../utils/constants/mole.constants';
import './Game.css';

const Moles = ({ children }) => <div>{children}</div>;

function Game() {
  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  const onWhack = points => setScore(score + points);

  const endGame = () => {
    setPlaying(false)
    setFinished(true)
  }

  const startGame = () => {
    setScore(0)
    setPlaying(true)
    setFinished(false)
  }

  return (
    <Fragment>
      {!playing && !finished &&
        <Fragment>
          <h1>Whac-A-Mole</h1>
          <button onClick={startGame}>
            {playing ? 'Stop' : 'Start'}
          </button>
        </Fragment>
      }
      {playing && (
        <Fragment>
          <button
            className="end-game"
            onClick={endGame}
           >
            End Game
          </button>
          <Score value={score} />
          <Timer
            time={timerConstants.TIME_LIMIT}
            onEnd={endGame}
          />
          <Moles>
            {moleConstants.MOLE_COLLECTION.map((id) =>
              <Mole key={id} onWhack={onWhack} />
            )}
          </Moles>
        </Fragment>
      )}
      {finished &&
      <Fragment>
        <Score value={score} />
        <button onClick={startGame}>Play again</button>
      </Fragment>
      }
    </Fragment>
  );
}

export default Game;
