import React, { Component } from 'react'
import formatMoney from '../../helpers/formatMoney'

import IconCategory from '../IconCategory';

export default class ListExpense extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {expenses, removeExpense} = this.props

    return (
      <div className="box-container">
        <div className="list-expenses">
          {/* header */}
          <div className="header">
            <span className="title">Gastos por Categória</span>
            <p className="text">Com limite de gasto por categória</p>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">Categória</th>
                <th scope="col">Valor</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {
                expenses.map(({ category, maxValue, _id }) => (
                  <tr>
                    <td>
                      <IconCategory 
                        category={category}
                      />
                    </td>

                    <td>{formatMoney(maxValue)}</td>

                    <th scope="row">
                      {/* actions */}
                      <div className="actions">
                        <i className="icon fas fa-pen"></i>
                        <i onClick={() => removeExpense(_id)}  className="icon fas fa-trash"></i>
                      </div>
                    </th>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

