import React from 'react'
import style from './LeftPanel.module.css'
import { FaReact, FaCss3, FaJs, FaSass, FaCss3Alt } from 'react-icons/fa'

const LeftPanel = () => {
  interface ILeftPanelItem {
    icon: React.ReactNode
    text: string
  }
  const leftPanel: ILeftPanelItem[] = [
    {
      icon: (
        <FaReact
          style={{ color: 'cyan' }}
          className={style.panelIcon}
          size={12}
        />
      ),
      text: 'PrintTextTest.tsx',
    },
    {
      icon: (
        <FaCss3
          style={{ color: 'blue' }}
          className={style.panelIcon}
          size={12}
        />
      ),
      text: 'PrintTextTest.css',
    },
    {
      icon: (
        <FaCss3Alt
          style={{ color: 'blue' }}
          className={style.panelIcon}
          size={12}
        />
      ),
      text: 'PrintTextTest.css.map',
    },
    {
      icon: (
        <FaSass
          style={{ color: 'red' }}
          className={style.panelIcon}
          size={12}
        />
      ),
      text: 'PrintTextTest.sass',
    },
    {
      icon: (
        <FaJs
          style={{ color: 'yellow' }}
          className={style.panelIcon}
          size={12}
        />
      ),
      text: 'App.js',
    },
    {
      icon: (
        <FaCss3
          style={{ color: 'blue' }}
          className={style.panelIcon}
          size={12}
        />
      ),
      text: 'App.css',
    },
  ]
  return (
    <div className={style.monitorAppContentLeft}>
      {leftPanel.map((item) => (
        <div className={style.monitorAppContentLeftItem}>
          {item.icon}
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  )
}

export default LeftPanel
