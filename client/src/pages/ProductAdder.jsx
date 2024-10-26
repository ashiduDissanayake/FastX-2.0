import React, { useState } from 'react';
import axios from 'axios';

const ProductAdder = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [weight, setWeight] = useState('');
  const [volume, setVolume] = useState('');
  const [availableQty, setAvailableQty] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('all');
  const [subcategory, setSubcategory] = useState('all');
  const [file, setFile] = useState(null);

  const categories = {
    frocks: ["Casual", "Party", "Traditional", "Summer"],
    denims: ["Jeans", "Jackets", "Skirts", "Shorts"],
    accessories: ["Jewelry", "Bags", "Scarves", "Belts"],
    menswear: ["Shirts", "Pants", "Suits", "Casual"]
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if an image is selected
    if (!file) {
      alert('Please upload an image');
      return;
    }

    try {
      // First upload the image
      const formData = new FormData();
      formData.append('file', file);

      const uploadResponse = await axios.post('http://localhost:8080/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const imagePath = uploadResponse.data.filePath;

      // After image upload, prepare the product data
      const newProduct = {
        productName,
        price,
        weight,
        volume,
        availableQty,
        description,
        category,
        subcategory,
        image_link: imagePath
      };

      // Submit the product details
      await axios.post('http://localhost:8080/admin/addProduct', newProduct, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className='mt-28 ml-20'>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Weight:</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Volume:</label>
          <input
            type="number"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Available Quantity:</label>
          <input
            type="number"
            value={availableQty}
            onChange={(e) => setAvailableQty(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="all">Select Category</option>
            {Object.keys(categories).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {category !== 'all' && (
          <div>
            <label>Subcategory:</label>
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              required
            >
              <option value="all">Select Subcategory</option>
              {categories[category].map((sub) => (
                <option key={sub} value={sub.toLowerCase()}>{sub}</option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label>Upload Product Image:</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductAdder;
