import React from "react";

import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestMethods";
import { Link } from "react-router-dom";
import { DeleteOutline } from "@material-ui/icons";
import { DataGrid } from "@material-ui/data-grid";
import { getOrders, deleteOrder } from "../../redux/orderRedux";

import { useDispatch, useSelector } from "react-redux";
// import { notifyFailure, notifySuccess } from "../../alert/alert";
import { notifySuccess } from "../../alert/alert";
// import dualring from ".../Assests/dualring.js";
// import dualring from ".../"
import dualring from "../Assests/dualring.svg";
import "./orders.css";


const Orders = () => {
  const order = useSelector((state) => state.order.orders);
  const dispatch = useDispatch();
  console.log(order);
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    const getAllorders = async () => {
      try {
        const res = await userRequest.get("/orders");
        console.log(res);
        dispatch(getOrders(res.data));
        setAllOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllorders();
  }, [dispatch]);
notifySuccess("lol");
  const handleDelete = async (id) => {
    try {
      const res = await userRequest.delete(`orders/${id}`);
      res && notifySuccess("Successfully Deleted!");
      dispatch(deleteOrder(id));
    } catch (err) {
      console.log(err);
    }
  };


  const columns = [
    { field: "_id", headerName: "Order ID", width: 220 },
    {
      field: "name",
      headerName: "User Name",
      width: 200,
    },
    { field: "status", headerName: "Status", width: 200 },
    {
      field: "amount",
      headerName: "Amount",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/order/" + params.row._id}>
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

  console.log(allOrders.length);
  return (
    <div className="productList" style={{ height: "100%" }}>
      <DataGrid
        rows={order}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        checkboxSelection
      />
    </div>
  );
};

export default Orders;
