import React, { Component } from 'react'
import { Formik } from 'formik'
import FormLogin from './FormLogin'
import axios from 'axios'
import { login, isAuthenticated } from '../../services/auth'

import facebook from '../../assets/images/facebook.png'
import google from '../../assets/images/search.png'

const URL = 'http://localhost:3333/users/login'

export default class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      logged: false
    }

    // binds
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    if(isAuthenticated) {
      this.setState({...this.state, logged: true})
    }
  }

  // Handle Submit
  async handleSubmit(values) {
    try {
      const { data: user } = await axios.post(URL, values)
      login(user.token)
      console.log('vezes')
      this.setState({logged: true })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const { logged } = this.state

    return (
      !logged ? (
        <div className="logo-container">
          <div className="login-box">
            {/* Login com midias sociais */}
            <div className="login-social">
              <span className="title">Entrar com</span>
              <div className="social-media">
                <div className="box-social">
                  <img src={facebook} alt="" />
                  <span className="name">facebook</span>
                </div>

                <div className="box-social">
                  <img src={google} alt="" />
                  <span className="name">google</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="form-container">
              <span className="title">Ou entre com seu email</span>
              {/* Formulario */}
              <Formik
                component={FormLogin}
                onSubmit={this.handleSubmit}
              />
            </div>
          </div>
        </div>
      ) : (
        window.location.href = "/"
      )
    )
  }
}
