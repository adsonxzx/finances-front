import React from 'react'

const getIconCategory = (category) => {
  switch(category) {
    case 'mercado':
      return <i className="fas fa-shopping-basket"></i>
    case 'lazer':
      return <i className="fas fa-umbrella-beach"></i> 
    case 'moradia':
      return <i className="fas fa-home"></i>
    default:
      return <i className="fas fa-question"></i>
  }
}

export default props => (
  <div className={`category-icon -${props.category}`}>
    <div className="icon">
      {/* obtem o icon por categoria */}
      {getIconCategory(props.category)}
    </div>
    <span className="category">{props.category}</span>
  </div>
)