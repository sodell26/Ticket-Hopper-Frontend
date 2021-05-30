import React from 'react';

export default function TicketList(props) {

	return (
		<div>
			<h2>Active Tickets</h2>

			{props.ticketList.map(oneTicket => {
				console.log(oneTicket.id)
				return(
					<div key={oneTicket.id}>
						<h4>{oneTicket.description}</h4>
					</div>
				)
			})}

		</div>
	)	
}