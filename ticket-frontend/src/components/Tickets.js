import React from 'react';

export default function TicketList(props) {

	return (
		<div>
			<h1>Active Tickets</h1>

			{props.ticketList.map(oneTicket => {
				console.log(oneTicket.id)
				return(
					<div key={oneTicket.id}>
						<h2>Ticket Number: {oneTicket.id}</h2>
						<h3>Submitted By: {oneTicket.submitted_by.username}</h3>
						<h4>Description: {oneTicket.description}</h4>
						<h4>Notes: {oneTicket.notes}</h4>
						<h6>Created: {oneTicket.created}</h6>
					</div>
				)
			})}

		</div>
	)	
}