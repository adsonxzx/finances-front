import React, { Component } from 'react'
import axios from 'axios'

import CardResume from '../components/CardResume'
import LineChart from '../components/LineChart'
import PieChart from '../components/PieChart'

const URL = 'http://localhost:3333'

export default class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      totalIncome: 0,
      totalExpenses: 0,
      totalAccouts: 0
    }

    // Binds
    this.getIncomes = this.getIncomes.bind(this)
    this.getExpenses = this.getExpenses.bind(this)
    this.getAccounts = this.getAccounts.bind(this)
    this.getIncomes()
    this.getExpenses()
    this.getAccounts()
  }

  // Obtem ganhos
  async getIncomes() {
    try {
      const { data } = await axios.get(`${URL}/incomes`)
      const valores = data.map(income => income.value)
      const totalIncome = valores.reduce((a, b) => a + b)
      this.setState({ ...this.state, totalIncome })
    } catch (e) {
      console.log(e);
    }
  }

  // Obtem gastos
  async getExpenses() {
    try {
      const { data } = await axios.get(`${URL}/expenses`)
      const valores = data.map(income => income.maxValue)
      const totalExpenses = valores.reduce((a, b) => a + b)
      this.setState({ ...this.state, totalExpenses })
    } catch (e) {
      console.log(e);
    }
  }

  // Obtem patrimonio total
  async getAccounts() {
    try {
      const { data } = await axios.get(`${URL}/accounts`)     
      const valores = data.map(income => income.value)
      const totalAccouts = valores.reduce((a, b) => a + b)
      this.setState({ ...this.state, totalAccouts })
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { totalIncome, totalExpenses, totalAccouts } = this.state

    return (
      <div>
        {/* Overview */}
        <section className="resume-money section-margin ">
          <CardResume
            title="Ganho"
            value={totalIncome}
            color="purple"
            icon="fas fa-money-bill-wave"
          />

          <CardResume
            title="Gasto"
            value={totalExpenses}
            color="blue"
            icon="fas fa-funnel-dollar"
          />

          <CardResume
            title="Patrimônio Total"
            value={totalAccouts}
            color="red"
            icon="fas fa-wallet"
          />

          {/* <CardResume
            title="Último gasto do mes"
            value="1100"
            color="lucky"
            icon="fas fa-hand-holding-usd"
          /> */}

        </section>

        {/* Overviews gastos */}
        <section className="row">
          <div className="col-7">
            <LineChart />
          </div>

          <div className="col-5">
            <PieChart />
          </div>
        </section>
      </div>
    )
  }

}
