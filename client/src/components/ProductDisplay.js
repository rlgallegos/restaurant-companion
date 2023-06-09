
function ProductDisplay() { 
    const tailwindCSSDiv = "bg-gray-100 bg-opacity-80 rounded-md shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 p-12 my-10 flex flex-col mx-auto"
    const tailwindCSSButton = "my-1 text-m flex-grow text-gray-700 border border-gray-400 rounded-md px-4 py-2 hover:bg-gray-300 hover:text-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105"
    const tailwindCSSSubTitle = "text-xl font-bold flex-grow text-gray-700 my-4"
    const tailwindCSSSP = "ml-2 my-4 md:my-2 text-m flex-grow text-gray-600 text-center"


    return (
    <div className={tailwindCSSDiv}>
        {/* Currently just the one, but scalably written, just add other options with price values */}
        <div className="product">
            <div className="description">
                <h3 className={tailwindCSSSubTitle}>Monthly Renwal Plan</h3>
                <h5 className={tailwindCSSSP}>$25.00 / month</h5>
            </div>
        </div>
        <form action="/../create-checkout-session" method="POST">
            {/* hidden field with the lookup_key of the price option */}
            <input type="hidden" name="lookup_key" value="AX1000-01" />
            <button className={tailwindCSSButton} type="submit">Subscribe via Stripe</button>
        </form>
    </div>
  )
}
  export default ProductDisplay