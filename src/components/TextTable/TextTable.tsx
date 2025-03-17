import React, { useEffect, useState } from 'react'
import style from './TextTable.module.css'

interface IProps {
  activeKey: Set<string>
}

interface ILetter {
  letter: string
  key: string
  onFocus: boolean
  isActive: boolean
  isError: boolean
}

const TextTable: React.FC<IProps> = (props) => {
  const { activeKey } = props

  const [textObjectArray, setTextObjectArray] = useState<ILetter[]>([
    { letter: 'H', key: 'H', onFocus: false, isActive: true, isError: false },
    { letter: 'e', key: 'E', onFocus: true, isActive: false, isError: false },
    { letter: 'l', key: 'L', onFocus: false, isActive: false, isError: false },
    { letter: 'l', key: 'L', onFocus: false, isActive: false, isError: false },
    { letter: 'o', key: 'O', onFocus: false, isActive: false, isError: false },
    {
      letter: ' ',
      key: 'Space',
      onFocus: false,
      isActive: false,
      isError: false,
    },
    { letter: 'W', key: 'W', onFocus: false, isActive: false, isError: false },
    { letter: 'o', key: 'O', onFocus: false, isActive: false, isError: false },
    { letter: 'r', key: 'R', onFocus: false, isActive: false, isError: false },
    { letter: 'l', key: 'L', onFocus: false, isActive: false, isError: false },
    { letter: 'd', key: 'D', onFocus: false, isActive: false, isError: false },
  ])
  useEffect(() => {
    const currentKey = textObjectArray.find((letter) =>
      activeKey.has(letter.key)
    )

    if (currentKey) {
      const updatedLetters = textObjectArray.map((letter) => {
        if (letter.key === currentKey.key) {
          return { ...letter, onFocus: true }
        } else {
          return { ...letter, onFocus: false }
        }
      })

      setTextObjectArray(updatedLetters)
    }
  }, [activeKey, textObjectArray])
  return (
    <div>
      {textObjectArray.map((letter: any, index) => (
        <span
          key={index}
          className={
            (letter.isError && `${style.isError}`) ||
            (letter.onFocus && `${style.onFocus}`) ||
            (letter.isActive && `${style.isActive}`)
          }
        >
          {letter.letter}
        </span>
      ))}
    </div>
  )
}

export default TextTable
