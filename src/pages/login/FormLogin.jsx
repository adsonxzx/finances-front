import React from 'react'
import { Field } from 'formik'
import { Link } from 'react-router-dom'

export default ({
  handleSubmit,
  email,
  password,
}) => (
    <form onSubmit={handleSubmit}>
      <div className="form-group input-group">
        <div className="input-wraper">
          <i className="icon fas fa-envelope"></i>
          {/* <input className="form-input" type="text" placeholder="Email" name="email" /> */}
          <Field
            name="email"
            placeholder="Email"
            className="form-input"
            type="text"
            value={email}
          />
        </div>
      </div>

      <div className="form-group input-group">
        <div className="input-wraper">
          <i className="icon fas fa-lock"></i>
          <Field
            name="password"
            placeholder="Senha"
            className="form-input"
            type="password"
            value={password}
          />
          {/* <input className="form-input" type="password" placeholder="Senha" name="password" /> */}
        </div>
      </div>

      <div className="form-group input-radio">
        <input type="radio" id="remeber" name="remeber" />
        <label htmlFor="remeber">Lembre-me</label>
      </div>

      {/* btn entrar */}
      <div className="action-button">
        <button type="submit" className="login-button">Entrar</button>
      </div>

      {/* info register */}
      <div className="info-register">
        <span className="info">Não possui uma conta?</span>
        <Link className="link" to="/register">
          Criar nova conta
    </Link>
      </div>

    </form>
  )