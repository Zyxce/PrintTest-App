import React, { useEffect, Dispatch, SetStateAction, useState } from 'react'
import keysData from '../../data/KeysData.json'
import Key from './Key'
import style from './Keyboard.module.css'

interface KeyProps {
  key: string
  color: string
  width: string
}

const KeyboardKeys: KeyProps[][] = keysData

interface IProps {
  toggleActiveKey: Dispatch<SetStateAction<Set<string>>>
  styleKey: Set<string>
  toggleStyleKey: Dispatch<SetStateAction<Set<string>>>
}

const normalizeKey = (key: string): string => {
  switch (key) {
    case ' ':
      return 'Space'
    case 'CapsLock':
      return 'Caps Lock'
    case 'Backspace':
    case 'Tab':
    case 'Enter':
    case 'Shift':
      return key
    case 'Control':
      return 'Ctrl'
    case 'Alt':
      return 'Alt'
    default:
      return key
  }
}

const normalizeStyle = (key: string): string => {
  switch (key) {
    case ' ':
      return 'Space'
    case 'CapsLock':
      return 'Caps Lock'
    case 'Backspace':
    case 'Tab':
    case 'Enter':
    case 'Shift':
      return key
    case 'Control':
      return 'Ctrl'
    case 'Alt':
      return 'Alt'
    default:
      return key.toUpperCase()
  }
}

const Keyboard: React.FC<IProps> = (props) => {
  const { toggleActiveKey, toggleStyleKey, styleKey } = props

  // состояние только для волны
  const [waveOrigin, setWaveOrigin] = useState<{
    row: number
    col: number
  } | null>(null)

  useEffect(() => {
    const handleKeyEvent = (event: KeyboardEvent, isKeyDown: boolean) => {
      const normalizedKey = normalizeKey(event.key)
      const styledKey = normalizeStyle(event.key)

      toggleActiveKey((prev) => {
        const newSet = new Set(prev)
        isKeyDown ? newSet.add(normalizedKey) : newSet.delete(normalizedKey)
        return newSet
      })

      toggleStyleKey((prev) => {
        const newSet = new Set(prev)
        isKeyDown ? newSet.add(styledKey) : newSet.delete(styledKey)
        return newSet
      })

      // находи позицию нажатой клавиши
      if (isKeyDown) {
        KeyboardKeys.forEach((row, rowIndex) => {
          row.forEach((keyObj, colIndex) => {
            if (keyObj.key === normalizedKey) {
              setWaveOrigin({ row: rowIndex, col: colIndex })
            }
          })
        })
      }
    }

    const keyDownHandler = (e: KeyboardEvent) => handleKeyEvent(e, true)
    const keyUpHandler = (e: KeyboardEvent) => handleKeyEvent(e, false)

    window.addEventListener('keydown', keyDownHandler)
    window.addEventListener('keyup', keyUpHandler)

    return () => {
      window.removeEventListener('keydown', keyDownHandler)
      window.removeEventListener('keyup', keyUpHandler)
    }
  }, [toggleActiveKey, toggleStyleKey])

  return (
    <div className={style.keyboardContainer}>
      {KeyboardKeys.map((row, rowIndex) => (
        <div key={rowIndex} className={style.keyboardRow}>
          {row.map((keyObj, colIndex) => (
            <Key
              key={keyObj.key}
              propKey={keyObj}
              activeKey={styleKey}
              waveOrigin={waveOrigin}
              position={{ row: rowIndex, col: colIndex }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Keyboard
