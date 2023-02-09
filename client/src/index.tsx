import React from 'react'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import store from './store'
import './styles/index.css'

if (typeof window !== 'undefined') {
  const rootElement = document.getElementById("root")

  if (rootElement != null) {
    const root = createRoot(rootElement)
    root.render(
      <Provider store={store}>
    		<BrowserRouter>
    		  <App />
    		</BrowserRouter>
      </Provider>
    )
  }
}
