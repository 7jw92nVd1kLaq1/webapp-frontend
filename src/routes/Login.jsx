import { useState } from 'react';
import './root.css';

export default function Login() {
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');

	const handleUsernameChange = ({ target }) => {
		setUsername(target.value);
	};
	const handlePasswordChange = ({ target }) => {
		setPassword(target.value);
	};

	return (
		<div className="flex flex-col justify-center items-center w-full bg-gray-900 min-h-screen opacity-100 text-white z-10" id="login">
			<div className='bg-gray-800 w-11/12 p-10 rounded-lg shadow-xl'>
				<p className='text-xl font-light'>Login</p>
				<div className='mt-8' id='username-box'>
					<label className='text-sm block mb-2' htmlFor='username'>Username</label>
					<input className='bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='username' name='username' value={username} onChange={handleUsernameChange} />
				</div>
				<div className='mt-3' id='password-box'>
					<label className='text-sm block mb-2' htmlFor='password'>Password</label>
					<input className='bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='password' name='password' value={password} onChange={handlePasswordChange} type='password' />
				</div>
			</div>	
		</div>
	);
};
