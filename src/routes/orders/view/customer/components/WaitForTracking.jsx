export default function ChooseIntermediary() {
  return (
    <div className="bg-white rounded-md px-12 py-8 pb-12">
      <p className="font-semibold text-lg">Pick Intermediary</p>
      <p className="mt-10 text-slate-600 text-center">
        2 people have shown interest in being an intermediary
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <div className="p-5 rounded-lg bg-slate-200 w-4/5 md:w-1/2 lg:w-1/3 flex flex-col items-center justify-between">
          <p className="text-lg font-medium text-center">Jake</p>
          <div className="mt-10">
            <div className="flex justify-center gap-5 lg:gap-3 flex-wrap">
              <div className="text-center p-3 bg-white rounded-lg">
                <p className="font-medium">16</p>
                <p className="mt-2 text-sm text-slate-400">Total Order</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <p className="font-medium">4.5 / 5.0</p>
                <p className="mt-2 text-sm text-slate-400">Rating</p>
              </div>
            </div>
            <div className="flex lg:block gap-3 mt-5 flex-wrap">
              <button className="block p-4 rounded-xl bg-green-600 text-white font-medium grow lg:w-full">
                Select
              </button>
              <button className="block p-4 rounded-xl bg-red-600 text-white font-medium grow lg:w-full lg:mt-3">
                Message
              </button>
            </div>
          </div>
        </div>
        <div className="p-5 rounded-lg bg-slate-200 w-4/5 md:w-1/2 lg:w-1/3 flex flex-col items-center justify-between overflow-hidden">
          <p className="text-lg font-medium text-center overflow-x-auto w-full">
            Ndkhoanenaiono2342342
          </p>
          <div className="mt-10">
            <div className="flex justify-center gap-5 lg:gap-3 flex-wrap">
              <div className="text-center p-3 bg-white rounded-lg">
                <p className="font-medium">16</p>
                <p className="mt-2 text-sm text-slate-400">Total Order</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <p className="font-medium">4.5 / 5.0</p>
                <p className="mt-2 text-sm text-slate-400">Rating</p>
              </div>
            </div>
            <div className="flex lg:block gap-3 mt-5 flex-wrap">
              <button className="block p-4 rounded-xl bg-green-600 text-white font-medium grow lg:w-full">
                Select
              </button>
              <button className="block p-4 rounded-xl bg-red-600 text-white font-medium grow lg:w-full lg:mt-3">
                Message
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <button className="block p-4 rounded-xl bg-sky-600 text-white font-medium w-3/4 md:w-1/2 mx-auto">
          Proceed
        </button>
      </div>
    </div>
  );
}
