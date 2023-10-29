import React from "react";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import { useLocation } from "react-router-dom";

import "./order.css";
const Order = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [orderData, setOrderData] = useState({});
  const [orderStatus, setOrderStatus] = useState({});

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await userRequest.get(`/orders/find/${id}`);
        console.log(res);
        setOrderData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrder();
  }, [id, orderStatus]);
  const changeOrderStatus = async () => {
    try {
      const res = await userRequest.put(`/orders/${id}`, orderStatus);
      let data = { orderStatus: orderStatus.status, number: orderData.number };

      const notification = await userRequest.post("/twilio", data);
      console.log(notification);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    console.log(orderStatus);
  };
  const Button = ({ type }) => {
    return <button className={type}>{type}</button>;
  };

  console.log(orderData);
  return (
    <>
      {orderData ? (
        <div className="container">
          <div className="wrapper">
            <div className="left">
              <div className="user">
                <div>
                  <h1>Shipping Details</h1>
                </div>
                <div className="data">
                  <h2>Name</h2>
                  <span>{orderData.name}</span>
                </div>
                <div className="data">
                  <h2>Address</h2>
                  <span>{orderData.address}</span>
                </div>
                <div className="data">
                  <h2>Phone</h2>
                  <span>{orderData.number}</span>
                </div>
              </div>
              <div className="payment">
                <div>
                  <h1>Payment Details</h1>
                </div>
                <div>
                  <h2>
                    Total Amount : <span>$ {orderData.amount}</span>
                  </h2>
                </div>
                <div>
                  <button type="text" className="Success">
                    PAID
                  </button>
                </div>
              </div>
              <div className="order">
                <div>
                  <h1>Order Status</h1>
                </div>
                <div>
                  <Button type={orderData.status}>{orderData.status}</Button>
                </div>
              </div>
            </div>
            <div className="right">
              <div>
                <h2>Process Order</h2>
              </div>
              <div>
                <select
                  className="process"
                  name="pending"
                  onChange={(event) => {
                    setOrderStatus({ status: event.target.value });
                  }}
                >
                  <option value="defaull" disabled selected>
                    Process
                  </option>
                  <option className="process" value="Shipping">
                    Shipping
                  </option>
                  <option className="process" value="Delivered">
                    Delivered
                  </option>
                </select>
              </div>
              <div>
                <button onClick={changeOrderStatus}>Process</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>lol</h1>
      )}
    </>
  );
};

export default Order;
