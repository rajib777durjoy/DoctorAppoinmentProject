import React, { useEffect, useState } from 'react';
import axiosSecure from '../../../Hook/axiosSecure';
import useAuth from '../../../Hook/useAuth';
const DcBalance = () => {
    const AxiosSequre = axiosSecure();
    const { user } = useAuth();
    const [balanceData, setBalanceData] = useState([])
    useEffect(() => {
        AxiosSequre.get(`/detailsBalance/${user.email}`)
            .then(res => {
                console.log(res.data)
                setBalanceData(res.data)
            })
    }, [])
    return (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Payment_Id</th>
                        <th>Name</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                {
                    balanceData.map((item, index) => <tbody>
                        {/* row 1 */}
                        <tr>
                            <th>{index + 1}</th>
                            <td>{item?.pasentList?.paymentIntentId}</td> 
                            <td>{item?.pasentList?.appliedName}</td>
                            <td>{item?.pasentList?.amount}</td>
                        </tr>

                    </tbody>)
                }

            </table>
        </div>
    );
};

export default DcBalance;