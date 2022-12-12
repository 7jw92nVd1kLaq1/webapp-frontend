import {useState, useEffect} from 'react';
import './root.css';

export default function Register() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [secondPassword, setSecondPassword] = useState('');
	const [secondPasswordConfirm, setSecondPasswordConfirm] = useState('');
	const [csrfToken, setCsrfToken] = useState('');

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

	function getCookie(name) {
		let cookie = {};
		document.cookie.split(';').forEach(function (el) {
			let [k, v] = el.split('=');
			cookie[k.trim()] = v;
		})
		return cookie[name];
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const real_work = async () => {
			const formData = new FormData(e.currentTarget);
			const formDataObject = Object.fromEntries(formData.entries());
			const formDataJsonString = JSON.stringify(formDataObject);

			const fetchOptions = {
				method: 'POST',
				headers: {
					'X-CSRFToken': csrfToken,
					"Content-Type": "application/json",
				},
				body: formDataJsonString,
				credentials: 'include'
			};

			const response = await fetch('http://127.0.0.1:8000/api/test_csrf/', fetchOptions);
			const json = await response.json();

			document.getElementById('checking').textContent = json.status;
		};
		real_work();
	};


	const runf = async () => {
		try {
			const apiHost = 'http://127.0.0.1:8000';
			const resp = await fetch(
				`${apiHost}/api/csrf/`,
				{method: 'GET', credentials: 'include'}
			);

			const data = await resp.json();
			setCsrfToken(data.csrfToken);

			document.getElementById("checking").textContent = `Cookie: ${document.cookie}`;
		} catch (err) {
			document.getElementById("checking").textContent = err.message;
		}
	};

	useEffect(() => {
		runf();
	}, []);

	const PasswordRules = () => {
		const has8Characters = password.length >= 8 ? 'text-green-500' : 'text-red-500';
		const hasSpecialCharacter = password.match(/\W/) ? 'text-green-500' : 'text-red-500';
		const containsUsername = password.match(new RegExp(`${username}`, 'g')) ? 'text-red-500' : 'text-green-500';

		return (
			<ol className='mt-2 ml-6 list-disc'>
				<li className={has8Characters}>It must be at least 8 characters</li>
				<li className={hasSpecialCharacter}>It must contain at least one special character</li>
				<li className={containsUsername}>It must <span className='font-semibold'>NOT</span> contain your username</li>
			</ol>
		);
	};

	const SecondPasswordRules = () => {
		const has8Characters = secondPassword.length >= 8 ? 'text-green-500' : 'text-red-500';
		const hasSpecialCharacter = secondPassword.match(/\W/) ? 'text-green-500' : 'text-red-500';
		const containsUsername = secondPassword.match(new RegExp(`${username}`, 'g')) || secondPassword.match(new RegExp(`${password}`, 'g')) ? 'text-red-500' : 'text-green-500';

		return (
			<ol className='mt-2 ml-6 list-disc'>
				<li className={has8Characters}>It must be at least 8 characters</li>
				<li className={hasSpecialCharacter}>It must contain at least one special character</li>
				<li className={containsUsername}>It must <span className='font-semibold'>NOT</span> contain your username or password</li>
			</ol>
		);
	};

	return (
		<div
			className='flex flex-col justify-center items-center w-full bg-gray-900 min-h-screen opacity-100 text-white z-10 shadow-xl' id='login'
		>
			<form onSubmit={handleSubmit} id='registerForm' method='post' action='http://127.0.0.1:8000/api/test_csrf/'>
				<div className='bg-gray-800 mx-auto my-4 lg:w-1/3 md:w-2/3 w-11/12 p-10 rounded-lg shadow-xl divide-y-2'>
					<div className='pb-8'>
						<p className='text-xl font-light'>Register</p>
						<p className='text-xl font-light w-96 overflow-hidden' id='checking'></p>
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
						<div className='mt-3' id='email-box'>
							<label className='text-sm block mb-2' htmlFor='email'>E-mail</label>
							<input
								className='block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
								className='block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
								className='block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
								className='block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
								className='block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
								id='secondPasswordConfirm'
								name='secondPasswordConfirm'
								value={secondPasswordConfirm}
								onChange={handleSecondPasswordConfirmChange}
								type='password'
							/>
						</div>
					</div>
					<div className='py-8'>
						<button className='bg-blue-500 shadow-lg rounded-lg p-2'>Submit</button>
					</div>
				</div>
			</form>
		</div>
	);
};
