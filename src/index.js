import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import { Root } from './core/root'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<Root />, document.getElementById('root'))
registerServiceWorker()
