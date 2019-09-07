import React from 'react'
import { Field } from 'formik'
import formatMoney from '../../helpers/formatMoney'

export default ({
  handleSubmit,
  name,
  errors,
  touched,
  value
}) => (
    <form onClick={handleSubmit} className="form-income row">
      <div className="col-6">
        <label> Nome da Conta </label>
        <Field
          type="text"
          className="form-control"
          placeholder="Nome do objetivo"
          value={name}
          name="bank"
        />

        {/* {errors.name && touched.name ? (
          <p className="msg-error">{errors.name}</p>
        ) : null} */}
      </div>

      <div className="col-3">
        <label>Valor</label>
        <Field
          name="value"
          value={value}
          type="text"
          className="form-control"
          placeholder={formatMoney(0)}
        />

        {/* {errors.value && touched.value ? (
          <p className="msg-error">{errors.value}</p>
        ) : null} */}
      </div>

      <div className="col-3">
        <label>Valor</label>
        <Field
          name="value"
          value={value}
          type="text"
          className="form-control"
          placeholder={formatMoney(0)}
        />

        {/* {errors.value && touched.value ? (
          <p className="msg-error">{errors.value}</p>
        ) : null} */}
      </div>

      <button type="submit" className="btn btn-success">Adicionar</button>
    </form>
  )