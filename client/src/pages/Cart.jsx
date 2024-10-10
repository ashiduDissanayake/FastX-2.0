import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]); // Initialize with an empty array to avoid null issues
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:8080/user/getcart/", {
        withCredentials: true, // Include cookies in the request
      });
      setCart(response.data.cart); // Set cart data (first element is the array of items)
    } catch (error) {
      console.error("Failed to fetch cart", error);
    }
  };

  // Fetch the cart when the component is mounted
  useEffect(() => {
    fetchCart();
  }, []);

  // Remove an item from the cart
  const removeItem = async (productId) => {
    try {
      await axios.delete("http://localhost:8080/user/removecart", {
        data: { productId }, // Send productId in the request body
        withCredentials: true, // Include credentials
      });
      fetchCart();
    } catch (error) {
      console.error("Failed to remove product", error);
    }
  };

  // Update the quantity of an item in the cart
  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return; // Prevent quantity from going below 1
    try {
      await axios.put(
        "http://localhost:8080/user/updatecart",
        {
          productId,
          quantity,
        },
        {
          withCredentials: true, // Include credentials
        }
      );

      fetchCart();
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };

  const updateItemStatus = async (productId, status) => {
    try {
      await axios.put(
        "http://localhost:8080/user/updatecartstatus",
        { productId, status },
        { withCredentials: true }
      );
      fetchCart();
    } catch (error) {
      console.error("Failed to update item status", error);
    }
  };

  const placeOrder = () => {
    // Navigate to product detail page
    navigate(`/placeorder`);
  };

  return (
    <div>
      {cart.length > 0 ? ( // Check if cart data is available and has items
        <div>
          {cart.length === 0 ? ( // Handle empty cart
            <p>Your cart is empty.</p>
          ) : (
            cart.map(
              (
                item // Render cart items
              ) => (
                <div key={item.id} style={{ marginBottom: "20px" }}>
                  {/* Display item image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "100px", height: "100px" }}
                  />
                  {/* Display item name, price, and quantity */}
                  <p>
                    {item.name} - Price: ${item.price} - Quantity:{" "}
                    {item.quantity}
                  </p>
                  {item.status === "Active" && (
                    <button
                      onClick={() => updateItemStatus(item.id, "Selected")}
                    >
                      Select for Order
                    </button>
                  )}
                  {item.status === "Selected" && (
                    <button onClick={() => updateItemStatus(item.id, "Active")}>
                      Unselect
                    </button>
                  )}
                  {/* Action buttons for remove and quantity adjustment */}
                  <button onClick={() => removeItem(item.id)}>Remove</button>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    Increase
                  </button>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    Decrease
                  </button>
                </div>
              )
            )
          )}
          <button onClick={placeOrder}>Buy Selected Items</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Cart;
