
import React, { useEffect, useState, PureComponent } from 'react';
import axiosSecure from '../../../Hook/axiosSecure';
import useAuth from '../../../Hook/useAuth';
import { FaUsers } from 'react-icons/fa';
import { FaHandHoldingDollar, FaUserDoctor } from "react-icons/fa6";


import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, } from 'recharts';

const AdminHome = () => {
    const AxiosSecqure = axiosSecure();
    const [datas, setData] = useState([]);
    const [totalDoctor, setTotalDoctor] = useState(0);
    const [totalUser, setTotaluser] = useState(0);
    const [paymentDetails, setPaymentDetails] = useState([])
    const [doctor_list, setDoctor_list] = useState([]);
    const [doctorDetails, setDoctorDetails] = useState([])
    const { user } = useAuth()
    useEffect(() => {
        AxiosSecqure.get(`/totalPayment/totalDoctor/${user?.email}`)
            .then(res => {
                console.log('json daata', res.data);
                setData(res.data[0]["totalPayment"])
                setTotalDoctor(res.data[1])
                setTotaluser(res.data[2])
                setDoctor_list(res.data[3]);
                if (res?.data) {
                    AxiosSecqure.get(`/per_doctor/balancelis/${user?.email}`)
                        .then(ress => {
                            console.log(ress.data);
                            setPaymentDetails(ress.data);
                        })
                }
            })

    }, [user])
    console.log('doctor list::', doctor_list)

    const data = [
        { name: 'Group A', value: totalDoctor },
        { name: 'Group B', value: totalUser },
    ];
    const COLORS = ['#0088FE', '#FFBB28',];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    const data2 = [
        { name: 'rajib chando', uv: 1000, pv: 500, amt: 500 },
        { name: 'rajib chando', uv: 1000, pv: 1000, amt: 1000 },
        { name: 'Rahul Biswas', uv: 1000, pv: 1000, amt: 1000 }
    ];
    const dataT = paymentDetails.map(item => ({ name: item?.appliedName, uv: Number(item?.amount) }))
    console.log('dataT::', dataT)
    const handleMoreDetails = async (id) => {
        const res = await AxiosSecqure.get(`/doctor/pacentDetails/${id}`);
        console.log('doctor details:::', res.data)
        setDoctorDetails(res.data);
    }
    //     {
    //     "_id": "67efcb85d4b839e12801a73e",
    //     "name": "durjoy chando",
    //     "email": "durjoy2001chando@gmail.com",
    //     "image": "https://i.ibb.co/Z115VHZk/IMG-20220630-200229.jpg",
    //     "fee": "1000",
    //     "Register": "545353",
    //     "StartTime": "18:06",
    //     "endTime": "21:30",
    //     "Category": "Pediatrician",
    //     "description": "Treatment for dropped head syndrome (DHS) depends on the underlying cause. DHS is a condition where the neck muscles become weak, causing the head to droop forward. Common causes include neuromuscular diseases, cervical spine disorders, or Parkinson’s disease. Here are the main treatment options:",
    //     "day": [
    //         "Friday",
    //         "Saterday",
    //         "Sunday"
    //     ],
    //     "skill": [
    //         "MBBS"
    //     ],
    //     "status": "done",
    //     "PatientLimit": "50",
    //     "role": "doctor"
    // }
    const { name, email, image, Register, fee, Category, description } = doctorDetails || []
    return (

        <div>
            <div className='w-[90%] mx-auto grid grid-cols-3 gap-4'>
                <div className='flex justify-center bg-[#FFBB28] items-center gap-4 border my-4 rounded-xl'>
                    <FaUsers className='text-6xl text-white' />
                    <div>
                        <h1 className='text-xl text-white'>Total User</h1>
                        <h2 className='text-center text-xl text-white'>{totalUser}</h2>
                    </div>
                </div>
                <div className='flex justify-center bg-[#0088FE] items-center gap-4 border my-4 rounded-xl py-3'>
                    <FaUserDoctor className='text-6xl text-white' />
                    <div>
                        <h1 className='text-xl text-white'>Total Doctor</h1>
                        <h2 className='text-center text-xl text-white'>{totalDoctor}</h2>
                    </div>

                </div>
                <div className='flex justify-center bg-[#8884d8] items-center gap-4 border my-4 rounded-xl py-3'>
                    <FaHandHoldingDollar className='text-6xl text-white' />
                    <div>
                        <h1 className='text-xl text-white'>Total Balance</h1>
                        <h2 className='text-center text-xl text-white'>{datas}</h2>
                    </div>
                </div>
            </div>
            {/* --------------Pie chart--------------------- */}
            <div className='w-[100%] flex justify-between flex-row-reverse'>
                <div className='w-[500px] h-[400px]'>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={180}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className='w-[500px] h-[400px]'>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            width={500}
                            height={400}
                            data={dataT}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <hr className='mt-5' />
            <div className="overflow-x-auto mt-5">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th className='text-center'>#</th>
                            <th className='text-center'>Name</th>
                            <th className='text-center'>Email</th>
                            <th className='text-center'>Category</th>
                            <th className='text-center'>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctor_list?.map((item, index) => <tr key={index}>
                                <th className='text-center'>{index + 1}</th>
                                <td className='text-center'>{item.name}</td>
                                <td className='text-center'>{item.email}</td>
                                <td className='text-center'>{item.Category}</td>

                                <td className='text-center'><button onClick={() => {
                                    handleMoreDetails(item?._id)
                                    document.getElementById('my_modal_5').showModal()
                                }
                                } className='btn text-xs'>more</button></td>
                            </tr>)
                        }

                    </tbody>

                </table>
                <div>
                   
                </div>
            </div>
            {/* custom modal  */}
            {/* Open the modal using document.getElementById('ID').showModal() method */}

            <dialog id="my_modal_5" className="modal modal-top mx-auto min-h-[500px] my-auto w-[100%]">
                <div className="modal-box w-[80%] mx-auto  bg-yellow-50 rounded-2xl p-6 shadow-2xl border border-yellow-200">

                    {/* Close Button */}
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-yellow-600 hover:text-red-600 text-xl">
                            ✕
                        </button>
                    </form>

                    {/* Grid Layout */}
                    <div className="grid md:grid-cols-2 gap-10 items-center">

                        {/* Doctor Image */}
                        <div className="flex justify-center">
                            <img
                                src={image}
                                alt="Doctor"
                                className="w-60 h-60 rounded-full object-cover border-4 border-yellow-400 shadow-md"
                            />
                        </div>

                        {/* Doctor Info */}
                        <div>
                            <h2 className="text-4xl font-bold text-yellow-800">{name}</h2>
                            <p className="text-lg text-yellow-600 mt-1 font-semibold">{Category}</p>

                            <div className="mt-6 space-y-2 text-base text-gray-800">
                                <p><span className="font-semibold">💰 Fee:</span> ${fee}</p>
                                <p><span className="font-semibold">📧 Email:</span> {email}</p>
                                <p><span className="font-semibold">🆔 Registration No:</span> {Register}</p>
                                <p><span className="font-semibold">🩺 Experience:</span> {doctorDetails?.experience || 'Not specified'}</p>
                            </div>

                            <p className="mt-5 text-sm text-gray-700 leading-relaxed border-t border-yellow-200 pt-4">
                                <span className="font-semibold text-yellow-800">About Dr. {name}:</span> <br />
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
            </dialog>


        </div>
    );
};

export default AdminHome;