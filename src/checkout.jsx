import { useState } from "react";

export default function Checkout({ cartItems, onComplete }) {
  const [address, setAddress] = useState("");
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleCheckout = () => {
    if (!address.trim()) {
      alert("Please enter your delivery address!");
      return;
    }

    // Simulate order creation
    const order = {
      id: Date.now(),
      cartItems,
      address,
      paymentMethod: "Cash on Delivery",
      status: "Confirmed",
    };

    console.log("Order placed:", order);

    setOrderConfirmed(true);

    if (onComplete) {
      onComplete(order); // optional callback for parent
    }
  };

  if (orderConfirmed) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold text-green-600">Order Confirmed 🎉</h2>
        <p>Your items will be delivered to:</p>
        <p className="font-semibold mt-2">{address}</p>
        <p className="mt-2">Payment Method: <b>Cash on Delivery</b></p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Checkout</h2>

      <ul className="list-disc pl-5 mt-2">
        {cartItems.map((item, idx) => (
          <li key={idx}>{item.name} × {item.quantity}</li>
        ))}
      </ul>

      <textarea
        className="border p-2 w-full mt-3"
        placeholder="Enter your delivery address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <p className="mt-3">Payment Method: <b>Cash on Delivery</b></p>

      <button
        onClick={handleCheckout}
        className="bg-green-600 text-white px-4 py-2 mt-3 rounded"
      >
        Confirm Order
      </button>
    </div>
  );
}