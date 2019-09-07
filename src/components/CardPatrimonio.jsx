import React from 'react'

import formatMoney from '../helpers/formatMoney'

export default ({value}) => (
  <div className="card-patrimonio">
    <span className="title">Patrimônio Total</span>
    <span className="value">{formatMoney(value)}</span>
    <div className="info-resume">
      <div className="percent -up">
        <i className="fas fa-arrow-up"></i> 2.0 %
    </div>
      <span className="info">Último mês</span>
    </div>
  </div>
) 