import React, { Component } from 'react';
import Tickets from './components/Tickets'
import './App.css';

const baseURL = 'https://localhost:8000'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ticketList: []
    }
  }


//fetch tickets
getTickets = () => {
  fetch(baseURL + '/api/v1/tickets', {
    credentials: 'include'
  })
  .then(res => {
    if(res.status == 200 || res.status == 201) {
      return res.json()
    }
  }).then(data => {
    this.setState({
      ticketList: data
    })
  })
}







componentDidMount() {
  this.getTickets()
}

  render() {
    return (
      <div>
        <Tickets ticketList={this.state.ticketList}/>
      </div>
    )
  }
}


