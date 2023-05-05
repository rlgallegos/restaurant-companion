import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";


import ProductDisplay from "./ProductDisplay";
import SuccessDisplay from "./SuccessDisplay";


// Almost certain this component is now orphaned


// Component message
const Message = ({ message }) => (
    <section>
      <p>{message}</p>
    </section>
  );

function ManageSubscriptionResult() {
    let [message, setMessage] = useState('');
    let [success, setSuccess] = useState(false);
    // let [sessionId, setSessionId] = useState('');

    // useEffect(() => {
    //     // Check to see if this is a redirect back from Checkout
    //     const query = new URLSearchParams(window.location.search);
    //     // if (query.get('success')) {
    //     //   setSuccess(true);
    //     //   setSessionId(query.get('session_id'));
          
    //     // }
    //   //   if (query.get('canceled')) {
    //   //     setSuccess(false);
    //   //     setMessage(
    //   //       "Order canceled. You have not been charged."
    //   //     );
    //   //   }
    //   }, [sessionId]);

      // if (success && sessionId !== '') {
      //   return <SuccessDisplay sessionId={sessionId} />;
      // } 


      // if (!success && message === '') {
      //   return <ProductDisplay />;
      // } 
      // else {
        return <Message message={message} />;
      // }
    


}
export default ManageSubscriptionResult