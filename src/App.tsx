import React, { useState } from 'react'
import './default/normalize.css' // НОРМАЛИЗЕ СИ ЭС ЭС
import './App.css'
import Keyboard from './components/Keyboard/Keyboard'
import Monitor from './components/TextTable/Monitor'

function App() {
  const [activeKey, setActiveKey] = useState<Set<string>>(new Set())

  // Функция для очистки activeKey
  const handleKeyProcessed = () => {
    setActiveKey(new Set())
  }

  return (
    <div className="App">
      <Monitor activeKey={activeKey} onKeyProcessed={handleKeyProcessed} />
      <Keyboard activeKey={activeKey} toggleActiveKey={setActiveKey} />
    </div>
  )
}

export default App
