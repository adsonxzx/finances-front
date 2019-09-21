import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {isAuthenticated} from '../services/auth'

import Home from '../pages/Home'
import History from '../pages/History'
import Targets from '../pages/Targets'
import Config from '../pages/Config'
import Welcome from '../pages/Welcome';
import RegisterExpense from '../pages/RegisterExpense'
import Login from '../pages/login/Login'
import Register from '../pages/register/Register'

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route 
    {...rest}
    render={(props) => (
      isAuthenticated ? (
        <Component {...props}/>
      ) : (
        window.location.href = "/login"
      )
    )}
  />
)

export default props => (
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute path="/historico" component={History} />
      <Route path="/objetivos" component={Targets} />
      <Route path="/configuracao" component={Config} />
      <Route path="/welcome" component={Welcome} />
      <Route exact path="/register-expense" component={RegisterExpense} />
      <Route path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </Switch>
)
