import {useState} from 'react';
import {Link} from 'react-router-dom';
import './root.css';

export default function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleUsernameChange = ({target}) => {
		setUsername(target.value);
	};
	const handlePasswordChange = ({target}) => {
		setPassword(target.value);
	};

	return (
		<div
			className='flex flex-col justify-center items-center w-full bg-gray-900 min-h-screen opacity-100 text-white z-10 shadow-xl' id='login'
		>
			<div className='bg-gray-800 lg:w-1/3 md:w-2/3 w-11/12 p-10 rounded-lg shadow-xl'>
				<p className='text-xl font-light'>Login</p>
				<div className='mt-8' id='username-box'>
					<label className='text-sm block mb-2' htmlFor='username'>Username</label>
					<input
						className='block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						id='username'
						name='username'
						value={username}
						onChange={handleUsernameChange}
					/>
				</div>
				<div className='mt-3' id='password-box'>
					<label className='text-sm block mb-2' htmlFor='password'>Password</label>
					<input
						className='block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						id='password'
						name='password'
						value={password}
						onChange={handlePasswordChange}
						type='password'
					/>
				</div>
				<div className='flex gap-2'>
					<button className='mt-8 rounded-lg bg-sky-800 shadow-lg p-3'>
						Login
					</button>
					<button className='mt-8 rounded-lg bg-blue-800 shadow-lg p-3'>
						<Link to='/register'>Register</Link>
					</button>
				</div>
			</div>
		</div>
	);
};
