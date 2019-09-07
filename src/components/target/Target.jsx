import React, { Component } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import { Formik } from 'formik'

import TitleForm from '../../components/TitleForm'
import FormTarget from '../../components/target/FormTargets'
import formatMoney from '../../helpers/formatMoney'

const URL = "http://localhost:3333"

export default class Income extends Component {

  constructor(props) {
    super(props)
    this.state = {

    }

    // Binds

  }

  componentDidMount() {

  }


  render() {

    return (
      <div>
        {/* Section formulario */}
        <section className="section-margin">
          {/* Title form */}
          <TitleForm
            number="1"
            title="Seus Objetivos Financeiros"
            info="(carro, apartamento, viagem)"
          />

          {/* Formulario */}
          <Formik
            component={FormTarget}
            onSubmit={this.handleSubmitI}
            // validationSchema={validate}
          />
        </section>

 
      </div >
    )
  }
}