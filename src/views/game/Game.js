import { Fragment, useState, useEffect } from 'react';
import gsap from 'gsap';
import { Mole, Score, Timer } from '../../components';
import * as timerConstants from '../../utils/constants/timer.constants';
import * as moleConstants from '../../utils/constants/mole.constants';
import './Game.css';

const Moles = ({ children }) => <div className="moles">{children}</div>;

const usePersistentState = (key, initialValue) => {
  const [state, setState] = useState(
    window.localStorage.getItem(key) ?
    JSON.parse(window.localStorage.getItem(key)) :
    initialValue
  );

  useEffect(() => {
    window.localStorage.setItem(key, state)
  }, [key, state]);

  return [state, setState];
};

function Game() {
  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [hightScore, setHightScore] = usePersistentState('whac-high-score', 0);
  const [newHighScore, setNewHighScore] = useState(false);

  const onWhack = points => setScore(score + points);

  const generateMoles = () => moleConstants.MOLE_COLLECTION.map(() => ({
    speed: gsap.utils.random(0.5, 1),
    delay: gsap.utils.random(0.5, 4),
    points: moleConstants.MOLE_SCORE
  }));

  const [moles, setMoles] = useState(generateMoles());

  const endGame = () => {
    setPlaying(false);
    setFinished(true);

    if (score > hightScore) {
      setHightScore(score);
      setNewHighScore(true);
    }
  };

  const startGame = () => {
    setScore(0);
    setMoles(generateMoles());
    setPlaying(true);
    setFinished(false);
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
          {newHighScore &&
            <div className='info-text'>NEW High Score!</div>
          }
          <Score value={score} />
          <button onClick={startGame}>Play again</button>
        </Fragment>
      }
    </Fragment>
  );
}

export default Game;
