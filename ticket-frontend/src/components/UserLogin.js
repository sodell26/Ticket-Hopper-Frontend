import React from 'react';
import Button from 'react-bootstrap/Button'


export default function UserLogin(props){

	return(
		<div>
			<h3> User Login </h3>
			<form onSubmit={props.loginUser}>

				<label htmlFor="username">Username: 
					<input type="text" id="username" name="username"/>
				</label>

				<label htmlFor="password">Password: 
					<input type="text" id="password" name="password"/>
				</label>

				<input type="submit" value="Login"/>
			</form>
		</div>
	)
}