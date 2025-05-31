import React, { useEffect, useState } from 'react';

import {
  useStripe,
  useElements,
  CardElement,
} from '@stripe/react-stripe-js';
import axiosSecure from '../../Hook/axiosSecure';
import useAuth from '../../Hook/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ price, day,id }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('')
  const [clientSecret, setclientSecret] = useState([])
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigateHome = useNavigate()
  console.log(price, day)
  const AxiosSecure = axiosSecure();
  useEffect(() => {
    AxiosSecure.post('/create-checkout-session', {price: price })
      .then(res => {
        console.log('payment done:', res.data?.clientSecret)
        setclientSecret(res.data?.clientSecret)
      })

  }, [])
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!elements || !stripe) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    setLoading(true)

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      // console.log('[error]', error);
      setError(error)
      setLoading(false)
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setError('')
      setLoading(false)
    }
    // 
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email,// user email// ,
          name: user?.displayName,//user name,
        }
      }
    })
    if (confirmError) {
      console.log('error', confirmError)
    }
    else {
      if (paymentIntent.status === 'succeeded') {
        console.log('paymentIntents:', paymentIntent?.id)
        setLoading(false)
        const history = {
          paymentIntentId: paymentIntent?.id,
          amount: price,
          appointmentDay: day,
          appliedEmail: user?.email,
          appliedName: user?.displayName,
          doctor_id:id,

        }
        AxiosSecure.post('/paymentHistory', history)
          .then(res => {
            console.log('resposn payment:', res.data)
            if (res.data.insertedId) {
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
              });
              navigateHome('/')
            }
          })
      }
    }

  };
  console.log(error)
  // Trigger form validation and wallet collection

  return (
    <form onSubmit={handleSubmit} className='w-[50%] mx-auto my-10 h-[500px]'>
      <CardElement className='h-[100px]'
        options={{
          style: {
            base: {
              fontSize: '16px',
              border: '2px solid #aab7c4',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className='btn w-[150px] bg-amber-200 my-2' type="submit" disabled={!stripe || !elements}>
        {loading ? 'Processing...' : 'Pay'}
      </button>
      {/* Show error message to your customers */}
      {status && <div>{status}</div>}
      <p className='text-red-500 text-xs'>{error.message}</p>
    </form>

  );
}

export default CheckoutForm;