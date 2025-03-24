import React from 'react'
import classNames from 'classnames'
import style from './TextTable.module.css'

interface ILetter {
  letter: string
  key: string
}
interface IProps {
  letters: ILetter[]
  currentIndex: number
  errorIndex: number | null
}

const TextTable: React.FC<IProps> = ({ letters, errorIndex, currentIndex }) => {
  return (
    <div className={style.textContainer}>
      {letters.map((letter, index) => {
        const isActive: boolean = index < currentIndex
        const onFocus: boolean = index === currentIndex
        const isError: boolean = index === errorIndex

        return (
          <span
            key={index}
            className={classNames({
              [style.isError]: isError,
              [style.onFocus]: onFocus,
              [style.isActive]: isActive,
            })}
          >
            {letter.letter}
          </span>
        )
      })}
    </div>
  )
}

export default TextTable
