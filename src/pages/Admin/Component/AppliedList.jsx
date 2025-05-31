import React, { useState } from 'react';
import useAuth from '../../../Hook/useAuth';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../../Hook/axiosSecure';
import Swal from 'sweetalert2';

const AppliedList = () => {
    const { user } = useAuth()
    const AxiosSecure = axiosSecure()
    const [value, setValue] = useState([])

    const { data: list = [], isPending, refetch } = useQuery({
        queryKey: ['applid', user?.email],
        queryFn: async () => {
            const res = await AxiosSecure(`/applidlist`)
            console.log('applidlist', res.data);
            return res.data;
        }
    })
    // console.log("list", list[0])
    // console.log("value",value)

    if (isPending) {
        return <div className='text-2xl text-red-400'>Loading...</div>
    }
    const handleClick = async (e, applid_id) => {
        setValue(e.target.value)
        console.log('click me', e.target.value, applid_id)
        if (e.target.value) {
            const respons = await AxiosSecure.patch(`/status/Update/${applid_id}`, { status: e.target.value })
            console.log('respons of server', respons.data)
            if (respons.data.modifiedCount > 0) {
                refetch()
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: `status${e.target.value} successful`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }

    }
    const handleMoreDetails=(id)=>{
     console.log("more details id",id);
    }
    return (
        <div className="overflow-x-auto">
            <table className="table table-xs">
                <thead>
                    <tr>
                        <th className='text-center'>#</th>
                        <th className='text-center'>Name</th>
                        <th className='text-center'>Email</th>
                        <th className='text-center'>Category</th>
                        <th className='text-center'>status</th>
                        <th className='text-center'>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list?.map((item, index) => <tr key={index}>
                            <th className='text-center'>{index + 1}</th>
                            <td className='text-center'>{item.name}</td>
                            <td className='text-center'>{item.email}</td>
                            <td className='text-center'>{item.Category}</td>
                            <td>
                                <fieldset className="fieldset">
                                    <select onChange={(e) => {

                                        handleClick(e, item?._id)
                                    }} disabled={item?.status == 'done' ? true : false} defaultValue={item?.status} className="select">
                                        <option>panding</option>
                                        <option >Inprogres</option>
                                        <option>done</option>
                                    </select>

                                </fieldset>
                            </td>
                            <td><button onClick={()=>handleMoreDetails(item?._id)} className='btn text-xs'>more</button></td>
                        </tr>)
                    }
                    {/* <tr>
                        <th>2</th>
                        <td>Hart Hagerty</td>
                        <td>Desktop Support Technician</td>
                        <td>Zemlak, Daniel and Leannon</td>
                        <td>United States</td>
                        <td>12/5/2020</td>
                        <td>Purple</td>
                    </tr>
                    <tr>
                        <th>3</th>
                        <td>Brice Swyre</td>
                        <td>Tax Accountant</td>
                        <td>Carroll Group</td>
                        <td>China</td>
                        <td>8/15/2020</td>
                        <td>Red</td>
                    </tr>
                    <tr>
                        <th>4</th>
                        <td>Marjy Ferencz</td>
                        <td>Office Assistant I</td>
                        <td>Rowe-Schoen</td>
                        <td>Russia</td>
                        <td>3/25/2021</td>
                        <td>Crimson</td>
                    </tr>
                    <tr>
                        <th>5</th>
                        <td>Yancy Tear</td>
                        <td>Community Outreach Specialist</td>
                        <td>Wyman-Ledner</td>
                        <td>Brazil</td>
                        <td>5/22/2020</td>
                        <td>Indigo</td>
                    </tr>
                    <tr>
                        <th>6</th>
                        <td>Irma Vasilik</td>
                        <td>Editor</td>
                        <td>Wiza, Bins and Emard</td>
                        <td>Venezuela</td>
                        <td>12/8/2020</td>
                        <td>Purple</td>
                    </tr>
                    <tr>
                        <th>7</th>
                        <td>Meghann Durtnal</td>
                        <td>Staff Accountant IV</td>
                        <td>Schuster-Schimmel</td>
                        <td>Philippines</td>
                        <td>2/17/2021</td>
                        <td>Yellow</td>
                    </tr>
                    <tr>
                        <th>8</th>
                        <td>Sammy Seston</td>
                        <td>Accountant I</td>
                        <td>O'Hara, Welch and Keebler</td>
                        <td>Indonesia</td>
                        <td>5/23/2020</td>
                        <td>Crimson</td>
                    </tr>
                    <tr>
                        <th>9</th>
                        <td>Lesya Tinham</td>
                        <td>Safety Technician IV</td>
                        <td>Turner-Kuhlman</td>
                        <td>Philippines</td>
                        <td>2/21/2021</td>
                        <td>Maroon</td>
                    </tr>
                    <tr>
                        <th>10</th>
                        <td>Zaneta Tewkesbury</td>
                        <td>VP Marketing</td>
                        <td>Sauer LLC</td>
                        <td>Chad</td>
                        <td>6/23/2020</td>
                        <td>Green</td>
                    </tr>
                    <tr>
                        <th>11</th>
                        <td>Andy Tipple</td>
                        <td>Librarian</td>
                        <td>Hilpert Group</td>
                        <td>Poland</td>
                        <td>7/9/2020</td>
                        <td>Indigo</td>
                    </tr>
                    <tr>
                        <th>12</th>
                        <td>Sophi Biles</td>
                        <td>Recruiting Manager</td>
                        <td>Gutmann Inc</td>
                        <td>Indonesia</td>
                        <td>2/12/2021</td>
                        <td>Maroon</td>
                    </tr>
                    <tr>
                        <th>13</th>
                        <td>Florida Garces</td>
                        <td>Web Developer IV</td>
                        <td>Gaylord, Pacocha and Baumbach</td>
                        <td>Poland</td>
                        <td>5/31/2020</td>
                        <td>Purple</td>
                    </tr>
                    <tr>
                        <th>14</th>
                        <td>Maribeth Popping</td>
                        <td>Analyst Programmer</td>
                        <td>Deckow-Pouros</td>
                        <td>Portugal</td>
                        <td>4/27/2021</td>
                        <td>Aquamarine</td>
                    </tr>
                    <tr>
                        <th>15</th>
                        <td>Moritz Dryburgh</td>
                        <td>Dental Hygienist</td>
                        <td>Schiller, Cole and Hackett</td>
                        <td>Sri Lanka</td>
                        <td>8/8/2020</td>
                        <td>Crimson</td>
                    </tr>
                    <tr>
                        <th>16</th>
                        <td>Reid Semiras</td>
                        <td>Teacher</td>
                        <td>Sporer, Sipes and Rogahn</td>
                        <td>Poland</td>
                        <td>7/30/2020</td>
                        <td>Green</td>
                    </tr>
                    <tr>
                        <th>17</th>
                        <td>Alec Lethby</td>
                        <td>Teacher</td>
                        <td>Reichel, Glover and Hamill</td>
                        <td>China</td>
                        <td>2/28/2021</td>
                        <td>Khaki</td>
                    </tr>
                    <tr>
                        <th>18</th>
                        <td>Aland Wilber</td>
                        <td>Quality Control Specialist</td>
                        <td>Kshlerin, Rogahn and Swaniawski</td>
                        <td>Czech Republic</td>
                        <td>9/29/2020</td>
                        <td>Purple</td>
                    </tr>
                    <tr>
                        <th>19</th>
                        <td>Teddie Duerden</td>
                        <td>Staff Accountant III</td>
                        <td>Pouros, Ullrich and Windler</td>
                        <td>France</td>
                        <td>10/27/2020</td>
                        <td>Aquamarine</td>
                    </tr>
                    <tr>
                        <th>20</th>
                        <td>Lorelei Blackstone</td>
                        <td>Data Coordiator</td>
                        <td>Witting, Kutch and Greenfelder</td>
                        <td>Kazakhstan</td>
                        <td>6/3/2020</td>
                        <td>Red</td>
                    </tr> */}
                </tbody>

            </table>
        </div>
    );
};

export default AppliedList;