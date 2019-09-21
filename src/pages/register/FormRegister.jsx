import React from 'react'
import { Field } from 'formik'

export default ({
  handleSubmit,
  name,
  email,
  password,
  errors,
  touched
}) => (
    <form onSubmit={handleSubmit}>
      <div className="form-group input-group">
        <div className="input-wraper">
          <i class="icon fas fa-user"></i>
          <Field
            name="name"
            placeholder="Nome"
            className="form-input"
            type="text"
            value={name}
          />
        </div>
      </div>

      <div className="form-group input-group">
        <div className="input-wraper">
          <i class="icon fas fa-envelope"></i>
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
          <i class="icon fas fa-lock"></i>
          <Field
            name="password"
            placeholder="Senha"
            className="form-input"
            type="password"
            value={password}
          />
        </div>
      </div>

      {/* btn entrar */}
      <div className="action-button">
        <button type="submit" className="login-button">Cadastrar</button>
      </div>

    </form>
  )