import React, { useState } from 'react';
import axios from 'axios';

const Checkout = () => {
    const [paymentProcessed, setPaymentProcessed] = useState(false);
    const [orderId, setOrderId] = useState(null);

    const handlePayment = async () => {
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        const amount = localCart.reduce((total, item) => total + item.price * item.quantity, 0);

        const { data } = await axios.post('http://localhost:8080/user/payment', { amount }, { withCredentials: true });
        if (data.status === 'success') {
            // Send local cart to the server to place the order
            const orderResponse = await axios.post('http://localhost:8080/user/placeorder', {
                transactionId: data.transactionId,
                cartItems: localCart
            }, { withCredentials: true });

            localStorage.removeItem("cart"); // Clear cart from local storage after order
            setOrderId(orderResponse.data.orderId);
            setPaymentProcessed(true);
        } else {
            alert('Payment failed. Please try again.');
        }
    };

    return (
        <div>
            {paymentProcessed ? (
                <p>Order Confirmed! Your order ID is {orderId}.</p>
            ) : (
                <button onClick={handlePayment}>Pay Now</button>
            )}
        </div>
    );
};

export default Checkout;
