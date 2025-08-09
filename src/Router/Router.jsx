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
import Categorys from '../pages/Categorys/Categorys';
import Service from '../pages/component/service/Service';
import Myappoinment from '../pages/Doctor/Component/Myappoinment';
import AI_powered_Checkup from '../pages/Mamber/Component/AI_powered_Checkup';
import Report from '../pages/Mamber/Component/Report';
import ReportDetails from '../pages/Mamber/Component/ReportDetails';





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
                path:'/service',
                element:<Service></Service>
            },
            {
                path:'/payment/:value',
                element:<Payment></Payment>
            },
            {
                path:'/categoryDetails/:category',
                element:<Categorys></Categorys>
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
              path:'AI_Powered_Health',
              element:<AI_powered_Checkup></AI_powered_Checkup>
            },
            {
                path:'view_report',
                element:<Report></Report>
            },
            {
                path:'reportDetails/:id',
                element:<ReportDetails></ReportDetails>
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
                path:'myappoinment',
                element:<Myappoinment></Myappoinment>
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
                path:'Chat',
                element:<Chat></Chat>
            },
            {
                path:'appoinmentlist',
                element:<AppointmentList></AppointmentList>
            }

        ]
    }
])

export default Router;