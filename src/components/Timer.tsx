import { useEffect } from 'react';
import { Action } from '../utilities/types';

interface TimerProps {
  dispatch: React.Dispatch<Action>;
  secondsRemaining: number;
}

const Timer = ({ dispatch, secondsRemaining }: TimerProps) => {
    const mins = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;

  useEffect(() => {
    const id = setInterval(function () {
      dispatch({ type: 'TICK' });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div className="timer">
      {mins < 10 && '0'}
      {mins}:{seconds < 10 && '0'}
      {seconds}
    </div>
  );
};

export default Timer;
