import React from 'react'
import { Field } from 'formik'
import formatMoney from '../../helpers/formatMoney'

export default ({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  errors,
  touched,
  name,
  value,
  dirty,
  isSubmitting,
}) => (
    <form onSubmit={handleSubmit} className="form-income" action="">
      <div className="col-3">
        <label> Nome da Renda </label>
        <Field
          type="text"
          className="form-control"
          placeholder="Nome da renda"
          value={name}
          name="name"
        />

        {errors.name && touched.name ? (
          <p className="msg-error">{errors.name}</p>
        ) : null}
      </div>

      <div className="col-4">
        <label>Valor</label>
        <Field
          name="value"
          value={value}
          type="text"
          className="form-control"
          placeholder={formatMoney(0)}
        />

        {errors.value && touched.value ? (
          <p className="msg-error">{errors.value}</p>
        ) : null}

      </div>

      <button type="submit" className="btn btn-success">Adicionar</button>

    </form>
  )