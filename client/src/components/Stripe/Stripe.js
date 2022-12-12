import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./Stripe.module.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51MDwOzLxRR95VfmdkLOsa1t6BAbOrB4WRPf5gEUILQlld2gHDnCrfm8wYZvk1Vfij4lwgexoX6okdMCasLWkyjOD00yg2Sl4co");

export default function App() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

// import { useEffect, useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import CheckoutForm from "./CheckoutForm";
// import { Elements } from "@stripe/react-stripe-js";

// function Payment(props) {
//     const [stripePromise, setStripePromise] = useState(null);
//     const [clientSecret, setClientSecret] = useState("");

//     useEffect(() => {
//         fetch("/config").then (async (r) => {
//             const { publishableKey } = await r.json();

//             setStripePromise(loadStripe(publishableKey));
//         })
//     })

//     useEffect(() => {
//         fetch("/create-payment-intent", {
//             method: "POST",
//             body: JSON.stringify({}),
//         }).then (async (r) => {
//             const { clientSecret } = await r.json();

//             setClientSecret(clientSecret);
//         })
//     })


//   return (
//     <div className="App">
//       {clientSecret && stripePromise && (
//         <Elements options={clientSecret} stripe={stripePromise}>
//           <CheckoutForm />
//         </Elements>
//       )}
//     </div>
//   );
// }

// export default Payment;