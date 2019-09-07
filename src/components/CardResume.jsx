import React from 'react'
import formatMoney from '../helpers/formatMoney'


export default props => (
  <div className="card-resume">
    <div className="value">
      <span>{props.title}</span>
      <span>{formatMoney(props.value)}</span>
    </div>

    <div className={`icon -${props.color}`}>
      <i className={props.icon}></i>
    </div>

    <div className="info-resume">
      <div className="percent -up">
        <i className="fas fa-arrow-up"></i> 2.0 %
      </div>
      <span className="info">Último mês</span>
    </div>
  </div>
)

