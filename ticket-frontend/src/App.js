import React, { Component } from 'react';
import './App.css';
import Tickets from './components/Tickets';
import NewTicket from './components/NewTicket';
import UserLogin from './components/UserLogin';
import UserSignUp from './components/UserSignUp';
import Button from 'react-bootstrap/Button'

const baseURL = 'http://localhost:8000'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ticketList: [],
      loggedIn: false,
      username: ''
    }
  }


//fetch tickets
getTickets = () => {
  fetch(baseURL + '/api/v1/tickets/', {
    credentials: 'include'
  }).then(res => {
    if(res.status === 200 || res.status === 201) {
      return res.json()
    } else {
      return []
    }
  }).then(data => {
    this.setState({
      ticketList: data.data
    })
  })
}


//add a new ticket
addTicket = (newTicket) => {
  const copyTickets = [...this.state.ticketList]
  copyTickets.push(newTicket)
  this.setState({
    ticketList: copyTickets
  })
}

componentDidMount() {
  this.getTickets()
}

loginUser = async(e) => {
  e.preventDefault()
  const url = baseURL + '/api/v1/users/login'

  let loginBody = {
    username: e.target.username.value,
    password: e.target.password.value
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(loginBody),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    if(response.status === 200){
      this.setState({
        loggedIn: true,
        // username: e.target.username.value
      })
      this.getTickets()
    }
  }
  catch(err) {
    console.log('login error:', err)
  }
}

registerUser = async(e) => {
  e.preventDefault()

  const url = baseURL + '/api/v1/users/register'

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if(response.status === 401) {
      alert("User already exists")
    } else if (response.status === 201) {
      this.loginUser(e)
    }
  } catch(error) {
    console.log('register error: ', error)
  }
}



  render() {
    return (
      <>
        <UserLogin loginUser={this.loginUser} />
        <UserSignUp register={this.registerUser} />
        {this.state.loggedIn &&
          <div>
            <Tickets ticketList={this.state.ticketList} username={this.state.username}/>
            <NewTicket addTicket={this.addTicket} baseURL={baseURL}/>
          </div>
        }
      </>
    )
  }
}


