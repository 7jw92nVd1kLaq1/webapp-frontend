import { Link } from "react-router-dom";

const UserEntry = (props) => {
  return (
    <div
      id={props.username}
      className="flex justify-end shadow-sm bg-white text-black w-full p-3 py-5"
    >
      <div className="flex font-light w-11/12">
        <button className="username text-sm w-3/12 font-normal text-left">
          <Link to={props.username}>{props.username}</Link>
        </button>
        <button className="email text-sm w-4/12 text-left">
          {props.email}
        </button>
        <button className="reg-date text-sm w-2/12 text-center">
          {new Date(props.registeredDate).toDateString()}
        </button>
        <button className="isAdmin text-sm w-1/12 text-center">
          {props.isAdmin}
        </button>
        <button className="something text-sm w-2/12 text-center">1</button>
      </div>
    </div>
  );
};

export default UserEntry;
