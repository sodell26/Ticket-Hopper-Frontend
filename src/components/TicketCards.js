import React from 'react';

export default class TicketCards extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<>
			{this.props.ticketList.map(oneTicket => {
					console.log(oneTicket.id)
					return(
						<div key={oneTicket.id}>
							<h2>Ticket Number: {oneTicket.id}</h2>

							<h3> Assigned to: Unassigned</h3>
							<h3>Submitted By: {oneTicket.submitted_by.username}</h3>
							<h4>Description: {oneTicket.description}</h4>
							<h4> Team: Unassigned </h4>

							<h6>Created: {oneTicket.created}</h6>
						</div>
					)
				})}
			
			</>
		)
	}
}