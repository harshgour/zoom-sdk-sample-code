import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../lib/AuthProvider/ProvideAuth";

const Login = () => {
	const [formData, setFormData] = useState({ email: "", password: "" });
	let history = useHistory();
	let location = useLocation();
	let auth = useAuth();

	const handleChange = (e) => {
		const target = e.target;
		const { name, value } = target;
		console.log(name, value);
		setFormData((prevFromData) => {
			return {
				...prevFromData,
				[name]: value,
			};
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let { from } = location.state;
		auth.signin(formData, () => {
			history.replace(from);
		});
	};
	return (
		<div>
			<div className='heading' style={{ paddingBottom: "10px" }}>
				<h1>Login</h1>
			</div>
			<div className='form-action'>
				<label htmlFor='email'>Email</label>
				<input
					type='text'
					name='email'
					value={formData.email}
					onChange={handleChange}
				/>
			</div>
			<div className='form-action'>
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					name='password'
					value={formData.password}
					onChange={handleChange}
				/>
			</div>
			<button type='submit' onClick={handleSubmit}>
				Submit
			</button>
		</div>
	);
};

export default Login;
