import React, { useEffect, useState } from 'react';
import axiosSecure from '../../../Hook/axiosSecure';
import useAuth from '../../../Hook/useAuth';

const MemberPaymentList = () => {
  const AxiosSecure = axiosSecure();
  const { user } = useAuth()
  const [paymentData, setPaymentData] = useState([])
  useEffect(() => {
    AxiosSecure.get(`/member_payment_list/${user?.email}`)
      .then(res => {
        console.log(res.data)
        setPaymentData(res?.data)
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
          paymentData.map((item, index) => <tbody>
            {/* row 1 */}
            <tr>
              <th>{index + 1}</th>
              <td>{item?.paymentIntentId}</td>
              <td>{item?.Doctor_info?.name}</td>
              <td>{item?.amount}</td>
            </tr>

          </tbody>)
        }

      </table>
    </div>
  );
};

export default MemberPaymentList;