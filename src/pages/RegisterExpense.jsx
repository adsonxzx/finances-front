import React, { Component } from 'react'
import { Formik } from 'formik'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as Yup from 'yup'
import queryString from 'query-string'

import TitleForm from '../components/TitleForm'
import FormExpenseMonth from './register-expense/FormExpenseMonth';
import BoxExpense from '../components/BoxExpense';
import { setItemExpense, setListExpense } from './register-expense/expenseMonthActions'


const URL = 'http://localhost:3333'

const expenseMonthSchema = Yup.object().shape({
  nameMonth: Yup.string(),
  nameExpense: Yup.string()
    .required('Digite o nome do gasto'),
  value: Yup.number('Digite apenas numeros')
    .required('Digire o valor do gasto')
})

class RegisterExpense extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dateValues: {},
      expenseAction: 'create',
      listExpenseEdit: [],
    }

    // Binds
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleListExpense = this.handleListExpense.bind(this)
  }

  componentDidMount(){
    const dataValuesQuery = queryString.parse(this.props.location.search)

    // Verifica se é para editar gasto ou criar um novo - edit se vinher ano e mes da url
    const dataValues = JSON.stringify(dataValuesQuery) !== '{}' ? dataValuesQuery : null
    if(dataValues.year && dataValues.month) {
      this.setState({...this.state, dataValues, expenseAction: 'edit'})
      const {year, month} = dataValues
      this.handleListExpense(year,month)
    } 
  }

  // Cadastra gasto na lista de gasto da store
  handleSubmit(e) {
    const category = this.props.category
    const expense = { ...e, category }
    this.props.setItemExpense(expense)
  }

  // Obtem lista de gasto para Edição
  async handleListExpense(year,month){
    try {
      const {data} = await axios.get(`${URL}/expenses-month/?year=${year}&month=${month}`)
      this.props.setListExpense(data[0])
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const { listExpenseMonth } = this.props
    const {expenseAction} = this.state

    return (
      <div>
        <h4 className="page-title">Cadastrar Gastos do Mês</h4>
        <TitleForm
          title="Informe Seus Gastos do Mês por Categória"
          info="(mercado, moradia, lazer)"
        />

        <section className="section-title row">
          <div className="col-6">
            <div className="col-12">
              <Formik
                onSubmit={this.handleSubmit}
                handleCategory={this.handleCategory}
                validationSchema={expenseMonthSchema}
                render={ props =>
                  <FormExpenseMonth {...props} {...this.state}/>
                }
              />
            </div>
          </div>

          <div className="col-6">
            <BoxExpense
              listExpenseMonth={listExpenseMonth}
              action={expenseAction}
            />
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  category: state.expenseMonth.category,
  expenseMonth: state.expenseMonth.expenseMonth,
  categories: state.expenseMonth.categories,
  listExpenseMonth: state.expenseMonth
})

const mapDispathToProps = dispath => bindActionCreators({ setItemExpense, setListExpense }, dispath)

export default connect(mapStateToProps, mapDispathToProps)(RegisterExpense)
