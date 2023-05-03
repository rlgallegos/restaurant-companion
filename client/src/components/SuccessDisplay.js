import LogoStripe from "./LogoStripe";

const SuccessDisplay = ({ sessionId }) => {

    
    return (
      <section>
        <div className="product Box-root">
          <LogoStripe />
          <div className="description Box-root">
            <h3>Subscription to monthly plan successful!</h3>
          </div>
        </div>
        <form action="/create-portal-session" method="POST">
          <input
            type="hidden"
            id="session-id"
            name="session_id"
            value={sessionId}
          />
          <button id="checkout-and-portal-button" type="submit">
            Manage your billing information
          </button>
        </form>
      </section>
    );
  };

  export default SuccessDisplay