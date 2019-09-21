import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import userAvatar from '../assets/images/user.jpg'
import loading from '../assets/images/loading.svg'

export default class Header extends Component {
  constructor(props){
    super(props)
    this.state = {
      notificationOpen: false,
      data: []
    }


    // Bind
    this.handleNotificationOpen = this.handleNotificationOpen.bind(this)
    this.getListNotification = this.getListNotification.bind(this)
  }

  componentDidMount(){

  }

  async getListNotification() {
    try {
      const {data} = await axios.get("http://localhost:3333/expenses")
      this.setState({...this.state, data})
    } catch (e) {
      console.log(e)
    }
  }

  handleNotificationOpen(){
    this.getListNotification()
    this.setState({...this.state, notificationOpen: !this.state.notificationOpen})
  }

  render() {
    const {pathname} = window.location

    if(pathname === "/login" || pathname === "/register") {
      return null
    }

    return (
      <header className="main-header">
        <Link to="/">
          Dashboard
        </Link>

        <div className="right-content">
          {/* Notificação */}
          <div className="icon-alert-container">
            {/* Icon Alert */}
            <div className="icon-alert" onClick={this.handleNotificationOpen}>
              <i className="icon fas fa-bell"></i>
              <span className="nmessage">3</span>
            </div>

            {/* Notification Container */}
            <div className={this.state.notificationOpen ? 'notification-content active' : 'notification-content'}>
               {
                 this.state.data.length > 0 ? (
                  <p>Conteudo</p>
                 ) : <img src={loading} alt=""/>
               }
              
            </div>
          </div>


          {/* Menssagem */}
          <div className="icon-alert">
            <i className="icon fas fa-envelope"></i>
            <span className="nmessage">0</span>
          </div>

          {/* Avatar */}
          <div className="user-avatar">
            <div className="image">
              <img src={userAvatar} alt=""></img>
            </div>
          </div>
        </div>
      </header>
    )
  }
}
