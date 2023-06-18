import UserSearchBox from "./components/UserSearchBox";
import UserSearchBoxFilter from "./components/UserSearchBoxFilter";
import UsersEntryBox from "./components/UsersEntryBox";

export default function Users() {
  return (
    <div className="px-10 p-8 text-white">
      <div>
        <h2 className="text-black font-normal text-2xl">Users Management</h2>
      </div>
      <div className="mt-24">
        <div className="flex gap-4 items-center mb-4">
          <UserSearchBoxFilter />
          <UserSearchBox />
        </div>
        <UsersEntryBox />
      </div>
    </div>
  );
}
