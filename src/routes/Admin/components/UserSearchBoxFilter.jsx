const UserSearchBoxFilter = () => {
  return (
    <div className="flex gap-2 text-sm divide-x-2 divide-slate-900">
      <button className="block px-4 px-3 rounded bg-rose-700">Refresh</button>
      <div className="flex gap-2 pl-2">
        <button className="block px-4 py-3 rounded bg-sky-700">
          Filter by Username
        </button>
        <button className="block px-4 py-3 rounded bg-sky-700">
          Filter by Email
        </button>
      </div>
    </div>
  );
};

export default UserSearchBoxFilter;
