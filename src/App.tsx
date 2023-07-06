import React from 'react'
import { HashRouter } from 'react-router-dom';
import IndexRouter from './router';
import './App.scss'

export default function App() {
  return (
    <HashRouter>
      <IndexRouter />
    </HashRouter>
  )
}
