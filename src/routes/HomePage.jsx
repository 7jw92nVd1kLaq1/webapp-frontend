import pic1 from '../assets/root1.jpg';
import amazon from '../assets/amazon.png';
import ebay from '../assets/ebay.png';
import shopify from '../assets/shopify.png';
import noAcct from '../assets/2x/outline_no_accounts_white_48dp.png';
import handShake from '../assets/2x/outline_handshake_white_48dp.png';

import btc from '../assets/bitcoin.svg';
import bch from '../assets/bch.png';
import xmr from '../assets/xmr.png';
import eth from '../assets/eth.svg';
import doge from '../assets/doge.svg';
import ltc from '../assets/ltc.svg';

function RootImg(props) {
	const classList = "mt-3 p-6 md:w-1/2 md:mx-auto w-full h-auto opacity-1";
	return (
		<img	
			src={props.image}
			className={classList}
			style={{
				animationName: 'appearImage',
				animationDuration: '2s',
				animationTimingFunction: 'ease-in-out'
			}}
		/>
	);
}

function RootCorpIcon(props) {
	const classList = "mt-3 p-6 md:w-1/3 w-3/4 h-auto opacity-1";
	return (
		<img	
			src={props.image}
			className={classList}
			style={{
				animationName: 'appearImage',
				animationDuration: '2s',
				animationTimingFunction: 'ease-in-out'
			}}
		/>
	);
}

function RootCoinIcon(props) {
	const classList = "mt-3 p-6 lg:w-1/3 w-1/2 h-auto opacity-1";
	return (
		<img	
			src={props.image}
			className={classList}
			style={{
				animationName: 'appearImage',
				animationDuration: '2s',
				animationTimingFunction: 'ease-in-out'
			}}
		/>
	);
}



export default function HomePage() {
	const para1Style = {
		animationName: 'slideup1',
		animationDuration: '2s'
	};

	return (
		<div>
			<div className='p-3'>
				<p className='sefont-semibold text-lg'>BitShop</p>
			</div>
			<div 
				id='root-paras-1'
				className='relative'
				style={para1Style}
			>
				<p className='mt-10 p-3 font-bold text-white text-3xl text-center'>Buy Items With Crypto</p>
				<p className='mt-2 p-6 text-center font-light'>Purchase various items from major retailers with your Crypto!</p>
			</div>
			<RootImg image={pic1} notIcon={true} />
			<div className='mt-8 p-10'>
				<div 
					className='flex md:w-3/4 md:mx-auto lg:w-1/2 md:justify-center items-center md:flex-row flex-col p-10 gap-3 bg-current rounded-lg'
					style={{
						animationName: 'appearImage',
						animationDuration: '2s',
						animationTimingFunction: 'ease-in-out'
					}}
				>
					<RootCorpIcon image={amazon} />
					<RootCorpIcon image={ebay} />
					<RootCorpIcon image={shopify} />
				</div>
			</div>
			<div 
				id='root-paras-2'
				className='relative'
				style={para1Style}
			>
				<p className='mt-6 p-3 font-bold text-white text-2xl text-center'>A Wide Range of Items</p>
				<p className='mt-2 p-6 text-center leading-relaxed font-light'>You are merely a few clicks away from placing an order for items you like from the following retailers!</p>
			</div>
			<div className='mt-8 p-10'>
				<div 
					className='flex mx-auto lg:w-1/2 flex-col p-10 gap-3 bg-current rounded-lg justify-center'
					style={{
						animationName: 'appearImage',
						animationDuration: '2s',
						animationTimingFunction: 'ease-in-out'
					}}
				>
					<div 
						className='flex gap-2 md:justify-center'
					>
						<RootCoinIcon image={btc} />
						<RootCoinIcon image={bch} />
					</div>
					<div 
						className='flex gap-2 items-center md:justify-center'
					>
						<RootCoinIcon image={xmr} />
						<RootCoinIcon image={eth} />
					</div>
					<div 
						className='flex gap-2 md:justify-center'
					>
						<RootCoinIcon image={doge} />
						<RootCoinIcon image={ltc} />
					</div>
				</div>
			</div>
			<div 
				id='root-paras-3'
				className='relative'
				style={para1Style}
			>
				<p className='mt-4 p-3 font-bold text-white text-2xl text-center'>Choices of Payment Method</p>
				<p className='mt-2 p-6 text-center leading-relaxed font-light'>We support <span className='font-normal'>Bitcoin, Bitcoin Cash, Monero, Ethereum, Dogecoin and Litecoin!</span></p>
			</div>
			<img 
				src={noAcct}
				className='mt-10 py-6 px-3 lg:w-1/12 md:w-1/6 w-1/4 h-auto mx-auto'
				style={{
					animationName: 'appearImage',
					animationDuration: '2s',
					animationTimingFunction: 'ease-in-out'
				}}
			/>
			<div 
				id='root-paras-4'
				className='relative'
				style={para1Style}
			>
				<p className='mt-6 p-3 font-bold text-white text-2xl text-center'>No Registration Required</p>
				<p className='mt-2 p-6 text-center leading-relaxed font-light'>Save the hassle of having to register, and dive right in for shopping!</p>
			</div>
			<img 
				src={handShake}
				className='mt-10 py-6 px-3 lg:w-1/12 md:w-1/6 w-1/4 h-auto mx-auto'

				style={{
					animationName: 'appearImage',
					animationDuration: '2s',
					animationTimingFunction: 'ease-in-out'
				}}
			/>
			<div 
				id='root-paras-5'
				className='relative'
				style={para1Style}
			>
				<p className='mt-6 p-3 font-bold text-white text-2xl text-center'>Earn Your Choice of Crypto</p>
				<p className='mt-2 p-6 text-center leading-relaxed font-light'>Become our member, fulfill orders for others and earn your choice of Crypto!</p>
			</div>
		</div>
	);
};
