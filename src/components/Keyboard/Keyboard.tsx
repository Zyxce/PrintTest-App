import React, { useEffect, useState, Dispatch, SetStateAction } from 'react'
import style from './Keyboard.module.css'

const keyboardLayout: string[][] = [
  [
    'Esc',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    '-',
    '=',
    'Backspace',
  ],
  ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
  ['Caps Lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter'],
  ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'],
  ['Ctrl', 'Alt', 'Space', 'Alt', 'Ctrl'],
]

interface IProps {
  activeKey: Set<string>
  toggleActiveKey: Dispatch<SetStateAction<Set<string>>>
}

const Keyboard: React.FC<IProps> = (props) => {
  const { activeKey, toggleActiveKey } = props

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
        return key.toUpperCase()
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const normalizedKey = normalizeKey(event.key)
      toggleActiveKey((prev) => new Set(prev).add(normalizedKey))
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      const normalizedKey = normalizeKey(event.key)
      toggleActiveKey((prev) => {
        const newSet = new Set(prev)
        newSet.delete(normalizedKey)
        return newSet
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return (
    <div className={style.keyboardContainer}>
      {keyboardLayout.map((row, rowIndex) => (
        <div key={rowIndex} className={style.keyboardRow}>
          {row.map((key) => (
            <div
              key={key}
              className={`${style.key} ${
                activeKey.has(key) ? style.activeKey : ''
              } ${key === 'Space' ? style.spaceKey : ''}`}
            >
              {key}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Keyboard
