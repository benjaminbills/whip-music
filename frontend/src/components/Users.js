import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers } from "../actions/userActions";

function Users() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  return (
    <div className="container padding">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Is Premium</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>{user.user_name}</td>
              <td>{user.email}</td>
              <td>{user.is_premium ? <p>True</p> : <p>False</p>}</td>
              <td>
                <Link to={`/users/${user.id}`}>
                  <button className="btn btn-dark">Details</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
