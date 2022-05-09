import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/pages/Home.js';
import Users from './components/pages/Users.js';
import Orders from './components/pages/Orders.js';
import Products from './components/pages/Products.js';
import Navbar from './components/layout/Navbar.js';
import NoPage from './components/pages/NoPage';
import Categories from './components/pages/Categories';
import AddCategory from './components/pages/AddCategory';
import AddUser from './components/pages/AddUser';
import AboutUs from './components/pages/AboutUs';
import { Provider } from 'react-redux'
import store from './store'
import UpdateProfile from './components/admin/updateProfile'
import Profile from './components/admin/profile'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
<BrowserRouter>
    <Routes>
      <Route index element={<App />} />
      <Route path="admin" element={<Navbar />} >
      <Route path="dashboard" element={<Home />} />
      <Route path="products" element={<Products />} />
      <Route path="users" element={<Users />} />
      <Route path="orders" element={<Orders />} />
      <Route path="categories" element={<Categories />} />
      <Route path="add-category" element={<AddCategory />} />
      <Route path="add-user" element={<AddUser />} />
      <Route path="about-us" element={<AboutUs />} />
      <Route path="update-profile" element={<UpdateProfile />} />
      <Route path="profile" element={<Profile />} />
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
