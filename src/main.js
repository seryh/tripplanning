import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import _ from 'lodash'
import './styles/main.scss'

// Store Initialization
// ------------------------------------

const store = createStore(window.__INITIAL_STATE__ || {})

const defaultOptions = {
  basePath: '/',
  env: 'develop',
  locale: 'ru',
  messages: {}
}

store.options = {...store.options, ...defaultOptions, ..._.get(window, 'appOptions', {})}

window.__STORE__ = store

// Render Setup
// ------------------------------------
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const App = require('./components/App').default
  const routes = require('./routes/index').default(store)

  ReactDOM.render(
    <App store={store} routes={routes} options={store.options} />,
        MOUNT_NODE
    )
}


// Development Tools
// ------------------------------------
if (process.env.__DEV__) {
  if (module.hot) {
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    render = () => {
      try {
        renderApp()
      } catch (e) {
        console.error(e)
        renderError(e)
      }
    }

        // Setup hot module replacement
    module.hot.accept([
      './components/App',
      './routes/index'
    ], () => setImmediate(() => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE)
      render()
    }))
  }
}

// Let's Go!
// ------------------------------------
if (!process.env.__TEST__) render()
