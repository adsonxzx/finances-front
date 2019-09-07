import React, { Component } from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios'

import TitleForm from '../TitleForm';
import FormExpense from '../expense/FormExpense'
import BarChart from '../charts/BarChart';
import ListExpense from './ListExpense';

const validate = Yup.object().shape({
  category: Yup.string()
    .required('Selecione um categoria')
  ,
  maxValue: Yup.number()
    .required('Valor não pode ser vazio')
})

const URL = "http://localhost:3333/expenses"

export default class Expense extends Component {

  constructor(props) {
    super(props)
    this.state = {
      expenses: []
    }

    // Binds
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getExpenses = this.getExpenses.bind(this)
    this.removeExpense = this.removeExpense.bind(this)

    this.getExpenses()
  }

  // Cadastra gasto
  async handleSubmit(values, actions) {
    try {
      await axios.post(URL, values)
      this.getExpenses()
    } catch (e) {
      console.log(e)
    }
  }

  // Obtem gastos
  async getExpenses() {
    try {
      const { data } = await axios.get(URL)
      this.setState({ ...this.state, expenses: data })
    } catch (e) {
      console.log(e)
    }
  }

  // Remove gasto
  async removeExpense(id) {
    try {
      await axios.delete(`${URL}/${id}`)
      this.getExpenses()
    } catch (e) {
      console.log(e)
    }
  }

  render() {

    const { expenses } = this.state

    return (
      <div>
        {/* Seccao fomulario de ganhos*/}
        <section className="section-margin">
          {/* Title form */}
          <TitleForm
            number="1"
            title="Informe Seus Gastos por Categória"
            info="(mercado, moradia, lazer)"
          />

          {/* Fomulario */}
          <Formik
            component={FormExpense}
            onSubmit={this.handleSubmit}
            validationSchema={validate}
          />
        </section>

        {/* Seccao lista e grafico*/}
        <section className="row section-margin -updown">
          {/* Lista de Despesas */}
          <div className="col-6">
            <ListExpense
              expenses={expenses}
              removeExpense={this.removeExpense}
            />
          </div>

          {/* Grafico de despesas */}
          <div className="col-6">
            <div className="box-container">
              <BarChart
                expenses={expenses}
              />
            </div>
          </div>
        </section>
      </div>
    )
  }
}