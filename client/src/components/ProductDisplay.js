import { useState } from "react";
import LogoStripe from "./LogoStripe";

function ProductDisplay() { 
    const tailwindCSSDiv = "bg-blue-900 bg-opacity-90 rounded-md shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 p-12 my-10 flex flex-col mx-auto"
    const tailwindCSSButton = "m-auto sm:m-4 my-8 text-m flex-grow text-gray-100 border border-blue-400  rounded-md px-4 py-2 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out"

    // const [isLoading, setIsLoading] = useState(false)
    
    // function handleClick() {
    //     setIsLoading(true)
    //     fetch('/create-checkout-session', {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: "Create checkout session"
    //     })
    //     .then(res => {
    //         if (res.ok){
    //             res.json().then(data => console.log(data))
    //         }
    //     })
    // }



    return (
    <div className={tailwindCSSDiv}>
        <div className="product">
            {/* <LogoStripe /> */}
            <div className="description">
                <h3 className="text-2xl text-gray-100">Monthly Renwal plan</h3>
                <h5 className="text-md text-gray-100">$25.00 / month</h5>
            </div>
        </div>
        {/* {!isLoading ? <button className={tailwindCSSButton} onClick={handleClick} type="submit">Subscribe via Stripe</button> : <p className="mt-4 text-md text-gray-100">Loading Portal...</p>} */}
        <form action="/../create-checkout-session" method="POST">
            {/* hidden field with the lookup_key of your Price */}
            <input type="hidden" name="lookup_key" value="AX1000-01" />
            <button className={tailwindCSSButton} type="submit">Subscribe via Stripe</button>
        </form>
    </div>
  )
}
  export default ProductDisplay