import React from 'react'
import style from './ScreenPanel.module.css'
import {
  FaWindows,
  FaKey,
  FaLaptopCode,
  FaYandex,
  FaFolder,
  FaGithub,
} from 'react-icons/fa'

const SсreenPanel = (): JSX.Element => {
  const now: Date = new Date()
  const hours: number = now.getHours()
  const minutes: number = now.getMinutes()

  const formattedTime: string = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`
  return (
    <div className={style.monitorScreenPanel}>
      <div className={style.monitorScreenPanelItem}>
        <FaWindows className={style.panelIcon} size={10} />
      </div>
      <div className={style.monitorScreenPanelCenter}>
        <div className={style.monitorScreenPanelItem}>
          <FaKey className={style.panelIcon} size={10} />
        </div>
        <div className={style.monitorScreenPanelItemActive}>
          <FaLaptopCode className={style.panelIcon} size={10} />
        </div>
        <div className={style.monitorScreenPanelItem}>
          <FaYandex className={style.panelIcon} size={10} />
        </div>
        <div className={style.monitorScreenPanelItem}>
          <FaFolder className={style.panelIcon} size={10} />
        </div>
        <div className={style.monitorScreenPanelItem}>
          <FaGithub className={style.panelIcon} size={10} />
        </div>
      </div>
      <span className={style.monitorScreenPanelTime}>{formattedTime}</span>
    </div>
  )
}

export default SсreenPanel
