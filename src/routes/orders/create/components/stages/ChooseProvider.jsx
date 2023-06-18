import amazon from "@/assets/amazon.png";
import ebay from "@/assets/ebay.png";
import shopify from "@/assets/shopify.png";

const ProviderBox = (props) => {
  return (
    <div className="border border-slate-400 bg-white hover:bg-amber-100 rounded-lg shadow-lg w-36 h-36 p-5  flex flex-col justify-center items-center">
      {props.children}
    </div>
  );
};

export default function ChooseProvider() {
  return (
    <div className="text-center text-black lg:w-11/12 w-full mx-auto">
      <h1 className="font-bold text-3xl">Choose Provider</h1>
      <p className="text-lg font-semibold text-gray-500 mt-5">
        Select the provider from which you would like to order items
      </p>
      <div className="w-full md:w-5/6 lg:w-4/6 xl:w-3/5 mt-20 flex items-center justify-between flex-wrap mx-auto">
        <ProviderBox>
          <img className="w-10/12 h-auto" src={amazon} />
        </ProviderBox>
        <ProviderBox>
          <img className="w-10/12 h-auto" src={ebay} />
        </ProviderBox>
        <ProviderBox>
          <img className="w-10/12 h-auto" src={shopify} />
        </ProviderBox>
        <ProviderBox>
          <p className="text-lg font-semibold">Others</p>
        </ProviderBox>
      </div>
      <div className="mt-20 flex justify-center items-stretch font-semibold">
        <button className="p-3 rounded-lg shadow-md border border-cyan-600 bg-cyan-600 text-white">
          Move to Next
        </button>
      </div>
    </div>
  );
}
