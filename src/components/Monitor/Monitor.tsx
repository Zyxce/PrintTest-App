import React, { useEffect, useRef, useState } from 'react'
import { FaCode, FaLaptopCode, FaTimes } from 'react-icons/fa'
import style from './Monitor.module.css'
import TextTable from './TextTable'
import textArray from '../../data/textArrayData.json'
import ErrorsPercent from './ErrorsPercent'
import PrintSpeedTimer from './PrintSpeedTimer'
import SreenPanel from './SсreenPanel'
import LeftPanel from './LeftPanel'

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
      <div className={style.monitorScreen}>
        <div className={style.monitorApp}>
          <div className={style.monitorAppPanel}>
            <FaLaptopCode className={style.panelIcon} size={12} />
            <FaTimes className={style.panelIcon} size={12} />
          </div>
          <div className={style.monitorAppContent}>
            <LeftPanel />
            <div className={style.monitorAppContentRight}>
              <p className={style.monitorAppContentCode}>
                <span>{'<'}</span>p class<span>{'='}</span>
                <span className={style.monitorAppContentCodeSpan}>
                  "textArea"
                </span>
                <span>{'>'}</span>
              </p>
              <TextTable
                errorIndex={errorIndex}
                currentIndex={currentIndex}
                letters={letters}
              />
              <p className={style.monitorAppContentCode}>
                <span>{'</'}</span>p<span>{'>'}</span>
              </p>
              <div className={style.monitorAppBottom}>
                <ErrorsPercent
                  textLength={letters.length}
                  errorsCount={errorsCount}
                />
                <PrintSpeedTimer
                  currentTime={currentTime}
                  startTime={startTime}
                  currentIndex={currentIndex}
                  textLength={letters.length}
                />
              </div>
              <div className={style.monitorConsolePanel}>
                <p>PROBLEMS</p>
                <p>OUTPUT</p>
                <p>DEBUG CONSOLE</p>
                <p>TERMINAL</p>
                <p>PORTS</p>
                <p>GITLENS</p>
              </div>
            </div>
          </div>
        </div>
        <SreenPanel />
      </div>
      <div className={style.monitorHull}></div>
      <div className={style.monitorBottom}>
        <div className={style.monitorLogo}>
          <FaCode className={style.logoIcon} size={36} />
          <p>Zyxce</p>
        </div>
        <div className={style.monitorBottomBtn}></div>
        <div className={style.monitorBottomNull}></div>
      </div>
      <div className={style.monitorStand}></div>
      <div className={style.monitorStandBottom1}></div>
      <div className={style.monitorStandBottom2}></div>
    </div>
  )
}

export default Monitor
