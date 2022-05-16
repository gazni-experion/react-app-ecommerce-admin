import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/home";
import Users from "./Pages/users";
import Orders from "./Pages/orders";
import Products from "./Pages/products";
import Navbar from "./Components/Layout/navbar";
import NoPage from "./Pages/noPage";
import Categories from "./Pages/categories";
import AddCategory from "./Pages/addCategory";
import AddUser from "./Pages/addUser";
import AboutUs from "./Pages/aboutUs";
import { Provider } from "react-redux";
import store from "./Store/store";
import UpdateProfile from "./Pages/Admin/updateProfile";
import Profile from "./Pages/Admin/profile";
import Protected from "./Components/protected";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />
          <Route path="admin" element={<Navbar />}>
            <Route path="dashboard" element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="users" element={<Users />} />
            <Route path="orders" element={<Orders />} />
            <Route path="categories" element={<Categories />} />
            <Route path="add-category" element={<AddCategory />} />
            <Route path="add-user" element={<AddUser />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="update-profile" element={<UpdateProfile />} />
            <Route
              path="profile"
              element={
                <Protected>
                  <Profile />
                </Protected>
              }
            />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
