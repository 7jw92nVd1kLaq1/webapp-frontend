import shipping from "@/assets/shipping.svg";
import tshirt from "@/assets/reset.jpeg";

export default function TrackingProvided() {
  return (
    <div className="bg-white rounded-md px-12 py-8 pb-12">
      <p className="font-semibold text-lg">Delivery</p>
      <div className="relative w-40 h-40 bg-green-200 mt-10 rounded-full mx-auto">
        <img
          src={shipping}
          className="w-4/6 h-auto absolute"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
      <h3 className="mt-10 font-semibold text-xl text-center">
        Items on Your Way
      </h3>
      <p className="text-slate-500 mt-3 text-sm text-center">
        Item(s) are marked as shipped! They will be at your place soon!
      </p>
      <div className="mt-12">
        <p className="mb-5 font-medium">Tracking #'s</p>
        <div className="flex flex-col md:flex-row items-stretch gap-3">
          <div className="flex items-center gap-5 w-full md:w-1/2 bg-sky-100 rounded-lg p-5">
            <img src={tshirt} className="w-14 h-auto" />
            <div className="grow">
              <p className="font-medium text-slate-500 text-sm">
                Deutsche Post
              </p>
              <p className="font-medium mt-1 break-all">BA837BD92HT</p>
            </div>
          </div>
          <div className="flex items-center gap-5 w-full md:w-1/2 bg-sky-100 rounded-lg p-5">
            <img src={tshirt} className="w-14 h-auto" />
            <div className="grow">
              <p className="font-medium text-slate-500 text-sm">DHL</p>
              <p className="font-medium mt-1 break-all">BA837BD92HT</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
