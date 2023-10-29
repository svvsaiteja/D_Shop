import { Link } from "react-router-dom";
import "./product.css";
import Chart from "../../components/charts/Chart";
import { useLocation } from "react-router-dom";

import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestMethods";

import { updateProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";


import {
  updateProductSuccess,
  updateProductFail,
} from "../../redux/productRedux";

export default function Product() {
  const location = useLocation();
  // const [updatedProduct,setUpdatedProduct]=useState([]);
  const productId = location.pathname.split("/")[2];
  const [updatedProduct, setUpdatedProduct] = useState({});
  const dispatch = useDispatch();
  // const [product,setProduct]=useState();
  const [pStats, setPStats] = useState([]);
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
  console.log(product);
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const changeHandler = (e) => {
    setUpdatedProduct((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("stats/" + productId);
        console.log("server");
        console.log(res.data);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) => {
          return setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ]);
        });
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);
  console.log(pStats);

  const formSubmit = async (event) => {
    event.preventDefault();
    updateProduct(productId, updatedProduct, dispatch);

    console.log("updated");
  };
  console.log(updatedProduct);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>

            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">
                {product.inStock ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              name="title"
              onChange={changeHandler}
              type="text"
              placeholder={product.title}
            />
            <label>Product Description</label>
            <input
              name="desc"
              onChange={changeHandler}
              type="text"
              placeholder={product.desc}
            />
            <label>Product Price</label>
            <input
              name="price"
              onChange={changeHandler}
              type="text"
              placeholder={product.price}
            />
            <label>In Stock</label>
            <select name="inStock" onChange={changeHandler} id="idStock">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton" onClick={formSubmit}>
              Update
            </button>
          </div>
          <h1>{product.inStock}</h1>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
