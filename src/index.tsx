import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { StateProvider } from './Context/StateProvider'
import { initialState } from './Context/initialState'
import reducer from './Context/reducer'

const rootNode = document.getElementById('app')

ReactDOM.render(
  <Router>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </Router>,
  rootNode
)
