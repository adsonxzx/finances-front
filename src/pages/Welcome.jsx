import React, { Component } from 'react'

import iconMoney from '../assets/images/money.png'
import iconDivision from '../assets/images/division.png'
import iconTarget from '../assets/images/target.png'
import MessageError from '../components/MessageError'

import Target from '../components/target/Target';
import Income from '../components/income/Income'
import Expense from '../components/expense/Expense'

export default class Welcome extends Component {

  constructor(props) {
    super(props)
    this.state = {
      message: "as",
      open: false,
      content: 'targets'
    }

    this.selectForm = this.selectForm.bind(this)
  }

  renderComponent(content) {
    if (content === 'incomes') {
      return <Income />
    }

    if (content === 'expenses') {
      return <Expense />
    }

    if (content === 'targets') {
      return <Target />
    }
  }

  selectForm(content) {
    this.setState({ content })
  }

  render() {
    const { message, open, content } = this.state

    return (
      <div className="container-fluid">
        < MessageError
          message={message}
          open={open}
        />

        {/* Header  */}
        <div className="page-header section-margin -updown">
          <h3 className="title">Informe seus dados financeiros</h3>
        </div>

        {/* Select form */}
        <div className="card-select-container section-margin">
          {/* card select */}
          <div className={content === 'incomes' ? 'card-select select' : 'card-select'} onClick={() => this.selectForm('incomes')} >

            {
              content === 'incomes' ? (
                <div className="icon-select">
                  <i className="icon fas fa-check"></i>
                </div>
              ) : null
            }

            <div className="image">
              <img src={iconMoney} alt="" />
            </div>

            <span className="title">Ganhos</span>
          </div>

          {/* card select */}
          <div className={content === 'expenses' ? 'card-select select' : 'card-select'} onClick={() => this.selectForm('expenses')}>

            {
              content === 'expenses' ? (
                <div className="icon-select">
                  <i className="icon fas fa-check"></i>
                </div>
              ) : null
            }

            <div className="image">
              <img src={iconDivision} alt="" />
            </div>

            <span className="title">Gastos</span>
          </div>

          {/* card select */}
          <div className={content === 'targets' ? 'card-select select' : 'card-select'} onClick={() => this.selectForm('targets')}>

            {
              content === 'targets' ? (
                <div className="icon-select">
                  <i className="icon fas fa-check"></i>
                </div>
              ) : null
            }
            <div className="image">
              <img src={iconTarget} alt="" />
            </div>

            <span className="title">Objetivos</span>
          </div>

        </div>

        {/* render o forumalio da categoria selecionada */}
        {
          this.renderComponent(content)
        }

      </div >
    )
  }
}
