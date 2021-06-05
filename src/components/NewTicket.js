import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



export default class NewTicket extends Component {
	constructor(props) {
		super (props)

		this.state = {
			description: '',
			notes: '',
			open_ticket: true
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}


	handleSubmit = (event) => {
		event.preventDefault()

		fetch(this.props.baseURL + '/api/v1/tickets/', {
			method: 'POST',
			body: JSON.stringify({
				description: this.state.description,
				notes: this.state.notes,
				open_ticket: this.state.open_ticket
			}),
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		}).then(res => {
			return res.json()
		}).then(data => {
			this.props.addTicket(data.data)
			this.props.onClose()
			this.setState({
				description: '',
				notes: '',
				open_ticket: true
			})
		}).catch(error=> console.log({'Error': error}))
	}


	render() {
		return(
			<>
			<div className="newModal">
				
                    <Modal show={this.props.newShow} onHide={this.props.onClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>New Ticket</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={(event) => this.handleSubmit(event)}>
                      <Modal.Body>
                        
                        <label htmlFor='description'> Description: 
                              <input type='text' id='description' name='description' onChange={this.handleChange} value={this.state.description}/>
                            </label>

                        <label htmlFor='notes'>Notes: 
                              <input type='text' id='notes' name='notes' onChange={this.handleChange} value={this.state.notes}/>
                            </label>
                        
                      </Modal.Body>
                      <Modal.Footer>
                        <Button type='submit' variant='warning'>Add</Button>
                      </Modal.Footer>
                    </form>
               		</Modal>

                </div>

{/*				<form onSubmit={(event) => this.handleSubmit(event)}>
					<label htmlFor='description'> Description: 
						<input type='text' id='description' name='description' onChange={this.handleChange} value={this.state.description}/>
					</label>

					<label htmlFor='notes'> Notes: 
						<input type='text' id='notes' name='notes' onChange={this.handleChange} value={this.state.notes}/>
					</label>
					{this.state.open_ticket 
						?
						
						<label htmlFor='open_ticket'> Ticket is open
							<input type='checkbox' id='open_ticket' name='open_ticket' checked onChange={this.handleChange}/>
						</label>
						

						:
						
						<label htmlFor='open_ticket'> Ticket is open
							<input type='checkbox' id='open_ticket' name='open_ticket' onChange={this.handleChange}/>
						</label>
						
					}

					<input type='submit' value='Submit New Ticket'/>
				</form>*/}
			</>
		)
	}

}





































