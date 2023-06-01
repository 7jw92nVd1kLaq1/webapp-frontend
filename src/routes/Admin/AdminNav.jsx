import "../root.css";

export default function AdminNav() {
  return (
    <div className="lg:w-3/12 w-0 lg:block hidden min-h-screen bg-gray-800 p-8">
      <div className="mb-10">
        <p className="text-xl font-light">Administration</p>
      </div>
      <div id="menus" className="flex flex-col gap-4">
        <div id="menus-main" className="flex flex-col gap-1">
          <button className="flex gap-2 items-center font-light p-1">
            <p>
              <a href="/admin/users/">Users</a>
            </p>
          </button>
          <div id="menus-orders" className="flex flex-col gap-1">
            <button className="flex gap-2 items-center font-light p-1">
              <p>Orders</p>
            </button>
            <div className="flex flex-col gap-1 pl-4 text-sm font-light">
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
