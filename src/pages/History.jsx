import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

import BarChar2 from '../components/charts/BarChart2'
import LineChart from '../components/LineChart'
import queryString from 'query-string'
import BoxExpense from '../components/BoxExpense'
import CardPatrimonio from '../components/CardPatrimonio'
import getNameMonth from '../utils/getNameMonth'
import IconPlus from '../assets/images/plus.png'
import MessageE from '../components/MessageE'

const URL = 'http://localhost:3333'

export default class History extends Component {

  constructor(props) {
    super(props)
    this.state = {
      listExpenseMonth: [],
      openMessage: false,
      variant: 'success',
      message: ''
    }

    // Binds
    this.getListExpenseMonth = this.getListExpenseMonth.bind(this)
    this.handleRemoveExpense = this.handleRemoveExpense.bind(this)
  }

  componentDidMount() {
    this.getListExpenseMonth()
  }

  // Obtem aa lista de gastos de todos os meses de determinado ano
  async getListExpenseMonth() {
    let year
    // Obtem o ano da url ou ano atual
    if (this.props.location.search) {
      const query = queryString.parse(this.props.location.search)
      year = query.year
    } else {
      const date = new Date()
      year = date.getFullYear()
    }
    try {
      const { data } = await axios.get(`${URL}/expenses-month/?year=${year}`)
      this.setState({ ...this.state, listExpenseMonth: data })
    } catch (e) {
      console.log(e)
    }
  }

  // Obtem os gastos do mes atual
  getCurrentMonth(listExpenseMonth) {
    const date = new Date()
    const currentMonth = getNameMonth(date.getMonth())
    const currentListExpenseMonth = listExpenseMonth.filter(({ month }) => month === currentMonth)
    return currentListExpenseMonth[0]
  }

  // Remove Lista de gasto de determinado mes
  async handleRemoveExpense(id) {
    try {
      await axios.delete(`${URL}/expenses-month/${id}`)
      this.setState({...this.state, openMessage: true, variant: 'success', message: 'Lista de gasto removida com sucesso!'})
      this.getListExpenseMonth()
    } catch (e) {
      console.log(e)
      this.setState({...this.state, openMessage: true, variant: 'error', message: 'Error ao excluir gasto!'})
    }
  }

  render() {

    const { listExpenseMonth } = this.state
    const currentListExpenseMonth = listExpenseMonth ? this.getCurrentMonth(listExpenseMonth) : null
    const date = new Date()
    const currentMonth = getNameMonth(date.getMonth())
    const currentYear = date.getFullYear()

    // Dados para o grafico de linha
    const months = listExpenseMonth.map(({ month }) => month)
    const values = listExpenseMonth.map(({ valueTotal }) => valueTotal)

    console.log(listExpenseMonth)
    return (
      <div>
        {/* Info top */}
        <div className="info-top-container">
          <div className="info-top-titleaction">
            <h4 className="page-title">Histórico de Gastos</h4>
            {/* Add gasto */}
            <Link to={`/register-expense/?year=2019`} className="icon-addexpense">
              <div className="icon">
                <img src={IconPlus} alt="" />
              </div>
            </Link>
          </div>

          {/* Filtro year*/}
          <div className="filter-year">
            <span className="label">2019</span>
            <div className="dropdown">
              <i className="fas fa-ellipsis-v"></i>
            </div>
          </div>

        </div>

        {/* Historico de gastos */}
        <section className="section-margin row">
          {/* Historico do mes atual */}
          <div className="col-5">
            {
              currentListExpenseMonth ? (
                <BoxExpense
                  month={currentListExpenseMonth.month}
                  year={currentListExpenseMonth.year}
                  listExpense={currentListExpenseMonth.categories}
                  action="create"
                  handleRemoveExpense={this.handleRemoveExpense}
                />
              ) :
                <BoxExpense
                  month={currentMonth}
                  year={currentYear}
                />
            }
          </div>

          {/* Grafico de barra do mes atual */}
          <div className="col-7">
            <div className="box-container">
              <BarChar2 />
            </div>
          </div>
        </section>

        {/* Grafico com historico de gasto */}
        <section className="section-margin">
          {
            // So renderiza o grafico de houver dados
            months.length > 0 && values.length > 0 ? (
              <LineChart
                months={months}
                values={values}
              />
            ) : null
          }
        </section>

        {/* Gastos de todos os meses */}
        <section className="section-margin">
          <h4 className="section-title">Gastos de todos os meses</h4>

          {/* Meses */}
          {
            listExpenseMonth ? (
              listExpenseMonth.map((listExpenseMonth) => (
                <div key={listExpenseMonth._id} className="row section-line">
                  <div className="col-6 box-expense-container">
                    <BoxExpense
                      listExpenseMonth={listExpenseMonth}
                      action="create"
                      handleRemoveExpense={this.handleRemoveExpense}
                    />
                  </div>

                  <div className="col-6 box-patrimonio-container">
                    {/* Card patrimonio */}
                    <CardPatrimonio
                      value={listExpenseMonth.valueTotal}
                    />
                  </div>
                </div>
              ))

            ) : null

          }
        </section>
        <MessageE 
          open={this.state.openMessage}
          variant={this.state.variant}
          message={this.state.message}
        />
      </div >
    )
  }
}
