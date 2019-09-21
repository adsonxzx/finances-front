import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.jpg'
import $ from 'jquery'
import api from '../services/api'
import {logout} from '../services/auth'

export default class SideBar extends Component {

  componentDidMount() {
    this.initScripts()
  }

  initScripts() {
    // ativa e desativa mini menu
    $('.toggle-menu').on("click", function () {

      $('.side-bar').toggleClass('-mini');
      $('.menu-items').toggleClass('-mini');

      $(this).children().each(function () {
        if ($(this).hasClass('active')) {
          $(this).removeClass('active');
        } else {
          $(this).addClass('active');
        }
      })
    })

    // menu ativo
    $('.menu-items a').on("click", function () {
      $('.menu-items a').each(function () {
        $(this).removeClass('active');
      })

      $(this).addClass('active');
    })
  }

  // efetua o logout
  async handleLogout(e){
    e.preventDefault()

    try {
      await api.post("/users/logout")
      logout()
      window.location.href = "http://localhost:3000/login"
    } catch (e) {
      console.log(e)
    }

  }

  render() {
    const {pathname} = window.location

    if(pathname === "/login" || pathname === "/register") {
      return null
    }
    
    return (
      <aside className="side-bar -mini">
        <div className="logo-box">
          <Link to="/">
            <img src={logo} alt=""></img>
          </Link>
        </div>

        <ul className="menu-items -mini">
          <li><Link className="active" to="/"><i className="fas fa-stream"></i> <span> Dashboard </span> </Link></li>
          <li><Link to="/historico"><i className="fas fa-history"></i> <span> Historico </span> </Link></li>
          <li><Link to="/objetivos"><i className="fas fa-bullseye"></i> <span> Objetivos </span> </Link></li>
          <li><Link to="/configuracoes"><i className="fab fa-accusoft"></i> <span> Configurações </span> </Link></li>
          <li onClick={this.handleLogout}><a href="/logout"> <i class="fas fa-sign-out-alt"></i> <span> Sair </span> </a>  </li>
        </ul>

        <div className="toggle-menu">
          <i className="fas fa-angle-double-left active"></i>
          <i className="fas fa-angle-double-right"></i>
        </div>

      </aside>
    )
  }
} 