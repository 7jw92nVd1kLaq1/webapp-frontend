import { useState } from 'react';

const sleep1 = ms => new Promise(
	resolve => setTimeout(resolve, ms)
);

export default function TopNav () {
	const [ isMenuClicked, setIsMenuClicked ] = useState(false);
	const handleClick = () => {
		const asyncHandle = async () => {
			setIsMenuClicked(prev => prev ? false : true);
			const menu = document.getElementById("menu-icon");
			const submenu = document.getElementById("sub-menu");
			if (isMenuClicked) {
				menu.style.transform = 'rotate(90deg)';
				submenu.style.visibility = 'visible';
				submenu.style.opacity = 1;
			}
			else {
				menu.style.transform = 'rotate(0deg)';

				submenu.style.opacity = 0;
				await sleep1(500);
				submenu.style.visibility = 'hidden';
			}
		};

		asyncHandle();
	};

	const menuStyle = {
		transitionProperty: "transform",
		transitionDuration: "500ms"
	};

	return (
		<div className='fixed z-50'>
			<div 
				id='sub-menu'
				className='bg-gray-700 fixed w-screen z-40 invisible'
				style={{
					transitionProperty: "opacity",
					transitionDuration: "500ms"
				}}
			>	
				<div className='p-3'>
					<svg className='stroke-1 stroke-white fill-white' xmlns="http://www.w3.org/2000/svg" height="32" width="32"><path d="M6 36v-3h36v3Zm0-10.5v-3h36v3ZM6 15v-3h36v3Z"/></svg>
					<div className='p-10 flex flex-col gap-4'>
						<p className='font-light'>
	Buy
</p>
						<p className='font-light'>
	Sell
</p>
						<p className='font-light'>
	Login
</p>
						<p className='font-light'>
	Register
</p>
						<p className='font-light'>
	Help
</p>
					</div>
				</div>
			</div>
			<div className="w-full bg-gray-800 fixed top-0 text-white shadow-lg p-3 z-50 flex justify-between items-center">
				<p className="font-semibold text-lg">BitShop</p>
				<div 
					id="menu-icon"
					onClick={handleClick}
					style={menuStyle}
				>
					<svg className='stroke-1 stroke-white fill-white' xmlns="http://www.w3.org/2000/svg" height="32" width="32"><path d="M6 36v-3h36v3Zm0-10.5v-3h36v3ZM6 15v-3h36v3Z"/></svg>
				</div>		
			</div>
		</div>
	);
}
