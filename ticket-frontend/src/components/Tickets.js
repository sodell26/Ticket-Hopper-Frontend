import React from 'react';
import Button from 'react-bootstrap/Button'


export default function TicketList(props) {

	return (
		<div>
			<h1>Active Tickets</h1>

			{props.ticketList.map(oneTicket => {
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