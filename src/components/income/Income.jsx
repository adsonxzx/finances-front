import React, { Component } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import { Formik } from 'formik'

import TitleForm from '../../components/TitleForm'
import FormIncome from './FormIncome'
import FormBank from './FormBank'
import ListIncome from './ListIncome'
import iconAnalytic from '../../assets/images/icon-analytic.png'
import formatMoney from '../../helpers/formatMoney'
import CardResume from '../CardResume';

const URL = "http://localhost:3333"

const validate = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .required('Valor não pode ser vazio'),
  value: Yup.number()
    .min(2, 'Muito Curto')
    .required('Valor não pode ser vazio')
})

const validateBank = Yup.object().shape({
  bank: Yup.string()
    .min(2, 'Too Short!')
    .required('Valor não pode ser vazio'),
  value: Yup.number()
    .min(2, 'Muito Curto')
    .required('Valor não pode ser vazio')
})

export default class Income extends Component {

  constructor(props) {
    super(props)
    this.state = {
      incomes: [],
      accounts: []
    }

    // Binds
    this.getIncomes = this.getIncomes.bind(this)
    this.handleSubmitIncome = this.handleSubmitIncome.bind(this)
    this.handleSubmitBank = this.handleSubmitBank.bind(this)
    this.removeIncome = this.removeIncome.bind(this)
    this.getAccounts = this.getAccounts.bind(this)
  }

  componentDidMount() {
    this.getIncomes()
    this.getAccounts()
  }

  // Cadastra ganho
  async handleSubmitIncome(values) {
    console.log(values)
    try {
      await axios.post(`${URL}/incomes`, values)
      // this.setState({ ...this.state, open: true, message: "Cadastrado com sucesso!" })
      this.getIncomes()
    } catch (e) {
      console.log(e);
    }
  }

  // Obtem ganhos
  async getIncomes() {
    try {
      const { data } = await axios.get(`${URL}/incomes`)
      this.setState({ ...this.state, incomes: data })

    } catch (e) {
      console.log(e)
    }

  }

  // Remove ganho
  async removeIncome(e) {
    const id = e.target.id

    try {
      await axios.delete(`${URL}/incomes/${id}`)
      this.getIncomes()
    } catch (e) {
      console.log(e)
    }
  }

  // Cadastra banco
  async handleSubmitBank(values) {
    try {
      await axios.post(`${URL}/accounts`, values)
      this.getAccounts()
    } catch (e) {
      console.log(e)
    }
  }

  // Obtem bancos
  async getAccounts() {
    try {
      const { data } = await axios.get(`${URL}/accounts`)
      this.setState({ ...this.state, accounts: data })
    } catch (e) {
      console.log(e)
    }
  }

  render() {

    const { incomes, accounts } = this.state
    let totalIncome = 0
    let totalAccounts = 0

    if (incomes.length > 0) {
      const values = incomes.map(({ value }) => value)
      totalIncome = values.reduce((a, b) => a + b)
    }

    if (accounts.length > 0) {
      const values = accounts.map(({ value }) => value)
      totalAccounts = values.reduce((a, b) => a + b)
    }

    return (
      <div>
        {/* Section formulario */}
        <section className="section-margin">
          {/* Title form */}
          <TitleForm
            number="1"
            title="Informe Suas Rendas"
            info="(salario, investimento, alugueis)"
          />

          {/* Formulario */}
          <Formik
            component={FormIncome}
            onSubmit={this.handleSubmitIncome}
            validationSchema={validate}
          />
        </section>

        {/* Section com lista de gastos */}
        <section className="section-margin row">
          <div className="col-8">
            {/* Lista de ganhos */}
            <ListIncome
              className="-income"
              incomes={incomes}
              removeIncome={this.removeIncome}
            />
          </div>

          {/* Todos ganhos */}
          <div className="col-4">
            <div className="all-income-container box-container">
              <div className="all-income">
                <div className="image">
                  <img src={iconAnalytic} alt="" />
                </div>

                <span className="value">{formatMoney(totalIncome)}</span>

                <p className="text">Todos os Ganhos</p>
              </div>
            </div>
          </div>
        </section>

        {/* Seccao bancos */}
        <section className="section-margin">
          {/* Title form */}
          <TitleForm
            number="2"
            title="Informe suas contas bancarias com seus valores"
            info="(santander, bradesco, carteira)"
          />

          {/* Fomulario */}
          <Formik
            component={FormBank}
            onSubmit={this.handleSubmitBank}
            validationSchema={validateBank}
          />
        </section>

        {/* Lista de Bancos */}
        <section className="section-margin -updown row">
          <div className="col-8">
            <div className="row">
              {
                accounts ? (
                  accounts.map(account => (
                    <div className="col-6">
                      <CardResume
                        title={account.bank}
                        value={account.value}
                        color="purple"
                        icon="fas fa-money-bill-wave"
                      />
                    </div>
                  ))
                ) : null
              }
            </div>
          </div>

          <div className="col-4">
            <div className="all-income-container box-container">
              <div className="all-income">
                <div className="image">
                  <img src={iconAnalytic} alt="" />
                </div>

                <span className="value">{formatMoney(totalAccounts)}</span>

                <p className="text">Todos os Ganhos</p>
              </div>
            </div>
          </div>

        </section>
      </div >
    )
  }
}