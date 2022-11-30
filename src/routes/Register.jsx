import {useState} from 'react';
import './root.css';

export default function Register() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [secondPassword, setSecondPassword] = useState('');
	const [secondPasswordConfirm, setSecondPasswordConfirm] = useState('');

	const handleUsernameChange = ({target}) => {
		setUsername(target.value);
	};
	const handleEmailChange = ({target}) => {
		setEmail(target.value);
	};
	const handlePasswordChange = ({target}) => {
		setPassword(target.value);
	};
	const handlePasswordConfirmChange = ({target}) => {
		setPasswordConfirm(target.value);
	};
	const handleSecondPasswordChange = ({target}) => {
		setSecondPassword(target.value);
	};
	const handleSecondPasswordConfirmChange = ({target}) => {
		setSecondPasswordConfirm(target.value);
	};

	const PasswordRules = () => {
		const has8Characters = password.length >= 8 ? 'text-green-500' : 'text-red-500';
		const hasSpecialCharacter = password.match(/\W/) ? 'text-green-500' : 'text-red-500';
		const containsUsername = password.match(new RegExp(`${username}`, 'g')) ? 'text-red-500' : 'text-green-500';

		return (
			<ol className='mt-2 ml-6 list-disc'>
				<li className={has8Characters}>It must be at least 8 characters</li>
				<li className={hasSpecialCharacter}>It must contain at least one special character</li>
				<li className={containsUsername}>It can't contain your username</li>
			</ol>
		);
	};

	const SecondPasswordRules = () => {
		const has8Characters = secondPassword.length >= 8 ? 'text-green-500' : 'text-red-500';
		const hasSpecialCharacter = secondPassword.match(/\W/) ? 'text-green-500' : 'text-red-500';
		const containsUsername = secondPassword.match(new RegExp(`${username}`, 'g')) ? 'text-red-500' : 'text-green-500';

		return (
			<ol className='mt-2 ml-6 list-disc'>
				<li className={has8Characters}>It must be at least 8 characters</li>
				<li className={hasSpecialCharacter}>It must contain at least one special character</li>
				<li className={containsUsername}>It can't contain your username</li>
			</ol>
		);
	};

	return (
		<div
			className='flex flex-col justify-center items-center w-full bg-gray-900 min-h-screen opacity-100 text-white z-10 shadow-xl' id='login'
		>
			<div className='bg-gray-800 lg:w-1/3 md:w-2/3 w-11/12 p-10 rounded-lg shadow-xl divide-y-2'>
				<div className='pb-8'>
					<p className='text-xl font-light'>Register</p>
					<div className='mt-8' id='username-box'>
						<label className='text-sm block mb-2' htmlFor='username'>Username</label>
						<input
							className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							id='username'
							name='username'
							value={username}
							onChange={handleUsernameChange}
						/>
					</div>
					<div className='mt-3' id='email-box'>
						<label className='text-sm block mb-2' htmlFor='email'>E-mail</label>
						<input
							className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							id='email'
							name='email'
							value={email}
							onChange={handleEmailChange}
						/>
					</div>
				</div>
				<div className='py-8'>
					<div id='password-box'>
						<label className='text-sm block mb-2' htmlFor='password'>Password</label>
						<input
							className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							id='password'
							name='password'
							value={password}
							onChange={handlePasswordChange}
							type='password'
						/>
						<div className='mt-1 p-1 text-xs'>
							<p className='text-gray-200 font-medium'>The password must meet the following requirements:</p>
							<PasswordRules />
						</div>
					</div>
					<div className='mt-3' id='passwordConfirm-box'>
						<label className='text-sm block mb-2' htmlFor='passwordConfirm'>Re-Type Password</label>
						<input
							className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							id='passwordConfirm'
							name='passwordConfirm'
							value={passwordConfirm}
							onChange={handlePasswordConfirmChange}
							type='password'
						/>
					</div>
				</div>
				<div className='py-8'>
					<div id='secondPassword-box'>
						<label className='text-sm block mb-2' htmlFor='secondPassword'>Second Password</label>
						<input
							className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							id='secondPassword'
							name='secondPassword'
							value={secondPassword}
							onChange={handleSecondPasswordChange}
							type='password'
						/>
						<div className='mt-1 p-1 text-xs'>
							<p className='text-gray-200 font-medium'>The password must meet the following requirements:</p>
							<SecondPasswordRules />
						</div>
					</div>
					<div className='mt-3' id='secondPasswordConfirm-box'>
						<label className='text-sm block mb-2' htmlFor='secondPasswordConfirm'>Re-Type Second Password</label>
						<input
							className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							id='secondPasswordConfirm'
							name='secondPasswordConfirm'
							value={secondPasswordConfirm}
							onChange={handleSecondPasswordConfirmChange}
							type='password'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
