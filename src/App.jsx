import { useState, useEffect, useRef } from 'react'

function App() {
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isSession, setIsSession] = useState(true)
  const audioRef = useRef(null)

  useEffect(() => {
    let interval
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev === 0) {
            audioRef.current.play()
            setIsSession(prev => !prev)
            return (isSession ? breakLength : sessionLength) * 60
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, breakLength, sessionLength, isSession])

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const handleBreakDecrement = () => {
    if (breakLength > 1) setBreakLength(prev => prev - 1)
  }

  const handleBreakIncrement = () => {
    if (breakLength < 60) setBreakLength(prev => prev + 1)
  }

  const handleSessionDecrement = () => {
    if (sessionLength > 1) {
      setSessionLength(prev => prev - 1)
      if (!isRunning && isSession) setTimeLeft((sessionLength - 1) * 60)
    }
  }

  const handleSessionIncrement = () => {
    if (sessionLength < 60) {
      setSessionLength(prev => prev + 1)
      if (!isRunning && isSession) setTimeLeft((sessionLength + 1) * 60)
    }
  }

  const handleReset = () => {
    setIsRunning(false)
    setBreakLength(5)
    setSessionLength(25)
    setTimeLeft(25 * 60)
    setIsSession(true)
    audioRef.current.pause()
    audioRef.current.currentTime = 0
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">25 + 5 Clock</h1>

      <div className="flex gap-8 mb-8">
        <div>
          <h2 id="break-label" className="text-xl font-semibold mb-2">Break Length</h2>
          <div className="flex items-center gap-4">
            <button id="break-decrement" onClick={handleBreakDecrement} className="px-3 py-1 bg-blue-500 text-white rounded">-</button>
            <span id="break-length">{breakLength}</span>
            <button id="break-increment" onClick={handleBreakIncrement} className="px-3 py-1 bg-blue-500 text-white rounded">+</button>
          </div>
        </div>

        <div>
          <h2 id="session-label" className="text-xl font-semibold mb-2">Session Length</h2>
          <div className="flex items-center gap-4">
            <button id="session-decrement" onClick={handleSessionDecrement} className="px-3 py-1 bg-blue-500 text-white rounded">-</button>
            <span id="session-length">{sessionLength}</span>
            <button id="session-increment" onClick={handleSessionIncrement} className="px-3 py-1 bg-blue-500 text-white rounded">+</button>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 id="timer-label" className="text-2xl font-bold mb-4">
          {isSession ? 'Session' : 'Break'}
        </h2>
        <div id="time-left" className="text-6xl font-mono mb-6">
          {formatTime(timeLeft)}
        </div>
        <div className="flex gap-4">
          <button
            id="start_stop"
            onClick={() => setIsRunning(prev => !prev)}
            className="px-6 py-2 bg-green-500 text-white rounded"
          >
            {isRunning ? 'Pause' : 'Start'}
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
  )
}

export default App
