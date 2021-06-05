import React from 'react';
import EditTicket from './EditTicket';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

export default class TicketCards extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<>
			<div className="row">
			{this.props.ticketList.map(oneTicket => {
					console.log(oneTicket.id)
					return(
						<div className="col-sm-6">
							<div className="card">
								<div key={oneTicket.id}>
									<h2 className="card-header bg-success text-white">Ticket Number: {oneTicket.id}</h2>
									<div className="card-body bg-light">
										<h3> Assigned to: Unassigned</h3>
										<h3>Submitted By: {oneTicket.submitted_by.username}</h3>
										<h4>Description: {oneTicket.description}</h4>
										<h4> Team: Unassigned </h4>

										<h6>Created: {oneTicket.created}</h6>
									</div>
									<div className="card-footer bg-secondary">
										<Button variant='info' style={{'margin-right':".25rem"}} onClick={()=> this.props.showEditForm(oneTicket)}>Edit</Button>
										<Button variant='danger' onClick={()=> this.props.deleteTicket(oneTicket.id)}>Delete</Button>
									</div>
									
								</div>
							</div>
						</div>
					)
				})}
				</div>
			</>
		)
	}
}