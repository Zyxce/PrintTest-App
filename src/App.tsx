import React, { useState } from 'react'
import './default/normalize.css' // НОРМАЛИЗЕ СИ ЭС ЭС
import './App.css'
import Keyboard from './components/Keyboard/Keyboard'
import Monitor from './components/Monitor/Monitor'

function App() {
  const [activeKey, setActiveKey] = useState<Set<string>>(new Set())
  const [styleKey, setStyleKey] = useState<Set<string>>(new Set())

  // Функция для очистки activeKey
  const handleKeyProcessed = () => {
    setActiveKey(new Set())
  }

  return (
    <div className="App">
      <Monitor activeKey={activeKey} onKeyProcessed={handleKeyProcessed} />
      <Keyboard
        styleKey={styleKey}
        toggleStyleKey={setStyleKey}
        toggleActiveKey={setActiveKey}
      />
    </div>
  )
}

export default App
