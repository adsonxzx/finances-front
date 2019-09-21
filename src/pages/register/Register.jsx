import React, { Component } from 'react'
import { Formik } from 'formik'
import FormRegister from './FormRegister'
import axios from 'axios'
import MessageE from '../../components/MessageE'
import {login} from '../../services/auth'

const URL = "http://localhost:3333"

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openMessage: false,
      variant: '',
      message: ''
    }

    // Binds
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(values, {resetForm}) {
    try {
      const {data} = await axios.post(`${URL}/users`, values)
      login(data.token)
      this.setState({...this.state,variant:'success', message: 'Usuário cadastrado com sucesso', openMessage: true})
      window.location.href = "http://localhost:3000/"
    } catch (e) {
      this.setState({...this.state, message: 'Error ao cadastrar usuário', variant: 'error', openMessage: true})
    }
  }

  render() {
    const {openMessage, message, variant} = this.state
    return (
      <div className="logo-container">
        <div className="login-box">

          {/* Form */}
          <div className="form-container">
            <span className="title">Entre com seus dados</span>
            <Formik
              component={FormRegister}
              onSubmit={this.handleSubmit}
            />
          </div>
        </div>
        {/* messagem de error */}
        <MessageE 
          open={openMessage}
          variant={variant}
          message={message}
        />
      </div>
    )
  }
}
