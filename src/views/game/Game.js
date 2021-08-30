import { Fragment, useState } from 'react';
import gsap from 'gsap';
import { Mole, Score, Timer } from '../../components';
import * as timerConstants from '../../utils/constants/timer.constants';
import * as moleConstants from '../../utils/constants/mole.constants';
import './Game.css';

const Moles = ({ children }) => <div className="moles">{children}</div>;

function Game() {
  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  const onWhack = points => setScore(score + points);

  const generateMoles = () => moleConstants.MOLE_COLLECTION.map(() => ({
    speed: gsap.utils.random(0.5, 1),
    delay: gsap.utils.random(0.5, 4),
    points: moleConstants.MOLE_SCORE
  }));

  const [moles, setMoles] = useState(generateMoles());

  const endGame = () => {
    setPlaying(false)
    setFinished(true)
  };

  const startGame = () => {
    setScore(0)
    setMoles(generateMoles())
    setPlaying(true)
    setFinished(false)
  };

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
            {moles.map(({speed, delay, points}, id) =>
              <Mole
                key={id}
                onWhack={onWhack}
                points={points}
                delay={delay}
                speed={speed}
              />
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
