import "./userlist.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestMethods";
import { deleteUser } from "../../redux/apiCalls";
import { AddUser } from "../../redux/usersRedux";
import { useDispatch } from "react-redux";

const UserList = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      const res = await userRequest.get("users");
      setData(res.data);
      dispatch(AddUser(res.data));
      console.log(res.data);
    };
    getData();
  }, [dispatch]);
  console.log(data);

  const handleDelete = async (id) => {
    deleteUser(id);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "username",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListItem">
            <img
              className="userListImg"
              src={
                params.row.img ||
                "https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
              }
              alt=""
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="userList" style={{ height: "100%" }}>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        // pageSize={8}
        checkboxSelection
      />
    </div>
  );
};

export default UserList;
