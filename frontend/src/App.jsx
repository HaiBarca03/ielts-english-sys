import React from 'react';
import { Outlet } from 'react-router-dom';
import TopHeader from './components/TopHeader';
import Sidebar from './components/SideBar';
import { ToastContainer } from 'react-toastify';
import './App.css'; 

const App = () => {
  return (
    <>
      <div className="app-container">
        <Sidebar />
        <div className="content-container">
          <TopHeader />
          <ToastContainer />
          <div className="content-scroll">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;