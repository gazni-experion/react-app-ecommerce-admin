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


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
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
      </Route>
      <Route path="*" element={<NoPage />} />
      
   
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
