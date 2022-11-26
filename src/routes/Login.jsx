import { useState } from 'react';
import './root.css';

export default function Login() {
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');

	const handleUsernameChange = ({ target }) => {
		setUsername(target.value);
	};

	return (
		<div className="flex flex-col justify-center items-center w-full bg-gray-900 min-h-screen opacity-100 text-white z-10" id="login">
			<div className='bg-gray-800 w-11/12 p-10 rounded-lg shadow-xl'>
				<p className='text-xl font-light'>Login</p>
				<div className='mt-8'>
					<label className='text-sm block mb-2' htmlFor='username'>Username</label>
					<input className='border border-white rounded-lg p-3 text-black bg-white' id='username' name='username' value={username} onChange={handleUsernameChange} />
				</div>
				<div className='mt-3'>
					<label className='text-sm block mb-2' htmlFor='username'>Password</label>
					<input className='border border-white rounded-lg p-3 text-black bg-white' id='username' name='username' value={password} onChange={handleUsernameChange} />
				</div>
			</div>	
		</div>
	);
};
