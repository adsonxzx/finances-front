import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Home from '../pages/Home'
import History from '../pages/History'
import Targets from '../pages/Targets'
import Config from '../pages/Config'
import Welcome from '../pages/Welcome';
import RegisterExpense from '../pages/RegisterExpense'
import Login from '../pages/Login'

export default props => (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/historico" component={History} />
      <Route path="/objetivos" component={Targets} />
      <Route path="/configuracao" component={Config} />
      <Route path="/welcome" component={Welcome} />
      <Route path="/register-expense" component={RegisterExpense} />
      <Route path="/login" component={Login} />
    </Switch>
)
