const INITIAL_STATE = {
  id: '',
  category: '',
  expenseMonth: '',
  valueTotal: 0,
  categories: []
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case 'CHANGE_CATEGORY':    
      return {...state, category: action.payload}
    case 'SET_MONTH_EXPENSE':
      return {...state, expenseMonth: action.payload}
    case 'SET_ITEM_EXPENSE':
      const categories = [...state.categories]
      categories.push(action.payload)
      
      // Soma todos os gastos
      const values = categories.map(({value}) => parseInt(value))
      const valueTotal = values.reduce((total, item) => total + item)
      return {...state, categories, valueTotal} 
    case 'SET_LIST_EXPENSE':
      return {...state, categories: action.payload.categories, expenseMonth: action.payload.month, id: action.payload._id}
    case 'SAVE_LIST_EXPENSE':
      return state
    default:
      return state
  }
}