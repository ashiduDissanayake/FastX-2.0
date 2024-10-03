import React from "react";
import img1 from "../../public/shop/img1.jpg";
import img2 from "../../public/shop/img2.jpg";
import img3 from "../../public/shop/img3.jpg";
import img4 from "../../public/shop/img4.jpg";
import img5 from "../../public/shop/img5.jpg";
import img6 from "../../public/shop/img6.jpg";
import img7 from "../../public/shop/img7.jpg";
import img8 from "../../public/shop/img8.jpg";
import img9 from "../../public/shop/img9.jpg";
import img10 from "../../public/shop/img10.jpg";
import img11 from "../../public/shop/img11.jpg";
import img12 from "../../public/shop/img12.jpg";
import img13 from "../../public/shop/img13.jpg";
import img14 from "../../public/shop/img14.jpg";
import img15 from "../../public/shop/img15.jpg";
import img16 from "../../public/shop/img16.jpg";
import img17 from "../../public/shop/img17.jpg";
import img18 from "../../public/shop/img18.jpg";
import img19 from "../../public/shop/img19.jpg";
import img20 from "../../public/shop/img20.jpg";
import img21 from "../../public/shop/img21.jpg";
import img22 from "../../public/shop/img22.jpg";
import img23 from "../../public/shop/img23.jpg";
import img24 from "../../public/shop/img24.jpg";
import img25 from "../../public/shop/img25.jpg";
import img26 from "../../public/shop/img26.jpg";
import img27 from "../../public/shop/img27.jpg";
import img28 from "../../public/shop/img28.jpg";
import img29 from "../../public/shop/img29.jpg";
import img30 from "../../public/shop/img30.jpg";
import img31 from "../../public/shop/img31.jpg";

// Product data with real values
const products = [
  {
    id: 1,
    name: "Encanto Candle",
    price: "$15.99",
    image: img1,
    description:
      "A beautiful Encanto-themed candle that brightens up any room.",
  },
  {
    id: 2,
    name: "Magical Flowers",
    price: "$12.49",
    image: img2,
    description: "These vibrant flowers add a touch of magic to any space.",
  },
  {
    id: 3,
    name: "Colorful Table Runner",
    price: "$25.99",
    image: img3,
    description: "Bring life to your table with this handmade table runner.",
  },
  {
    id: 4,
    name: "Patterned Cushion",
    price: "$18.00",
    image: img4,
    description: "A soft, colorful cushion perfect for any home decor.",
  },
  {
    id: 5,
    name: "Decorative Plate Set",
    price: "$34.99",
    image: img5,
    description: "Set of 4 decorative plates inspired by Encanto's art.",
  },
  {
    id: 6,
    name: "Wall Art - Family Portrait",
    price: "$45.00",
    image: img6,
    description: "A beautiful family portrait wall art in Encanto's style.",
  },
  {
    id: 7,
    name: "Handwoven Basket",
    price: "$29.99",
    image: img7,
    description: "An exquisite handwoven basket, perfect for home storage.",
  },
  {
    id: 8,
    name: "Ceramic Teapot",
    price: "$39.50",
    image: img8,
    description: "Enjoy tea time with this ceramic teapot, crafted with care.",
  },
  {
    id: 9,
    name: "Decorative Throw Blanket",
    price: "$32.99",
    image: img9,
    description: "A soft, warm throw blanket with intricate patterns.",
  },
  {
    id: 10,
    name: "Vintage Lamp",
    price: "$49.99",
    image: img10,
    description: "A vintage-style lamp that brings elegance to any room.",
  },
  {
    id: 11,
    name: "Hand-Painted Mug Set",
    price: "$22.50",
    image: img11,
    description: "Set of 4 hand-painted mugs with unique, colorful designs.",
  },
  {
    id: 12,
    name: "Decorative Vase",
    price: "$27.80",
    image: img12,
    description: "A decorative vase to display fresh or artificial flowers.",
  },
  {
    id: 13,
    name: "Patterned Rug",
    price: "$79.99",
    image: img13,
    description:
      "A large patterned rug that adds a vibrant touch to your home.",
  },
  {
    id: 14,
    name: "Handcrafted Jewelry Box",
    price: "$35.00",
    image: img14,
    description: "A beautiful wooden jewelry box with intricate carvings.",
  },
  {
    id: 15,
    id: 15,
    name: "Colorful Ceramic Bowls",
    price: "$25.99",
    image: img15,
    description: "Set of 6 colorful ceramic bowls for everyday use.",
  },
  {
    id: 16,
    name: "Bluetooth Speaker",
    price: "$49.99",
    image: img16,
    description: "Portable Bluetooth speaker with high-quality sound.",
  },
  {
    id: 17,
    name: "Smartphone Stand",
    price: "$15.99",
    image: img17,
    description: "Adjustable smartphone stand, perfect for video calls.",
  },
  {
    id: 18,
    name: "Noise Cancelling Headphones",
    price: "$89.99",
    image: img18,
    description:
      "Comfortable over-ear headphones with active noise cancellation.",
  },
  {
    id: 19,
    name: "Wireless Mouse",
    price: "$19.99",
    image: img19,
    description: "Ergonomic wireless mouse for smooth and precise control.",
  },
  {
    id: 20,
    name: "Smartwatch",
    price: "$199.99",
    image: img20,
    description: "Stay connected and track your health with this smartwatch.",
  },
  {
    id: 21,
    name: "Electric Kettle",
    price: "$34.99",
    image: img21,
    description:
      "Quickly boil water with this stainless steel electric kettle.",
  },
  {
    id: 22,
    name: "Ceramic Planter Set",
    price: "$35.50",
    image: img22,
    description: "Set of 3 ceramic planters for indoor plants.",
  },
  {
    id: 23,
    name: "Patterned Apron",
    price: "$18.99",
    image: img23,
    description: "A stylish apron with colorful patterns for your kitchen.",
  },
  {
    id: 24,
    name: "Decorative Lantern",
    price: "$40.00",
    image: img24,
    description: "A decorative lantern that creates a cozy atmosphere.",
  },
  {
    id: 25,
    name: "Handcrafted Wooden Tray",
    price: "$28.99",
    image: img25,
    description: "A wooden tray with unique carvings for serving guests.",
  },
  {
    id: 26,
    name: "Glass Pitcher",
    price: "$22.50",
    image: img26,
    description: "A glass pitcher perfect for serving fresh beverages.",
  },
  {
    id: 27,
    name: "Decorative Wall Clock",
    price: "$45.99",
    image: img27,
    description: "A decorative wall clock to accentuate your living room.",
  },
  {
    id: 28,
    name: "Handcrafted Ceramic Pitcher",
    price: "$40.00",
    image: img28,
    description: "A handcrafted ceramic pitcher for serving drinks.",
  },
  {
    id: 29,
    name: "Woven Basket Set",
    price: "$38.99",
    image: img29,
    description: "Set of 3 woven baskets for storage and decoration.",
  },
  {
    id: 30,
    name: "Colorful Wall Tapestry",
    price: "$52.00",
    image: img30,
    description: "A large wall tapestry that brightens up any room.",
  },
  {
    id: 31,
    name: "Digital Photo Frame",
    price: "$79.99",
    image: img31,
    description:
      "Display your favorite memories with this digital photo frame.",
  },
  // Continue adding products until you have 30 or more...
];

const Shop = () => {
  return (
    <div className="bg-gradient-to-r from-purple-200 to-teal-200 min-h-screen p-8">
      <h1 className="text-center text-4xl font-bold mb-8 text-gray-900">
        Shop Our Collection
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                {product.name}
              </h2>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-lg font-bold text-gray-900 mb-4">
                {product.price}
              </p>
              <button className="w-full bg-teal-600 text-white font-medium py-2 rounded hover:bg-teal-700 transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
