import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default class TicketList extends Component {
	constructor(props) {
		super(props)

		this.state={
			editOpen: false,
			teamListOpen: false,
			userList: [],
			teamList: []
		}
	}

// do a choseTeam() here to get the teams the user is one, then reference that id for the id in getUsers()

chooseTeam = (id) => {
	fetch(this.props.baseURL + '/<id>/myteams', {
		credentials: 'include'
	})
	.then(res => {
		if(res.status === 200) {
			return res.json()
		} else {
			return []
		}
	}).then(data => {
		this.setState({
			teamList: data.data
		})
	})
}

	getUsers = (id) => {
		fetch(this.props.baseURL + '/api/v1/teams/<id>/teammembers', {
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

	showTeamDropDown = (entry) => {
		this.setState({
			teamListOpen: true
		})
	}

	render() {
		return (
			<div>
				<h1>Active Tickets</h1>

				{this.props.ticketList.map(oneTicket => {
					console.log(oneTicket.id)
					return(
						<div key={oneTicket.id}>
							<h2>Ticket Number: {oneTicket.id}</h2>
							{oneTicket.assigned_to == null &&
								<h3> Assigned to: Unassigned</h3>
							}
							{oneTicket.assigned_to != null &&
								<h3>Assigned to: {oneTicket.assigned_to.username}</h3>
							}

							<Button className="team-btn" onClick={this.showTeamDropDown} variant='success'>Choose Team</Button>

							{this.state.teamListOpen &&
								<DropdownButton onClick={this.chooseTeam(this.props.username.id)} >
									{this.state.teamList.map(oneTeam => {
										<Dropdown.Item>{oneTeam.name}</Dropdown.Item>
									})}
								</DropdownButton>
							}

							<Button className="edit-btn" onClick={this.showUserDropDown} variant='success'>Assign to new user</Button>

							{this.state.editOpen &&
								<DropdownButton onClick={this.getUsers} >
									{this.state.userList.map(oneUser => {
										<Dropdown.Item>{oneUser.username}</Dropdown.Item>
									})}
								</DropdownButton>
							}

							<h3>Submitted By: {oneTicket.submitted_by.username}</h3>
							<h4>Description: {oneTicket.description}</h4>
							<h4>Notes: {oneTicket.notes}</h4>
							{oneTicket.team === null &&
								<h4> Team: Unassigned </h4>
							}
							{oneTicket.team != null &&
								<h4> Team: {oneTicket.team.name}</h4>
							}



							<h6>Created: {oneTicket.created}</h6>
						</div>
					)
				})}

			</div>
		)
	}	
}