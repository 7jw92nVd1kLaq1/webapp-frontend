export default function ChooseIntermediary() {
  return (
    <div className="bg-white rounded-xl px-12 py-8 pb-12">
      <p className="font-semibold text-lg">Pick Intermediary</p>
      <p className="mt-10 text-slate-600 text-center">
        2 people have shown interest in being an intermediary
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3"></div>
      <div className="mt-10">
        <button className="block p-4 rounded-xl bg-sky-600 text-white font-medium w-3/4 md:w-1/2 mx-auto">
          Proceed
        </button>
      </div>
    </div>
  );
}
