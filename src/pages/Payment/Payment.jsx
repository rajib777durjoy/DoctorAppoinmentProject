
import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';


const Payment = () => {
    const {value} =useParams()
    const price= value.split(',')[1];
    const day= value.split(',')[0];
    const id = value.split(',')[2];
    console.log('values:',value)
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY);

    const options = {
        mode: 'payment',
        amount: 1099,
        currency: 'usd',
        // Fully customizable with appearance API.
        appearance: {
            /*...*/
        },
    };
    return (
        <div className='w-[80%] mx-auto'>
            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm price={price} day={day} id={id} />
            </Elements>
        </div>

    );
};

export default Payment;