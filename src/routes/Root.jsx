import {Outlet} from 'react-router-dom';
import TopNav from '../components/TopNav';

import './root.css';

export default function Root() {
	return (
		<div className="w-full bg-gray-900 min-h-screen opacity-100 text-white z-10" id='Root'>
			<TopNav />
			<Outlet />
		</div>
	);
};
