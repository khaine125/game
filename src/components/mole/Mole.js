import gsap from 'gsap';
import { useRef, useEffect, useState } from 'react';
import * as moleConstants from '../../utils/constants/mole.constants';

function Mole({ onWhack, points, delay, speed, pointsMin = 10 }) {
  const buttonRef = useRef(null);
  const bobRef = useRef(null);
  const pointsRef = useRef(points);

  const [whacked, setWhacked] = useState(false);

  const whack = () => {
    setWhacked(true);
    onWhack(pointsRef.current);
  }

  useEffect(() => {
    gsap.set(buttonRef.current, {
      yPercent: 100,
      display: 'block'
    });

    bobRef.current = gsap.to(buttonRef.current, {
      yPercent: 0,
      duration: speed,
      yoyo: true,
      repeat: -1,
      delay: delay,
      repeatDelay: delay,
      onRepeat: () => {
        pointsRef.current = Math.floor(
          Math.max(pointsRef.current * moleConstants.POINTS_MULTIPLIER, pointsMin)
        )
      },
    });

    return () => {
      if (bobRef.current)
        bobRef.current.kill()
    }
  }, [delay, pointsMin, speed]);

  useEffect(() => {
    if (whacked) {
      pointsRef.current = points;
      bobRef.current.pause();

      gsap.to(buttonRef.current, {
        yPercent: 100,
        duration: 0.1,
        onComplete: () => {
          gsap.delayedCall(gsap.utils.random(1, 3),
          () => {
            setWhacked(false);
            bobRef.current.restart()
            .timeScale(bobRef.current.timeScale() * moleConstants.TIME_MULTIPLIER)
          })
        }
      })
    }
  }, [whacked]);

  return (
    <div className='mole-hole'>
      <button
        className='mole'
        ref={buttonRef}
        onClick={whack}>
        Mole
      </button>
    </div>
  );
}

export default Mole;
