import React from 'react';
import Button from 'react-bootstrap/Button';


export default function UserSignUp(props) {

	return (

		<div className="register-form">
		    <form onSubmit={props.register}>
		        <h2 className="text-center">Register</h2>       
		        <div className="form-group">
		            <input type="text" className="form-control" id="username" name="username" placeholder="Username" required="required" autocomplete="off"/>
		        </div>
		        <div className="form-group">
		            <input type="email" className="form-control" id="email" name="email" placeholder="Email" required="required" autocomplete="off"/>
		        </div>
		        <div className="form-group">
		            <input type="password" className="form-control" id="password" name="password" placeholder="Password" required="required" autocomplete="off"/>
		        </div>
		        <div className="form-group">
		            <Button className="login-btn btn-block" type="submit" variant="success">Sign Up</Button>
		        </div>       
		    </form>
		</div>




	)
}