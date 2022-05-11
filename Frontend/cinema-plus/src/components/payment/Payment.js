import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import './payment.scss'

async function handleToken(token){
console.log(token);
}

function Payment() {
  return (
  <StripeCheckout 
  hidden
  stripeKey='pk_test_51KyIycFgS0jlrauJhLe4fMYZyLYW5OoxiZbIpDhL2a1uOI3rKZ8SoOOGwbIK1159D7aM8sdfD4eu3bgoUXZpTTCH00yvx67fmv'
  token={handleToken}
  />
  )
}

export default Payment