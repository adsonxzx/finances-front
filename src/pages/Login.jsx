import React from 'react'
import facebook from '../assets/images/facebook.png'
import google from '../assets/images/search.png'


export default (props) => (
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
        <form action="">
          <div className="form-group input-group">
            <div className="input-wraper">
              <i class="icon fas fa-envelope"></i>
              <input className="form-input" type="text" placeholder="Email" name="email" />
            </div>
          </div>

          <div className="form-group input-group">
            <div className="input-wraper">
              <i class="icon fas fa-lock"></i>
              <input className="form-input" type="password" placeholder="Senha" name="senha" />
            </div>
          </div>

          <div className="form-group input-radio">
            <input type="radio" id="remeber" name="remeber" />
            <label htmlFor="remeber">Lembre-me</label>
          </div>
          
          <div className="action-button">
            <button type="submit" className="login-button">Entrar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
)