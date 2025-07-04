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
import AddCategory from '../pages/Admin/Component/AddCategory';
import Payment from '../pages/Payment/Payment';
import Profile from '../pages/Mamber/Component/Profile';
import MemberPaymentList from '../pages/Mamber/Component/MemberPaymentList';
import AppointmentList from '../pages/Mamber/Component/AppointmentList';
import Chat from '../pages/Mamber/Component/Chat';
import PasentList from '../pages/Doctor/Component/PasentList';
import DcBalance from '../pages/Doctor/Component/DcBalance';
import DoctorHome from '../pages/Doctor/Component/DoctorHome';
import MemberHome from '../pages/Mamber/Component/MemberHome';
import AdminHome from '../pages/Admin/Component/AdminHome';

import Profile_page from '../ProfileManagement/Profile_page';
import CategoryDetails from '../Layout/Categorys/categoryDetails';


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
            },
            {
                path:'/payment/:value',
                element:<Payment></Payment>
            },
            {
                path:'/categoryDetails/:category',
                element:<CategoryDetails></CategoryDetails>
            },
            {
                path:'/profile_page',
                element:<Profile_page></Profile_page>
            }

        ]
    },
    {
        path:'/dashboard',
        element:<Protect><Dashboard></Dashboard></Protect>,
        children:[
            {
                path:'adminHome',
                element:<AdminHome></AdminHome>
            },
            {
                path:'doctorHome',
                element:<DoctorHome></DoctorHome>
            },
            {
                path:'memberHome',
                element:<MemberHome></MemberHome>
            },
            {
                path:'addcategory',
                element:<AddCategory></AddCategory>
            },
            {
              path:'listofPasent',
              element:<PasentList></PasentList>
            },
            {
              path:'DoctorBalance',
              element:<DcBalance></DcBalance>
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
            },
            {
                path:'profile',
                element:<Profile></Profile>
            },
            {
               path:'doctorAdd',
               element:<AddDoctor></AddDoctor>
            },
            {
                path:'paymentShow',
                element:<MemberPaymentList></MemberPaymentList>
            },
            {
                path:'appoinmentlist',
                element:<AppointmentList></AppointmentList>
            },
            {
                path:'Chat',
                element:<Chat></Chat>
            }

        ]
    }
])

export default Router;