import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Checkout</h1>

      <PayPalScriptProvider
        options={{
          clientId: "AbLA6pVAidgudz1A5GpyQvTo31HeoBTuEBUK_b1U7qEdZq8iAr44yL2xg4AA-U4b0nddeVCCl5BRpktg"
        }}
      >
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: "50.00"
                  }
                }
              ]
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then(() => {
              navigate("/success");
            });
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}

export default Checkout;