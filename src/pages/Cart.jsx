import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div>
      <h1>Your Cart</h1>

      {cart.map((item, index) => (
        <div key={index}>
          <h3>{item.name}</h3>
          <p>₹{item.price}</p>
        </div>
      ))}

      <h2>Total: ₹{total}</h2>

      <button onClick={() => navigate("/checkout")}>
        Checkout
      </button>
    </div>
  );
}

export default Cart;