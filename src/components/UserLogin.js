import React from 'react';
import Button from 'react-bootstrap/Button'


export default function UserLogin(props){

	return(



		<div className="login-form">
		    <form onSubmit={props.loginUser}>
		        <h2 className="text-center">Log in</h2>       
		        <div className="form-group">
		            <input type="text" className="form-control" id="username" name="username" placeholder="Username" required="required" autocomplete="off"/>
		        </div>
		        <div className="form-group">
		            <input type="password" className="form-control" id="password" name="password" placeholder="Password" required="required" autocomplete="off"/>
		        </div>
		        <div className="form-group">
		            <Button className="login-btn btn-block" type="submit" variant="success">Log In</Button>
		        </div>       
		    </form>
		</div>








	)
}