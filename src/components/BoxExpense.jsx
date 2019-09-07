import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types'

import formatMoney from '../helpers/formatMoney'
import IconPlus from '../assets/images/plus.png'

class BoxExpense extends Component {

  render() {
    const { listExpenseMonth, action } = this.props

    let listExpense = []
    let month
    let year
    let id 
    if (listExpenseMonth) {
      listExpense = listExpenseMonth.categories
      month = listExpenseMonth.month
      year = listExpenseMonth.year
      id = listExpenseMonth._id
    }

    return (
      <div>
        <div className="box-header">
          <span className="title">Despesas de {month}</span>

          <div className="actions">

            < i onClick={() => this.props.handleRemoveExpense(id)} class="delete fas fa-trash"></i>

            {
              action === 'create' ? (
                <Link to={`register-expense/?month=${month}&year=${year}`}>
                  <i className="edit fas fa-pen"></i>
                </Link>
              ) : null
            }
          </div>
        </div>

        {/* Lista de gastos */}
        {
          listExpense.length > 0 ? (
            listExpense.map(({ category, value, _id, nameExpense }) => (
              <div key={_id} className={`box-expense -${category}`}>
                <span className="name">{nameExpense}</span>
                <span className="value">{formatMoney(value)}</span>
              </div>
            ))
          ) :
            <Link to={`register-expense/?month=${this.props.month}&year=${this.props.year}`} className="icon-add">
              <span className="title">Adicionar gastos do mês</span>
              <div className="icon">
                <img src={IconPlus} alt="" />
              </div>
            </Link>
        }

        {
          listExpenseMonth ? (
            <div className="expenses-totals">
              <div className="names">
                <span>Total</span>
              </div>

              <div className="values">
                <span>{formatMoney(listExpenseMonth.valueTotal)}</span>
              </div>
            </div>
          ) : null
        }


      </div >
    )
  }
}

export default BoxExpense

