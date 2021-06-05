import React, { Component } from 'react';
import './App.css';
import Tickets from './components/Tickets';
import NewTicket from './components/NewTicket';
import UserLogin from './components/UserLogin';
import UserSignUp from './components/UserSignUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'

let baseURL

if (process.env.NODE_ENV==='development'){
  baseURL = 'http://localhost:8000'
} else {
  baseURL = process.env.REACT_APP_BASEURL
}

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ticketList: [],
      loggedIn: false,
      username: '',
      userId: null,
      ticketToEdit: {},
      editOpen: false
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
  this.getTickets()
}

handleSubmit = async (e) => {
  e.preventDefault()

  const url = baseURL + '/api/v1/tickets/' +this.state.ticketToEdit.id

  const response = await fetch (url, {
    method: 'PUT',
    body: JSON.stringify({
      description: e.target.description.value,
      notes: e.target.notes.value
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
  if(response.status === 200) {
    const updatedTicket = await response.json()

    const findIndex = this.state.ticketList.findIndex(ticket => ticket.id === updatedTicket.data.id)

    const copyTickets = [...this.state.ticketList]
    copyTickets[findIndex] = updatedTicket.data

    this.setState({
      ticketList:copyTickets
    })
  }
}

deleteTicket = async (id) => {
  const url = baseURL + '/api/v1/tickets/' + id

  const response = await fetch(url, {method: 'DELETE'})

  const index = this.state.ticketList.findIndex(ticket => ticket.id === id)

  const copyTickets = [...this.state.ticketList]

  copyTickets.splice(index,1)

  this.setState({
    ticketList: copyTickets
  })
}

handleChange = (event) => {
  this.setState({
    [event.target.name]: event.target.value
  })
}

componentDidMount() {
  this.getTickets()
}

showEditForm = (entry) => {
  this.setState({
    editOpen: true,
    description: entry.description,
    notes: entry.notes,
    ticketToEdit: entry
  })
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
    }).then(response => {
      if(response.status === 200){
        return response.json()
      } else {
        return []
      }
    }).then(data=> {
      this.setState({
        loggedIn: true,
        username: e.target.username,
        userId: data.data.id
      })
    })
      this.getTickets()
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
    // console.log(this.state.userId)
    return (
      <>
        <UserLogin loginUser={this.loginUser} />
        <UserSignUp register={this.registerUser} />
        {this.state.loggedIn &&
          <div>
            <Tickets ticketList={this.state.ticketList} username={this.state.username} baseURL={baseURL} userId={this.state.userId} currentTeam={this.state.currentTeam} showEditForm={this.showEditForm} deleteTicket={this.deleteTicket}/>
            <NewTicket ticketList={this.state.ticketList} addTicket={this.addTicket} baseURL={baseURL} getTickets={this.getTickets}/>
          </div>
        }

        {this.state.editOpen &&
            <div>
              <form onSubmit={this.handleSubmit}>
                <label> Description: 
                  <input name="description" onChange={this.handleChange} value={this.state.description}/>
                </label>

                <label>Notes: 
                  <input name="notes" onChange={this.handleChange} value={this.state.notes}/>
                </label>

                <Button type='submit' variant='warning'>Edit</Button>

              </form>
            </div>
        }
      </>
    )
  }
}


