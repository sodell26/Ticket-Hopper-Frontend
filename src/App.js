import React, { Component } from 'react';
import './App.css';
import Tickets from './components/Tickets';
import NewTicket from './components/NewTicket';
import UserLogin from './components/UserLogin';
import UserSignUp from './components/UserSignUp';
import EditTicket from './components/EditTicket';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

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
      editOpen: false, 
      loginShow: false,
      signupShow: false,
      landingShow:true,
      newShow:false
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
    editOpen: !this.state.editOpen,
    description: entry.description,
    notes: entry.notes,
    ticketToEdit: entry
  })
}

onClose = e => {
  this.setState({
    editOpen: false,
    newShow: false
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
        landingShow: false,
        loginShow: false,
        signupShow: false,
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
      this.setState({
        landingShow: false,
        loginShow: false,
        signupShow: false
      })
    }
  } catch(error) {
    console.log('register error: ', error)
  }
}

logOut = async (e) => {
  e.preventDefault()

  fetch(baseURL + '/api/v1/users/logout', {
    credentials: 'include'
  }).then(res => {
    if(res.status === 200) {
      return res.json()
    } else {
      return []
    }
  }).then(data => {
    this.setState({
      loggedIn:false,
      landingShow: true
    })
  })


}

showLogin = (entry) => {
  this.setState({
    loginShow: !this.state.loginShow,
    signupShow: false
  })
}

showSignUp = (entry) => {
  this.setState({
    loginShow: false,
    signupShow:!this.state.signupShow
  })
}

showNew = (entry) => {
  this.setState({
    newShow: true
  })
}



  render() {
    // console.log(this.state.userId)
    return (
      <>
        {this.state.landingShow &&
          <div className="row" style={{"marginTop": "3rem"}}>
          <div className="col-sm-4"></div>
          <div className="card col-sm-4" style={{"paddingTop": ".8rem"}}>
          <Tabs defaultActiveKey="login" id="uncontrolled-tab-example">
            <Tab eventKey="login" title="Login">
              <UserLogin loginUser={this.loginUser} />
            </Tab>
            <Tab eventKey="register" title="Register">
              <UserSignUp register={this.registerUser} />
            </Tab>
          </Tabs>
          </div>
          </div>



        }

        {this.state.loggedIn &&
          <div>
          <Button onClick={this.showNew}>Add New Ticket</Button>
          <Button onClick={this.logOut} variant="dark" style={{'marginLeft':'.5rem'}}>Log Out</Button>
            <Tickets ticketList={this.state.ticketList} username={this.state.username} baseURL={baseURL} userId={this.state.userId} currentTeam={this.state.currentTeam} showEditForm={this.showEditForm} deleteTicket={this.deleteTicket} editOpen={this.state.editOpen} handleEdit={this.handleSubmit} handleEditChange={this.handleChange} description={this.state.description} notes={this.state.notes}/>



            {this.state.newShow &&
             <NewTicket ticketList={this.state.ticketList} addTicket={this.addTicket} baseURL={baseURL} getTickets={this.getTickets} newShow={this.state.newShow} onClose={this.onClose} />
            }
             
                  <div>
                    <Modal show={this.state.editOpen} onHide={this.onClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Edit Ticket</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={this.handleSubmit}>
                      <Modal.Body>
                        
                        <label> Description: 
                              <input name="description" onChange={this.handleChange} value={this.state.description}/>
                            </label>

                        <label>Notes: 
                              <input name="notes" onChange={this.handleChange} value={this.state.notes}/>
                            </label>
                        
                      </Modal.Body>
                      <Modal.Footer>
                        <Button type='submit' onClick={this.onClose} variant='warning'>Edit</Button>
                      </Modal.Footer>
                    </form>
{/*                      <h4 className="modal-title">Edit Ticket</h4>

                      <form onSubmit={this.handleSubmit}>
                          <label> Description: 
                            <input name="description" onChange={this.handleChange} value={this.state.description}/>
                          </label>

                          <label>Notes: 
                            <input name="notes" onChange={this.handleChange} value={this.state.notes}/>
                          </label>

                          <Button type='submit' variant='warning'>Edit</Button>

                      </form>*/}
                      </Modal>
                    </div>



          </div>
        }
      </>
    )
  }
}


