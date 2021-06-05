import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

export default function EditTicket(props) {
	return(
		<div>
	              <form onSubmit={props.handleEdit}>
	                <label> Description: 
	                  <input name="description" onChange={props.handleEditChange} value={props.description}/>
	                </label>

	                <label>Notes: 
	                  <input name="notes" onChange={props.handleEditChange} value={props.notes}/>
	                </label>

	                <Button type='submit' variant='warning'>Edit</Button>

	              </form>
        </div>
    )
}