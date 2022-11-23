export default function TopNav () {
	return (
		<div className="w-full bg-gray-800 fixed top-0 text-white shadow-lg p-3 z-10 flex justify-between items-center">
			<p className="font-semibold text-lg">BitShop</p>
			<button className="p-2 bg-sky-600 rounded shadow-lg">
				Buy
			</button>
		</div>
	);
}
