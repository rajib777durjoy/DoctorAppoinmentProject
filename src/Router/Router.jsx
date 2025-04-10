import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Mainpage from '../Layout/Mainpage';
import Home from '../pages/component/Home';
import About from '../pages/component/About';
import Login from '../Authentication/Login';
import Register from '../Authentication/Register';
import AddDoctor from '../pages/Doctor/AddDoctor';
import DoctorDetails from '../pages/Doctor/DoctorDetails';
import AllDoctor from '../pages/Doctor/AllDoctor';
import Dashboard from '../Layout/Dashboard/Dashboard';
import Protect from '../Protect/Protect';
import AppliedList from '../pages/Admin/Component/AppliedList';
import NewsPost from '../pages/Admin/Component/NewsPost';
import PaymentDetails from '../pages/Admin/Component/PaymentDetails';
import StaticsPage from '../pages/Static/StaticsPage';
import AddCategory from '../pages/Admin/Component/AddCategory';

const Router = createBrowserRouter([
    {
        path:'/',
        element:<Mainpage></Mainpage>,
        children:[
            {
                path:'/',
                element:<Home></Home>,
            },
            {
                path:'/about',
                element:<About></About>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
              path:'/register',
              element:<Register></Register>
            },
            {
                path:'/adddoctor',
                element:<AddDoctor></AddDoctor>
            },
            {
                path:'/doctorDetails/:id',
                element:<DoctorDetails></DoctorDetails>
            },
            {
                path:'/alldoctor',
                element:<AllDoctor></AllDoctor>
            }

        ]
    },
    {
        path:'/dashboard',
        element:<Protect><Dashboard></Dashboard></Protect>,
        children:[
            {
                index:true,
                element:<StaticsPage></StaticsPage>
            },
            {
                path:'addcategory',
                element:<AddCategory></AddCategory>
            },
            {
                path:'applidlist',
                element:<AppliedList></AppliedList>
            },
            {
                path:'newspost',
                element:<NewsPost></NewsPost>
            },
            {
                path:'paymentList',
                element:<PaymentDetails></PaymentDetails>
            }

        ]
    }
])

export default Router;