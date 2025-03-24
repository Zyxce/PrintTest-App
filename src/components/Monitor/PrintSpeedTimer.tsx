import React, { useState, useEffect } from 'react'
import style from './PrintSpeedTimer.module.css'

interface IProps {
  currentTime: number
  startTime: number | null
  currentIndex: number
  textLength: number
}

const PrintSpeedTimer: React.FC<IProps> = ({
  currentTime,
  startTime,
  currentIndex,
  textLength,
}) => {
  const [isCompleted, setIsCompleted] = useState(false)
  const [savedCPM, setSavedCPM] = useState(0)

  const getCPM = (start: number | null, now: number, chars: number): number => {
    if (!start) return 0
    const timeElapsed = (now - start) / 60000
    return timeElapsed > 0 ? Math.round(chars / timeElapsed) : 0
  }

  useEffect(() => {
    if (!isCompleted && currentIndex === textLength) {
      const cpmValue = getCPM(startTime, currentTime, currentIndex)
      setSavedCPM(cpmValue)
      setIsCompleted(true)
    }
  }, [currentIndex, textLength, isCompleted, startTime, currentTime])

  const currentCPM = isCompleted
    ? savedCPM
    : getCPM(startTime, currentTime, currentIndex)

  return (
    <div className={style.timerContainer}>
      <p className={style.timerText}>
        Characters per minute: <span>{currentCPM}</span>
      </p>
    </div>
  )
}

export default PrintSpeedTimer
