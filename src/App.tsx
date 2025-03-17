import React, { useState } from 'react'
import './default/normalize.css' // НОРМАЛИЗЕ СИ ЭС ЭС
import './App.css'
import Keyboard from './components/Keyboard/Keyboard.tsx'
import TextTable from './components/TextTable/TextTable.tsx'

function App() {
  const [activeKey, setActiveKey] = useState<Set<string>>(new Set())

  return (
    <div className="App">
      <Keyboard activeKey={activeKey} toggleActiveKey={setActiveKey} />
      <TextTable activeKey={activeKey} />
    </div>
  )
}

export default App
