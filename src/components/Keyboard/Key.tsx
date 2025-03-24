// Key.tsx
import React, { useEffect, useState } from 'react'
import style from './Key.module.css'

interface KeyProps {
  key: string
  color: string
  width: string
}

interface IProps {
  propKey: KeyProps
  activeKey: Set<string>
  waveOrigin: { row: number; col: number } | null
  position: { row: number; col: number }
}

const Key: React.FC<IProps> = ({
  activeKey,
  propKey,
  waveOrigin,
  position,
}) => {
  const [waveIntensity, setWaveIntensity] = useState(0)

  useEffect(() => {
    if (!waveOrigin) return

    // вычисление расстояние от источника волны
    const distance = Math.sqrt(
      Math.pow(position.row - waveOrigin.row, 2) +
        Math.pow(position.col - waveOrigin.col, 2)
    )

    // запуск анимаии только для близких клавиш
    if (distance <= 3) {
      const delay = distance * 50 // задержка от расстояния
      const duration = 300 - distance * 50 // длительность волны

      const timer = setTimeout(() => {
        setWaveIntensity(1)
        setTimeout(() => setWaveIntensity(0), duration)
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [waveOrigin, position])

  return (
    <div
      className={`${style.key} ${
        activeKey.has(propKey.key) ? style.activeKey : ''
      }`}
      style={{
        color: propKey.color,
        width: propKey.width,
        borderColor: activeKey.has(propKey.key) ? propKey.color : '',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Блок для волны */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: waveIntensity * 100 + '%',
          height: waveIntensity * 100 + '%',
          backgroundColor: propKey.color,
          transform: 'translate(-50%, -50%)',
          opacity: 1 - waveIntensity,
          transition: 'all 0.3s ease-out',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      {/* оригинальный дизайн клавиши */}
      <div
        className={style.keyDesign}
        style={{ backgroundColor: propKey.color }}
      />
    </div>
  )
}

export default Key
