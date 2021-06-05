import React from 'react';
import Button from 'react-bootstrap/Button';


export default function UserSignUp(props) {

	return (
		<div>
			<h3> User Sign Up </h3>
			<form onSubmit={props.register}>
				<label htmlFor="username">Username: 
					<input type="text" id="username" name="username"/>
				</label>

				<label htmlFor="email">Email: 
					<input type="text" id="email" name="email"/>
				</label>

				<label htmlFor="password">Password: 
					<input type="text" id="password" name="password"/>
				</label>

				<Button className="signup-btn" variant="primary" type="submit">Create Account</Button>
			</form>
		</div>
	)
}