import {combineReducers} from 'redux'

// Reducers
import expenseMonthReducer from '../components/expenseMonth/expenseMonthReducer'

const reduces = combineReducers({
  expenseMonth: expenseMonthReducer
})

export default reduces