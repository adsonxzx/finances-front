import React from 'react'

import formatMoney from '../../helpers/formatMoney'

export default props => (
  <div className="box-container">
    <div className={`list-expenses ${props.className}`}>
      {/* header */}
      <div className="header">
        <span className="title">Gastos por Categória</span>
        <p className="text">Com limite de gasto por categória</p>
      </div>

      <table className="table table-income">
        <thead>
          <tr>
            <th scope="col">Nome da Renda</th>
            <th scope="col">Valor</th>
            <th scope="col">%</th>
            <th scope="col">Remover</th>
          </tr>
        </thead>
        <tbody>
          {
            props.incomes ? (
              props.incomes.map(income => {
                return (
                  <tr key={income._id}>
                    <th scope="row">{income.name}</th>
                    <td>{formatMoney(income.value)}</td>
                    <td>30%</td>
                    <td><i className="icon fas fa-trash" id={income._id} onClick={props.removeIncome}></i></td>
                  </tr>
                )
              })
            ) : null
          }
        </tbody>
      </table>
    </div>
  </div>
)