import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  incrementBreak,
  decrementBreak,
  incrementSession,
  decrementSession,
  toggleTimer,
  decrementTimeLeft,
  reset,
} from '../store/timerSlice';

const Timer: React.FC = () => {
  const dispatch = useAppDispatch();
  const timer = useAppSelector((state) => state.timer);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer.isRunning) {
      interval = setInterval(() => {
        if (timer.timeLeft === 0) {
          audioRef.current?.play();
          // Ensure state updates after timer reaches zero
          setTimeout(() => {
            dispatch(decrementTimeLeft());
          }, 1000);
        } else {
          dispatch(decrementTimeLeft());
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer.isRunning, timer.timeLeft, dispatch]);

  useEffect(() => {
    if (timer.timeLeft === 0) {
      audioRef.current?.play();
    }
  }, [timer.timeLeft]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    dispatch(reset());
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between mb-8">
        <div>
          <h2 id="break-label" className="text-xl font-bold mb-2">Break Length</h2>
          <div className="flex items-center gap-4">
            <button id="break-decrement" onClick={() => dispatch(decrementBreak)} className="px-3 py-1 bg-blue-500 text-white rounded">-</button>
            <span id="break-length">{timer.breakLength}</span>
            <button id="break-increment" onClick={() => dispatch(incrementBreak)} className="px-3 py-1 bg-blue-500 text-white rounded">+</button>
          </div>
        </div>
        <div>
          <h2 id="session-label" className="text-xl font-bold mb-2">Session Length</h2>
          <div className="flex items-center gap-4">
            <button id="session-decrement" onClick={() => dispatch(decrementSession)} className="px-3 py-1 bg-blue-500 text-white rounded">-</button>
            <span id="session-length">{timer.sessionLength}</span>
            <button id="session-increment" onClick={() => dispatch(incrementSession)} className="px-3 py-1 bg-blue-500 text-white rounded">+</button>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 id="timer-label" className="text-2xl font-bold mb-4">{timer.label}</h2>
        <div id="time-left" className="text-4xl font-mono mb-6">
          {formatTime(timer.timeLeft)}
        </div>
        <div className="flex justify-center gap-4">
          <button
            id="start_stop"
            onClick={() => dispatch(toggleTimer)}
            className="px-6 py-2 bg-green-500 text-white rounded"
          >
            {timer.isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            id="reset"
            onClick={handleReset}
            className="px-6 py-2 bg-red-500 text-white rounded"
          >
            Reset
          </button>
        </div>
      </div>

      <audio
        id="beep"
        ref={audioRef}
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
};

export default Timer;
