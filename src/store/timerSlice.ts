import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TimerState {
  breakLength: number;
  sessionLength: number;
  timeLeft: number;
  isRunning: boolean;
  isSession: boolean;
  label: string;
}

const initialState: TimerState = {
  breakLength: 5,
  sessionLength: 25,
  timeLeft: 25 * 60,
  isRunning: false,
  isSession: true,
  label: 'Session'
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    incrementBreak: (state) => {
      if (state.breakLength < 60) {
        state.breakLength += 1;
      }
    },
    decrementBreak: (state) => {
      if (state.breakLength > 1) {
        state.breakLength -= 1;
      }
    },
    incrementSession: (state) => {
      if (state.sessionLength < 60) {
        state.sessionLength += 1;
        if (!state.isRunning && state.isSession) {
          state.timeLeft = state.sessionLength * 60;
        }
      }
    },
    decrementSession: (state) => {
      if (state.sessionLength > 1) {
        state.sessionLength -= 1;
        if (!state.isRunning && state.isSession) {
          state.timeLeft = state.sessionLength * 60;
        }
      }
    },
    toggleTimer: (state) => {
      state.isRunning = !state.isRunning;
    },
    decrementTimeLeft: (state) => {
      if (state.timeLeft === 0) {
        state.isSession = !state.isSession;
        state.label = state.isSession ? 'Session' : 'Break';
        state.timeLeft = (state.isSession ? state.sessionLength : state.breakLength) * 60;
      } else {
        state.timeLeft -= 1;
      }
    },
    reset: (state) => {
      return {
        ...initialState,
        timeLeft: initialState.sessionLength * 60
      };
    }
  }
});

export const {
  incrementBreak,
  decrementBreak,
  incrementSession,
  decrementSession,
  toggleTimer,
  decrementTimeLeft,
  reset
} = timerSlice.actions;

export default timerSlice.reducer;
