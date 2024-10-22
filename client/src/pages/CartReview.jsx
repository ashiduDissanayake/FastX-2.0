import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CartReview = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Load cart from local storage instead of making an API call
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(localCart);
    }, []);

    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div>
            {cartItems.map((item, index) => (
                <div key={index}>
                    <img src={item.imageLink} alt={item.productName} />
                    <p>{item.productName}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price * item.quantity}</p>
                </div>
            ))}
            <button onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
    );
};

export default CartReview;
