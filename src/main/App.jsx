import React from 'react'
import '../utils/dependecs'
import { BrowserRouter as Routers } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import SideBar from '../components/SideBar'
import Header from '../components/Header'
import Router from '../main/Routes'
import reduces from './reduces'

// Habilita a extesao redux
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
  && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(reduces, devTools)

export default props => (
  <Provider store={store}>
    <div className="main">
      <Routers>
        {console.log()}

        {
          window.location.pathname === "/login" ? (
            <Router />
          ) : (
              <>
                <SideBar />
                <div className="main-content">
                  <Header />
                  <div className="container">
                    <Router />
                  </div>
                </div>
              </>
            )
        }

      </Routers>
    </div>
  </Provider>
)
