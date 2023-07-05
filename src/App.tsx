import React from 'react'
import { HashRouter } from 'react-router-dom';
import IndexRouter from './router';
import './App.scss'
import { RouterBeforeEach } from './router/component/RouterBeforeEach'

export default function App() {
  return (
    <HashRouter>
      <IndexRouter />
    </HashRouter>
  )
}
