// import Topbar from "./components/topbar/navbar/Topbar";
import Topbar from "./components/navbar/Topbar";

import Sidebar from "./components/sidebar/Sidebar";
import "./app.css";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import ProductList from "./pages/productList/productList";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import User from "./pages/user/User";
// import NewUser from "./pages/newuser/NewUser";
import NewUser from "./pages/newuser/NewUser";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newproduct/NewProduct";
import Login from "./pages/login/Login";

import Orders from "./pages/orders/orders";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Order from "./pages/order/order";
function App() {
  const history = useHistory();
  const loginUser = useSelector((state) => state.user.currentUser);
  let admin = false;
  if (loginUser != null) {
    admin = loginUser.isAdmin;
  }
  // console.log(loginUser.isAdmin);

  // const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
  // const currentUser = user && JSON.parse(user).currentUser;
  // console.log(currentUser);

  return (
    <Router>
    <Switch>
    <Route path="/login">
    <Login /> 

    </Route>
      {/* <Route  path="/" >
         {!loginUser ?<Redirect to="/login" />:<Home/>}
      </Route> */}

      
      {admin? (
        <>
          <Topbar />
          <div className="container">
            <Sidebar />
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/users">
              <UserList />
            </Route>
            <Route path="/user/:userId">
              <User />
            </Route>
            <Route path="/newUser">
              <NewUser />
            </Route>
            <Route path="/products">
              <ProductList />
            </Route>
            <Route path="/product/:productId">
              <Product />
            </Route>
            <Route path="/newproduct">
              <NewProduct />
            </Route>
            <Route path="/orders">
              <Orders />
            </Route>
            <Route path="/order/:id">
              <Order />
            </Route>
          </div>
        </>
      ) : (
        <Redirect path="/login"></Redirect>
      )}
    </Switch>
  </Router>
  );
}

export default App;
