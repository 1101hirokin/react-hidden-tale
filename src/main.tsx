import React from 'react'
import { createRoot } from 'react-dom/client'
import "normalize.css"
import "./global.scss"

const App = () => {

  return (
    <div ></div>
  )
}
const root = createRoot(document.getElementById('root')!)
root.render(<App />)
