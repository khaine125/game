import React, { useState, useEffect, useRef } from 'react';

function Time({time, interval = 1000, onEnd}) {
  const [intervalTime, setIntervalTime] = useState(time);
  const timer = useRef(time);

  useEffect(() => {
    if (intervalTime === 0 && onEnd)
      onEnd()
  }, [intervalTime, onEnd]);

  useEffect(() => {
    timer.current = setInterval(() => setIntervalTime(intervalTime - interval), interval);
    return () => clearInterval(timer.current);
  }, [interval]);

  return <h1>{`Time: ${intervalTime}`}</h1>;
}

export default Time;
