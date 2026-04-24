import products from "../data/products";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const addToCart = (product) => {
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    alert("Oops...another hoodie?");
  };

  return (
    <div>
      <h1>Oops I Bought It Again</h1>
      <h2>Your wallet said no. Your cart said yes.</h2>

      <div className="products">
        {products.map((item) => (
          <div key={item.id}>
            <img src={item.image} width="200" />
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <button onClick={() => addToCart(item)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <button onClick={() => navigate("/cart")}>
        Go to Cart
      </button>
    </div>
  );
}

export default Home;