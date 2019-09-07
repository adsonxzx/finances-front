import React from 'react'
import { Field } from 'formik'
import formatMoney from '../../helpers/formatMoney'

export default (props) => (
  <form onSubmit={props.handleSubmit} className="form-income">

    <div className="col-3">

      <label> Nome da Renda </label>
      <Field className="form-control" component="select" name="category">
        <option value="mercado">Mercado</option>
        <option value="lazer">Lazer</option>
        <option value="moradia">Moradia</option>
      </Field>

      {props.errors.category && props.touched.category ? (
        <p className="msg-error">{props.errors.category}</p>
      ) : null}

    </div>

    <div className="col-4">
      <label>Valor</label>
      <Field
        name="maxValue"
        value={props.maxValue}
        type="text"
        className="form-control"
        placeholder={formatMoney(0)}
      />

      {props.errors.maxValue && props.touched.maxValue ? (
        <p className="msg-error">{props.errors.maxValue}</p>
      ) : null}

    </div>

    <button type="submit" className="btn btn-success">Adicionar</button>

  </form>
)