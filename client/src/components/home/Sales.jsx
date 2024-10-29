import React, { useState } from "react";
import { Link } from "react-router-dom";

// Replace with your own images or real links
const categories = [
  {
    name: "Frocks",
    image:
      "https://aanswr.com/cdn/shop/products/PhotoshootSept230358-Edit_1_1080x.jpg?v=1633939224",
    link: "/shop/frocks",
  },
  {
    name: "Denims",
    image:
      "https://www.curateshop.co.uk/cdn/shop/files/5414816609077_BW242924K1014S_STRIPEA_3_950x_2x_6f1961e1-e294-4f1f-9323-4c94e26bb9a1_590x.webp?v=1724252482",
    link: "/shop/denims",
  },
  {
    name: "Accessories",
    image:
      "https://www.curateshop.co.uk/cdn/shop/collections/Screenshot_2021-11-09_at_20.30.16_2048x.png?v=1637268698",
    link: "/shop/accessories",
  },
  {
    name: "Menswear",
    image:
      "https://www.curateshop.co.uk/cdn/shop/collections/Screenshot_2023-07-24_at_14.01.22_2048x.png?v=1699879038",
    link: "/shop/menswear",
  },
];

export default function CategoryView() {
  const [email, setEmail] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("access_key", "c3794d33-5403-4aa1-9cec-6aa2b4260d1a");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      alert(`You have successfully subscribed to ${email}`);
    } else {
      alert("Subscription failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="w-full h-[90vh] bg-black flex flex-col justify-center items-center text-center">
        <h1 className="text-6xl font-bold text-pink-500 tracking-wide font-[Monterest]">
          VogueNest
        </h1>
        <p className="mt-4 text-2xl font-light text-gray-400">
          <em>"Where Style Meets Comfort, and Fashion Finds Home."</em>
        </p>
        <Link
          to="/shop"
          className="mt-8 px-8 py-3 bg-pink-500 text-white rounded-full font-medium hover:bg-pink-600 transition duration-300"
        >
          Shop Now
        </Link>
      </div>

      {/* Category Section */}
      <div className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-10 lg:px-24">
        {categories.map((category, index) => (
          <div
            key={index}
            className="w-full h-[400px] relative group overflow-hidden rounded-xl shadow-lg"
          >
            <Link to={category.link}>
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h2 className="text-3xl font-bold text-pink-400 tracking-wide">
                  {category.name}
                </h2>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Exclusive Deals Section */}
      <div className="py-16 bg-gray-900">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white">
            Exclusive Deals for You
          </h2>
          <p className="text-gray-400 mt-4">
            Handpicked collections with limited-time offers.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 lg:px-24">
          <div className="relative bg-pink-500 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-white">Summer Collection</h3>
            <p className="text-white mt-2">
              Up to 50% off on our best summer styles.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-block px-6 py-2 bg-white text-pink-500 rounded-full font-medium hover:bg-gray-100 transition"
            >
              Shop Now
            </Link>
          </div>
          <div className="relative bg-black border-2 border-pink-500 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-white">New Arrivals</h3>
            <p className="text-white mt-2">
              Discover the latest trends in fashion.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-block px-6 py-2 bg-pink-500 text-white rounded-full font-medium hover:bg-pink-600 transition"
            >
              Explore
            </Link>
          </div>
          <div className="relative bg-pink-500 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-white">Flash Sale</h3>
            <p className="text-white mt-2">
              Limited time offers on best-selling products.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-block px-6 py-2 bg-white text-pink-500 rounded-full font-medium hover:bg-gray-100 transition"
            >
              Grab Now
            </Link>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-16 bg-black text-center">
        <h2 className="text-4xl font-bold text-white">Join Our Newsletter</h2>
        <p className="text-gray-400 mt-4">
          Stay updated with the latest trends and exclusive offers.
        </p>
        <form onSubmit={onSubmit} className="mt-8 flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-6 py-3 w-80 bg-gray-800 text-white rounded-l-full border-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-pink-500 text-white rounded-r-full font-medium hover:bg-pink-600 transition duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
