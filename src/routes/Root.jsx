import TopNav from '../components/TopNav';
import pic1 from '../assets/root1.jpg';
import pic2 from '../assets/root2.jpg';
import pic3 from '../assets/root3.jpg';
import amazon from '../assets/amazon.png';
import ebay from '../assets/ebay.png';
import shopify from '../assets/shopify.png';

import btc from '../assets/bitcoin.svg';
import bch from '../assets/bch.png';
import xmr from '../assets/xmr.png';
import eth from '../assets/eth.svg';
import doge from '../assets/doge.svg';
import ltc from '../assets/ltc.svg';

import './root.css';

function RootImg(props) {
	return (
		<img	
			src={props.image}
			className="mt-3 p-6 w-full h-auto opacity-1"
			style={{
				animationName: 'appearImage',
				animationDuration: '2s',
				animationTimingFunction: 'ease-in-out'
			}}
		/>
	);
}



export default function Root() {
	const para1Style = {
		animationName: 'slideup1',
		animationDuration: '2s'
	};

	return (
		<div className="w-full bg-gray-900 min-h-screen opacity-100" id='Root'>
			<TopNav />
			<div className='p-3'>
				<p className='sefont-semibold text-lg'>Webpage</p>
			</div>
			<div 
				id='root-paras-1'
				className='relative'
				style={para1Style}
			>
				<p className='mt-8 p-3 font-bold text-white text-3xl text-center'>Buy Items With Crypto</p>
				<p className='mt-2 p-3 text-center text-gray-200 font-light'>Purchase various items from major retailers with your Crypto!</p>
			</div>
			<RootImg image={pic1} />
			<div 
				id='root-paras-2'
				className='relative'
				style={para1Style}
			>
				<p className='mt-6 p-3 font-bold text-white text-2xl text-center'>A Wide Range of Items</p>
				<p className='mt-2 p-3 text-center leading-relaxed font-light'>You are merely a few clicks away from placing an order for items you like from the following retailers!</p>
			</div>
			<div className='p-10'>
				<div 
					className='flex flex-col p-10 gap-3 bg-current rounded-lg'
					style={{
						animationName: 'appearImage',
						animationDuration: '2s',
						animationTimingFunction: 'ease-in-out'
					}}
				>
					<RootImg image={amazon} />
					<RootImg image={ebay} />
					<RootImg image={shopify} />
				</div>
			</div>
			<div 
				id='root-paras-3'
				className='relative'
				style={para1Style}
			>
				<p className='mt-6 p-3 font-bold text-white text-2xl text-center'>Choices of Payment Method</p>
				<p className='mt-2 p-3 text-center leading-relaxed font-light'>We support Bitcoin, Bitcoin Cash, Monero, Ethereum, Dogecoin and Litecoin!</p>
			</div>
			<div className='p-10'>
				<div 
					className='flex flex-col p-10 gap-3 bg-current rounded-lg'
					style={{
						animationName: 'appearImage',
						animationDuration: '2s',
						animationTimingFunction: 'ease-in-out'
					}}
				>
					<div	className='flex gap-2'
		>
						<RootImg image={btc} />
						<RootImg image={bch} />
					</div>
					<div	className='flex gap-2 items-center'
		>
						<RootImg image={xmr} />
						<RootImg image={eth} />
					</div>
					<div	className='flex gap-2'
		>
						<RootImg image={doge} />
						<RootImg image={ltc} />
					</div>
				</div>
			</div>
			<div 
				id='root-paras-4'
				className='relative'
				style={para1Style}
			>
				<p className='mt-6 p-3 font-bold text-white text-2xl text-center'>No Registration Required</p>
				<p className='mt-2 p-3 text-center leading-relaxed font-light'>Save the hassle of having to register, and dive right in for shopping!</p>
			</div>
			<RootImg image={pic2} />
			<div 
				id='root-paras-5'
				className='relative'
				style={para1Style}
			>
				<p className='mt-6 p-3 font-bold text-white text-2xl text-center'>Earn Crypto</p>
				<p className='mt-2 p-3 text-center leading-relaxed font-light'>Become our member, fulfill orders for others and earn your choice of Crypto!</p>
			</div>
			<RootImg image={pic3} />
		</div>
	);
};
