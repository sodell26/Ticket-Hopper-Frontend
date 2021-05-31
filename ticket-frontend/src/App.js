import React, { Component } from 'react';
import './App.css';
import Tickets from './components/Tickets';
import NewTicket from './components/NewTicket'

const baseURL = 'http://localhost:8000'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ticketList: []
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

  render() {
    return (
      <>
        <Tickets ticketList={this.state.ticketList}/>
        <NewTicket addTicket={this.addTicket} baseURL={baseURL}/>
      </>
    )
  }
}


