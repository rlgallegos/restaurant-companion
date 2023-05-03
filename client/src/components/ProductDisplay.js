import LogoStripe from "./LogoStripe";

const ProductDisplay = () => (
    <section>
      <div className="product">
        <LogoStripe />
        <div className="description">
          <h3>Starter plan</h3>
          <h5>$25.00 / month</h5>
        </div>
      </div>
      <form action="/../create-checkout-session" method="POST">
        {/* Add a hidden field with the lookup_key of your Price */}
        <input type="hidden" name="lookup_key" value="AX1000-01" />
        {/* <input type="hidden" name="restaurant id" value={}/> */}
        <button id="checkout-and-portal-button" type="submit">
          Checkout
        </button>
      </form>
    </section>
  );



  export default ProductDisplay