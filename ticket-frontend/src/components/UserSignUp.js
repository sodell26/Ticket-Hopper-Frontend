import React from 'react';

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

				<input type="submit" value="Create Account" />
			</form>
		</div>
	)
}