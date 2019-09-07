import React, { Component } from 'react'
import { Field } from 'formik'
import axios from 'axios'
import { bindActionCreators } from 'redux'
import { changeCategory, setMonthExpense, saveListExpense } from './expenseMonthActions'
import { connect } from 'react-redux'

import MessageE from '../MessageE'

import formatMoney from '../../helpers/formatMoney'
import IconCategory from '../../components/IconCategory';


const URL = 'http://localhost:3333'

class FormExpenseMonth extends Component {

  constructor(props) {
    super(props)
    this.state = {
      category: 'mercado',
      categories: [],
      openMessage: false,
      variant: 'success',
      message: ''
    }

    // Binds
    this.handleListExpense = this.handleListExpense.bind(this)
  }

  componentDidMount() {
    this.getCategories()
  }

  // Seleciona a categoria
  selectCategory(e) {
    const element = document.getElementsByClassName('category-box')

    // // Remove all class   
    for (let i = 0; i < element.length; i++) {
      element[i].classList.remove('select')
    }

    // // Add class
    e.currentTarget.classList.add('select')
  }

  // Obtem todas as categirias disponiveis
  async getCategories() {
    try {
      const { data } = await axios.get(`${URL}/expense-category`)
      this.setState({ ...this.state, categories: data })
    } catch (e) {
      console.log(e)
    }
  }

  // Salva a lista de gastos do mes
  async handleListExpense() {
    try {
      let expenseMonth
      // Edita lista de gasto
      if(this.props.expenseAction === 'edit') {
        expenseMonth = {
          month: this.props.dateValues.month,
          valueTotal: this.props.valueTotal,
          categories: this.props.categories,
          year: this.props.dateValues.year

        }
        const id = this.props.id
        await axios.patch(`${URL}/expenses-month/${id}`, expenseMonth)
        this.setState({...this.state, openMessage: true, variant: 'success', message: 'Lista de gasto alterada com sucesso!'})

      } else {
        const date = new Date()
        const year = date.getFullYear()
        expenseMonth = {
          month: this.props.expenseMonth,
          valueTotal: this.props.valueTotal,
          categories: this.props.categories,
          year
        }
        await axios.post(`${URL}/expenses-month`, expenseMonth)
        this.setState({...this.state, openMessage: true, variant: 'success', message: 'Lista de gasto cadastrada com sucesso!'})
      }
    } catch (e) {
      const message = 'Error ao cadastrar'
      this.setState({...this.state, openMessage: true, variant: 'error', message})
      console.log(`Error ao cadastrar ${e}`)
    }
    
  }

  handleMessage(){
    this.setState({...this.state, openMessage: true})
  }

  render() {

    const { categories, openMessage, variant, message } = this.state
    const { nameMonth } = this.props.values
    const {expenseMonth, errors, touched, dateValues, expenseAction} = this.props

    if(nameMonth) {
      this.props.setMonthExpense(nameMonth)
    }

    // Seleciona o mes vindo do form ou da url
    const monthSelected = expenseMonth ? expenseMonth : dateValues.month

    return (
      <form className="form-income row" onSubmit={this.props.handleSubmit}>
        <h4 className="title">Gasto de {monthSelected}</h4>
        {
          !nameMonth && (expenseAction !== 'edit') ? (
            <div className="col-12">
              <label>Selecione o Mês</label>
              <Field className="form-control" component="select" name="nameMonth">
                <option defaultValue>Selecione um mês</option>
                <option value="janeiro">Janeiro</option>
                <option value="fevereiro">Fevereiro</option>
                <option value="marco">Marco</option>
                <option value="abril">Abril</option>
                <option value="maio">Maio</option>
                <option value="junho">Junho</option>
                <option value="julho">Julho</option>
                <option value="agosto">Agosto</option>
                <option value="setembro">Setembro</option>
                <option value="outubro">Outubro</option>
                <option value="novembro">Novembro</option>
                <option value="dezembro">Dezembro</option>
              </Field>
              {errors.nameMonth && <p className="msg-error">{errors.nameMonth}</p>}
            </div>
          ) : null
         }

        <div className="col-6">
          <label className="mt-3">Nome do Gasto</label>
          <Field
            className="form-control"
            name="nameExpense"
            placeholder="nome do gasto"
            value={this.props.nameExpense}
          />
          {errors.nameExpense && touched.nameExpense && <p className="msg-error">{errors.nameExpense}</p>}
        </div>

        <div className="col-6">
          <label className="mt-3">Valor</label>
          <Field
            className="form-control"
            name="value"
            placeholder={formatMoney(0)}
            value={this.props.value}
          />
          {errors.value && touched.value && <p className="msg-error">{errors.value}</p>}
        </div>

        <div className="col-12 mt-3">
          <label className="list-categories-title">Selecione uma Categoria</label>
          <div className="list-categories">
            {
              categories ? (
                categories.map(({ expenseCategory, _id }) => (
                  <div key={_id} className="category-box" data-category={expenseCategory} onClick={() => this.props.changeCategory(expenseCategory)}>
                    <IconCategory key={_id} category={expenseCategory} />
                  </div>
                ))
              ) : null
            }
          </div>
        </div>

        {/* Botão adiciona  */}
        <div className="col-12">
          <button type="submit" className="btn btn-success mt-3">Adicionar</button>
          <span className="btn btn-primary mt-3 ml-3" onClick={this.handleListExpense}> Salvar</span>
        </div>
        <MessageE 
          open={openMessage}
          variant={variant}
          message={message}
        />
      </form >
    )
  }
}

const mapStateToProps = state => ({
  id: state.expenseMonth.id,
  category: state.expenseMonth.category,
  expenseMonth: state.expenseMonth.expenseMonth,
  categories: state.expenseMonth.categories,
  valueTotal: state.expenseMonth.valueTotal
})

const mapDispathToProps = dispath => bindActionCreators({ changeCategory, setMonthExpense, saveListExpense }, dispath)

export default connect(mapStateToProps, mapDispathToProps)(FormExpenseMonth)


