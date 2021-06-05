import React, {Component} from 'react';
import TicketCards from './TicketCards';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


export default class TicketList extends Component {
	constructor(props) {
		super(props)

		this.state={
			editOpen: false,
			teamListOpen: false,
			ticketList: [],
			userList: [],
			teamList: [],
			teamID: null,
			teamName: '',
			ticketToEdit: {},
			index: null
		}
	}

// getTickets = () => {
//   fetch(this.props.baseURL + '/api/v1/tickets/', {
//     credentials: 'include'
//   }).then(res => {
//     if(res.status === 200 || res.status === 201) {
//       return res.json()
//     } else {
//       return []
//     }
//   }).then(data => {
//     this.setState({
//       ticketList: data.data
//     })
//   })
// }

chooseTeam = () => {
	fetch(this.props.baseURL + '/api/v1/users/' + this.props.userId + '/myteams', {
		credentials: 'include'
	})
	.then(res => {
		if(res.status === 200 || res.status === 201) {
			return res.json()
		} else {
			return []
		}
	}).then(data => {
		// console.log(data)
		this.setState({
			teamList: data.data,
			teamID: this.state.teamList.id
		})
	})
}

	getUsers = () => {
		fetch(this.props.baseURL + '/api/v1/teams/' + this.props.teamId +'/teammembers', {
			credentials: 'include'
		})
		.then(res => {
			if(res.status === 200 || res.status === 201) {
				return res.json()
			} else { 
				return []
			}
		}).then(data=> {
			this.setState({
				userList: data.data
			})
		})
	}

	showUserDropDown = (entry) => {
		this.setState({
			editOpen: true
		})
	}



handleSubmit = async (e) => {
	e.preventDefault()

	const url = this.props.baseURL + '/api/v1/tickets/' + this.state.ticketToEdit.id

	const response = await fetch(url, {
			method: 'PUT',
			body: JSON.stringify({
				teamName: e.target.teamName.value
			}),
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		})
		if (response.status === 200) {
			const updateTicket = await response.json()

			const findIndex = this.state.ticketList.findIndex(ticket => ticket.id === updateTicket.data.id)

			const copyTickets = [...this.state.ticketList]
			copyTickets[findIndex] = updateTicket.data

			this.setState({
				ticketList: copyTickets,
				teamListOpen: false
			})
		}
}



handleSelect=(e)=> {
	console.log(e)
	this.setState({
		teamName: e
	})
}

	showTeamDropDown = (index) => {
		console.log(this.state.ticketToEdit)

		this.setState({
			teamListOpen: !this.state.teamListOpen,
			index: index
		})
	}

	componentDidMount() {
		// this.getUsers()
		this.chooseTeam()
		// this.getTickets()
	}

	showTeamInfo = (index) => {
		this.showTeamDropDown(index);
		this.chooseTeam()
	}

	// showUserInfo = (e) => {
	// 	this.showUserDropDown();
	// 	this.getUsers()
	// }


	render() {
		return (
			<>
			<div>
				<h1>Active Tickets</h1>
				<TicketCards ticketList={this.props.ticketList} showEditForm={this.props.showEditForm}/>
			{/*{this.state.ticketList.map((oneTicket,index)*/}
{/*				{this.state.ticketList.map((oneTicket) => {
					console.log(oneTicket.id)
					return(
						<div key={oneTicket.id}>
							<h2>Ticket Number: {oneTicket.id}</h2>
							{/*{oneTicket.assigned_to == null &&
								<h3> Assigned to: Unassigned</h3>
							}
							{oneTicket.assigned_to != null &&
								<h3>Assigned to: {oneTicket.assigned_to.username}</h3>
							}*/}

							{/*<h3> Assigned to: Unassigned</h3>*/}

							{/*<Button className="member-btn" onClick={this.showUserInfo} variant='success'>Choose Member</Button>

							{this.state.editOpen &&
								<DropdownButton title="Members">
									{this.state.userList.map(oneUser => {
										console.log(oneUser)
										return (
											<div>
												<Dropdown.Item>{oneUser.username}</Dropdown.Item>
											</div>
										)
									})}
								</DropdownButton>
							}*/}
							

							{/*<h3>Submitted By: {oneTicket.submitted_by.username}</h3>
							<h4>Description: {oneTicket.description}</h4>
							<h4>Notes: {oneTicket.notes}</h4>*/}
							{/*{oneTicket.team === null &&
								<h4> Team: Unassigned </h4>
							}
							{oneTicket.team != null &&
								<h4> Team: {oneTicket.team.name}</h4>
							}*/}
{/*
							<h4> Team: Unassigned </h4>

							<h6>Created: {oneTicket.created}</h6>*/}

						{/*<div>
							<Button className="team-btn" onClick={() => this.showTeamInfo(index)} variant='success'>Choose Team</Button>
										{(this.state.teamListOpen && index ===this.state.index) &&
											
												<DropdownButton title={this.state.teamName} id="teamName" name="teamName">
													{this.state.teamList.map(oneTeam => {
													 
														return (
															
																<Dropdown.Item eventKey={oneTeam.name} name="teamName" onSelect={this.handleSelect}>{oneTeam.name}</Dropdown.Item>
														)
													})}
												</DropdownButton>

										}
						</div>*/}
						{/*</div>*/}
					{/*)*/}


				{/*})}*/}

			</div>
			</>
		)
	}	
}