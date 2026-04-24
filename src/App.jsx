import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Midnight Chaos Hoodie",
      price: 1999,
      image:
        "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500",
      tag: "BESTSELLER"
    },
    {
      id: 2,
      name: "Oversized Graphic Tee",
      price: 999,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
      tag: "NEW DROP"
    },
    {
      id: 3,
      name: "Urban Cargo Pants",
      price: 2499,
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500",
      tag: "LIMITED"
    }
  ];

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Oops...you bought it again 😭");
  };

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #000000, #1a001a)",
        color: "white",
        minHeight: "100vh",
        fontFamily: "Poppins"
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px 50px",
          alignItems: "center",
          position: "sticky",
          top: 0
        }}
      >
        <h2 style={{ color: "#ff4da6", fontSize: "28px" }}>
          Oops I Bought It Again
        </h2>

        <button
          onClick={() => navigate("/cart")}
          style={{
            background: "#ff4da6",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "25px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          🛒 View Cart
        </button>
      </nav>

      {/* Hero */}
      <section
        style={{
          textAlign: "center",
          padding: "80px 20px"
        }}
      >
        <h1
          style={{
            fontSize: "70px",
            fontWeight: "bold"
          }}
        >
          DRIP NOW.
        </h1>

        <h1
          style={{
            fontSize: "70px",
            color: "#ff4da6"
          }}
        >
          REGRET LATER.
        </h1>

        <p
          style={{
            color: "#bbb",
            fontSize: "20px"
          }}
        >
          Streetwear for impulsive shoppers with dangerously good taste.
        </p>
      </section>

      {/* Product Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: "30px",
          padding: "40px"
        }}
      >
        {products.map((item) => (
          <div
            key={item.id}
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(10px)",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0px 8px 30px rgba(255,77,166,0.2)",
              transition: "0.3s"
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "100%",
                height: "350px",
                objectFit: "cover"
              }}
            />

            <div style={{ padding: "20px" }}>
              <span
                style={{
                  background: "#ff4da6",
                  padding: "5px 10px",
                  borderRadius: "15px",
                  fontSize: "12px"
                }}
              >
                {item.tag}
              </span>

              <h2>{item.name}</h2>

              <p style={{ color: "#ff4da6", fontSize: "20px" }}>
                ₹{item.price}
              </p>

              <button
                onClick={() => addToCart(item)}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "white",
                  color: "black",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "40px",
          color: "#888"
        }}
      >
        Built for people who say “just browsing” and leave with 7 hoodies.
      </footer>
    </div>
  );
}

export default App;
