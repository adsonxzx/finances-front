import React from 'react'

export default props => (
  <div className="card-form">
    {/* header */}
    <div className="header">

      {
        props.number ? (
          <div className="number">
            <span>{props.number}</span>
          </div>
        ) : null
      }
      <span className="title">{props.title}</span>
      <span className="info">{props.info}</span>
    </div>
  </div>
)