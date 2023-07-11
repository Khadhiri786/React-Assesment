import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {
  createBrowserRouter,
  RouterProvider,
 } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import DepartmentDetails from './pages/DepartmentDetails';
import StudentDetails from './pages/StudentDetails';

const router = createBrowserRouter([
  {
    path: "/",
    
    element: (<App/>
          ),
  },
  {path:'/departmentDetails',element:(<DepartmentDetails/>)},
  {path:'/studentDetails',element:(<StudentDetails/>)},
 ]);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
