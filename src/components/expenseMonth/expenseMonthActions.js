import axios from 'axios'

const URL = 'http://localhost:3333'

// Seleciona a categoria do gasto
export const changeCategory = (category) =>  {
  return ({
    type: "CHANGE_CATEGORY",
    payload: category
  })
}

// Seleciona o mes do gasto
export const setMonthExpense = (month) => {
  console.log('setou o mes')
  return ({
    type: "SET_MONTH_EXPENSE",
    payload: month
  })
}

// Adiciona gasto a lista de gastos
export const setItemExpense = (expense) => {
  return ({
    type: "SET_ITEM_EXPENSE",
    payload: expense
  })
}

// Atualiza a lista de gastos
export const setListExpense = (listExpense) => {
  return ({
    type: "SET_LIST_EXPENSE",
    payload: listExpense
  })
}

export const saveListExpense = (expenseMonth) => {
  axios.post(URL, expenseMonth).then(() => {
    return ({
      type: "SAVE_LIST_EXPENSE" 
    })
  }).catch((e) => console.log(e))
}

export const clearListExpense = () => {
  return ({
    type: "CLEAR_LIST_EXPENSE"
  })
}
