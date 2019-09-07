import axios from 'axios'

const URL = 'http://localhost:3333'

export const changeCategory = (category) =>  {
  return ({
    type: "CHANGE_CATEGORY",
    payload: category
  })
}

export const setMonthExpense = (month) => {
  return ({
    type: "SET_MONTH_EXPENSE",
    payload: month
  })
}

// Atualiza item da lista de gasto
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
