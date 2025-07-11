import React, { useState } from 'react';
import axiosSecure from '../../../Hook/axiosSecure';
import useAuth from '../../../Hook/useAuth';
import { Font } from '@react-pdf/renderer';
import { Document, Page, Text, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

import NotoSans from '../../../assets/Noto_Sans/static/NotoSans-Regular.ttf';
import NotoSansBengali from '../../../assets/Noto_Sans_Bengali/static/NotoSansBengali-Regular.ttf';
import NotoSansDevanagari from '../../../assets/Noto_Sans_Devanagari/static/NotoSansDevanagari-Regular.ttf';
import Swal from 'sweetalert2';
const AIVitalsCard = () => {
    const AxiosSequer = axiosSecure();
    const { user } = useAuth()
    const [data, setData] = useState({
        height: '',
        weight: '',
        bloodPressure: '',
        pulse: '',
        temperature: '',
        sugar: '',
        oxygen: '',
        health_Conditions: ''
    });

    const [bmi, setBmi] = useState(null);
    // const [summary, setSummary] = useState('');
    // const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [SelectedLang, setSelectedLang] = useState('English');
    const [HealthInfo, setHealthInfo] = useState(``);

    const handleChange = e => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };



    //     const h = parseFloat(data.height) / 100;
    //     const w = parseFloat(data.weight);
    //     if (h > 0 && w > 0) {
    //         const calculated = (w / (h * h)).toFixed(1);
    //         setBmi(calculated);
    //         return calculated;
    //     }
    //     return null;
    // };

    // const generateSummary = () => {
    //     const bmiVal = getBMI();
    //     if (!bmiVal) return;

    //     let statusText = '';
    //     if (bmiVal < 18.5) statusText = 'Underweight';
    //     else if (bmiVal < 24.9) statusText = 'Normal';
    //     else if (bmiVal < 29.9) statusText = 'Overweight';
    //     else statusText = 'Obese';

    //     setStatus(statusText);
    //     setSummary(
    //         `Your BMI is ${bmiVal} (${statusText}). Blood Pressure: ${data.bloodPressure}, Pulse: ${data.pulse}, Sugar: ${data.sugar}. AI recommends a wellness check based on these indicators.`
    //     );
    // };
    console.log("SelectedLang", user?.displayName)
    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);
        AxiosSequer.post(`/health/summary?language=${SelectedLang}`, data)
            .then(res => {
                console.log('health checkup successful:::', res.data)
                setHealthInfo(res.data)
                setLoading(false);
                document.getElementById('my_modal_5').showModal()
            })
            .catch(erro => {
                console.log('health checkup error:::', erro)
                setLoading(false);
            })

    };


    Font.register({ family: 'NotoSansBengali', src: NotoSansBengali });
    Font.register({ family: 'NotoSansDevanagari', src: NotoSansDevanagari });
    Font.register({ family: 'NotoSans', src: NotoSans });

    const getFontFamilyByLanguage = (lang) => {
        if (lang === 'Bangla') return 'NotoSansBengali';
        if (lang === 'Hindi') return 'NotoSansDevanagari';
        return 'NotoSans'; //Default English
    };
    const styles = StyleSheet.create({
        page: {
            padding: 30,
            fontSize: 12,
            fontFamily: getFontFamilyByLanguage(SelectedLang),
        },
        text: {
            marginBottom: 10,
            lineHeight: 1.5,
            color: "black"
        },
    });
    const handleSaveReport = async (healthInfo) => {
        console.log("healthInfo", healthInfo)
        if (user?.email) {
            const respons = await AxiosSequer.post(`/save_report/${user?.email}`, {name:user?.displayName,healthInfo})
            console.log('response from save healthInfo:', respons.data);
            if (respons.data.insertedId) {
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Your Report has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
                document.getElementById('my_modal_5').close()
            }
        }

    }

    return (
        <div className="w-[100%] min-h-screen bg-white text-gray-800  py-8 flex  items-start">
            <div className="bg-white w-full  p-6 rounded-xl shadow-lg  border-gray-200">

                <h2 className="text-3xl font-bold text-center mb-6 text-yellow-500">🧠 AI-Powered Health Checkup</h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                    {[
                        ['height', 'Height (cm)'],
                        ['weight', 'Weight (kg)'],
                        ['bloodPressure', 'Blood Pressure'],
                        ['pulse', 'Pulse (bpm)'],
                        ['temperature', 'Temperature (°F)'],
                        ['sugar', 'Blood Sugar (mg/dL)'],
                        ['oxygen', 'Oxygen Saturation (%)'],
                        ['health_Conditions', 'Health Conditions Explain'],
                    ].map(([field, label]) => (
                        <div key={field}>
                            <label className="text-sm font-medium">{label}</label>
                            <input
                                type={field == 'health_Conditions' ? 'text' : `number`}
                                name={field}
                                value={data[field]}
                                onChange={handleChange}
                                required
                                className="w-full p-2 mt-1 bg-yellow-50 border border-yellow-300 rounded-md text-gray-800 focus:outline-yellow-500"
                            />
                        </div>
                    ))}
                    <div className=''>
                        <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                            Preferred Language
                        </label>
                        <select
                            id="language"
                            name="language"
                            onChange={(e) => setSelectedLang(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 bg-white border border-yellow-400 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                        >
                            <option value="English">English</option>
                            <option value="Bangla">Bangla</option>
                            <option value="Hindi">Hindi</option>
                        </select>
                    </div>
                    <div className="col-span-full mt-4 flex justify-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-300"
                        >
                            {loading ? 'Analyzing...' : 'Run AI Diagnosis'}
                        </button>

                    </div>
                </form>

                {bmi && (
                    <div className="mt-6 text-center">
                        <p className="text-lg">
                            📏 <span className="font-semibold">BMI:</span> {bmi}{' '}
                            <span className="ml-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">{status}</span>
                        </p>
                    </div>
                )}
            </div>
            {/* The button to open modal */}
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            {/* <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>open modal</button> */}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">

                <div className="modal-box">
                    <div className='w-[100%] flex justify flex-col-reverse items-center'>
                        <PDFDownloadLink
                            document={
                                <Document>
                                    <Page style={styles.page}>
                                        <Text style={styles.text}>
                                            AI Health Report Summary
                                            {HealthInfo}
                                        </Text>
                                    </Page>
                                </Document>
                            }
                            fileName="health-report.pdf"
                            className="inline-block mt-4 bg-yellow-600 hover:bg-yellow-700 text-black px-4 py-2 rounded"
                        >
                            {({ loading }) => (loading ? 'Preparing PDF...' : 'Download PDF')}
                        </PDFDownloadLink>
                        <h3 className="font-bold text-lg text-yellow-600">🧾 Download Your Health Report</h3>
                    </div>


                    <div className='w-[100%] min-h-[500px] my-4'>
                        {HealthInfo}
                    </div>


                    <form method="dialog" className="mt-6 flex justify-between">
                        <button className="btn btn-sm btn-error">Close</button>
                        <button type='button' onClick={() => handleSaveReport(HealthInfo)} className="btn btn-sm btn-error">Save Report</button>
                    </form>
                </div>

            </dialog>
        </div >
    );
};

export default AIVitalsCard;

