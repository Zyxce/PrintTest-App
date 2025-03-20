import React, { useEffect, useRef, useState } from 'react'
import style from './Monitor.module.css'
import TextTable from './TextTable'
import textArray from '../../data/textArrayData.json'
import ErrorsPercent from './ErrorsPercent'
import PrintSpeedTimer from './PrintSpeedTimer'

interface IProps {
  activeKey: Set<string>
  onKeyProcessed: () => void
}

interface ILetter {
  letter: string
  key: string
}

const letters: ILetter[] = textArray

const Monitor: React.FC<IProps> = ({ activeKey, onKeyProcessed }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [errorIndex, setErrorIndex] = useState<number | null>(null)
  const [errorsCount, setErrorsCount] = useState<number>(0)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [currentTime, setCurrentTime] = useState<number>(Date.now())
  const errorCountedRef = useRef<Set<number>>(new Set())

  //логика для счета знаков в минуту
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (currentIndex === 0 && activeKey.size > 0 && !startTime) {
      setStartTime(Date.now())
    }
  }, [currentIndex, activeKey, startTime])

  // логика для обработки кнопок
  useEffect(() => {
    const specialKeys: Set<string> = new Set([
      'Caps Lock',
      'Shift',
      'Ctrl',
      'Alt',
      'Tab',
      'Enter',
      'Backspace',
    ])

    if (currentIndex >= letters.length) {
      return
    }

    const currentLetter: ILetter = letters[currentIndex]
    const pressedKeys: string[] = Array.from(activeKey)

    // фильтрация специальных кнопок
    const nonSpecialKeys: string[] = pressedKeys.filter(
      (key) => !specialKeys.has(key)
    )

    // если нажата не специальная клавиша
    if (nonSpecialKeys.length > 0) {
      const isCorrectKey = nonSpecialKeys.some(
        (key) => key === currentLetter.key
      )

      if (isCorrectKey) {
        setCurrentIndex((prev) => prev + 1)
        setErrorIndex(null)
        onKeyProcessed()
      } else {
        setErrorIndex(currentIndex)
        // была ли ошибка уже засчитана для этого индекса
        if (!errorCountedRef.current.has(currentIndex)) {
          setErrorsCount((prev) => prev + 1)
          errorCountedRef.current.add(currentIndex)
        }
        onKeyProcessed()
      }
    }
  }, [activeKey, currentIndex, onKeyProcessed])

  return (
    <div className={style.monitorContainer}>
      <TextTable
        errorIndex={errorIndex}
        currentIndex={currentIndex}
        letters={letters}
      />
      <ErrorsPercent textLength={letters.length} errorsCount={errorsCount} />
      <PrintSpeedTimer
        currentTime={currentTime}
        startTime={startTime}
        currentIndex={currentIndex}
        textLength={letters.length}
      />
      <div className={style.monitorHull}></div>
      <div className={style.monitorBottom}></div>
    </div>
  )
}

export default Monitor
