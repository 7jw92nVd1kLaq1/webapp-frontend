import "./root.css";

export default function AdminNav() {
  return (
    <div className="lg:w-3/12 min-h-screen bg-gray-800 p-6">
      <div className="mb-6">
        <p className="text-xl font-light">Administration</p>
      </div>
      <div id="menus" className="flex flex-col gap-4">
        <div id="menus-main" className="flex flex-col gap-1">
          <button className="flex gap-2 items-center font-extralight p-1">
            <p>Users</p>
          </button>
          <div id="menus-orders" className="flex flex-col gap-1">
            <button className="flex gap-2 items-center font-extralight p-1">
              <p>Orders</p>
            </button>
            <div className="flex flex-col gap-1 pl-2 text-sm font-extralight">
              <button className="flex gap-2 items-center p-1">
                <p>All</p>
              </button>
              <button className="flex gap-2 items-center p-1">
                <p>Fulfillments</p>
              </button>
              <button className="flex gap-2 items-center p-1">
                <p>Offers</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
