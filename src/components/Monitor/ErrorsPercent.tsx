import React from 'react'
import style from './ErrorsPercent.module.css'

interface IProps {
  errorsCount: number
  textLength: number
}
const ErrorsPercent: React.FC<IProps> = ({ textLength, errorsCount }) => {
  const errorsPercent = (100 - (errorsCount / textLength) * 100).toFixed(1)
  return (
    <div className={style.errorContainer}>
      <p className={style.errorText}>
        Percentage without errors: <span>{errorsPercent}%</span>
      </p>
    </div>
  )
}

export default ErrorsPercent
