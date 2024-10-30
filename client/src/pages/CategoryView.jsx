import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Filter, Star } from 'lucide-react';

const CategoryView = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categoryConfig = {
    frocks: {
        title: "",
        description: "",
      subCategories: ["Casual", "Party", "Traditional", "Summer"],
      bannerImage: "/Catbanner/1.png"
    },
    denims: {
      title: "",
      description: "",
      subCategories: ["Jeans", "Jackets", "Skirts", "Shorts"],
      bannerImage: "/Catbanner/3.png"
    },
    accessories: {
        title: "",
        description: "",
      subCategories: ["Jewelry", "Bags", "Scarves", "Belts"],
      bannerImage: "/Catbanner/4.png"
    },
    menswear: {
        title: "",
        description: "",
      subCategories: ["Shirts", "Pants", "Suits", "Casual"],
      bannerImage: "/Catbanner/2.png"
    }
  };

  const currentCategory = categoryConfig[category.toLowerCase()];

  useEffect(() => {
    fetchProducts();
  }, [category, selectedSubCategory, sortBy]);

 const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        category: category,
        subcategory: selectedSubCategory,
        sortBy: sortBy,
        limit: '20',
        page: 1
      });

      const response = await fetch(
        `http://localhost:8080/user/filter?${params}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setProducts(prev => {
        const combinedProducts = [...prev, ...data];
        // Remove duplicates based on product_ID
        return Array.from(new Map(combinedProducts.map(item => [item.product_ID, item])).values());
      });
      setLoading(false);
    } catch (err) {
      console.error('Error fetching filtered products:', err);
      setError("Failed to load filtered products");
      setLoading(false);
    }
  };

  const FilterPanel = () => (
    <div className={`fixed inset-y-0 right-0 w-80 bg-gray-900 shadow-lg p-6 transform ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-pink-300 mb-4">Sub Categories</h3>
          <div className="space-y-2">
            {currentCategory.subCategories.map((subCat) => (
              <button
                key={subCat}
                onClick={() => setSelectedSubCategory(subCat.toLowerCase())}
                className={`w-full px-4 py-2 rounded-lg text-left ${
                  selectedSubCategory === subCat.toLowerCase()
                    ? 'bg-pink-500 text-white'
                    : 'text-pink-300 hover:bg-pink-500/10'
                }`}
              >
                {subCat}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-pink-300 mb-4">Sort By</h3>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full bg-gray-800 text-pink-300 px-4 py-2 rounded-lg border border-pink-300/20"
          >
            <option value="newest">Newest First</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>
    </div>
  );

  const ProductCard = ({ product }) => {
    const cleanImageLink = product.image_link
  .replace(/^".\/?/, '/public/')
  .replace(/"$/, ''); // Ensure no trailing slash at the end if present

  
    return (
      <div className="bg-gray-900 rounded-lg overflow-hidden border border-pink-300/20 hover:border-pink-300/40 transition-all hover:-translate-y-1">
        <img
          src={cleanImageLink}
          alt={product.name}
          className="w-full h-72 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-pink-300">{product.name}</h3>
          <p className="text-sm text-pink-100/70 mb-2">{product.brand}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-pink-400">${product.price}</span>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-pink-300 fill-current" />
              <span className="text-sm text-pink-100">{product.rating}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  

  return (
    <div className="min-h-screen bg-black text-pink-100 pt-16">
      {/* Category Banner */}
      <div className="relative h-96 mb-8">
        <img
          src={currentCategory.bannerImage}
          alt={currentCategory.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center p-4">
          <h1 className="text-5xl font-bold text-pink-300 mb-4">{currentCategory.title}</h1>
          <p className="text-xl text-pink-100/80 max-w-2xl">{currentCategory.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-pink-300 ptx">
              {selectedSubCategory === 'all' 
                ? 'All Products' 
                : `${selectedSubCategory.charAt(0).toUpperCase() + selectedSubCategory.slice(1)} Collection`}
            </h2>
          </div>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center space-x-2 bg-gray-900 px-4 py-2 rounded-lg border border-pink-300/20 hover:border-pink-300/40"
          >
            <Filter className="w-5 h-5 text-pink-300 " />
            <span>Filters</span>
          </button>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-16 h-16 border-4 border-pink-300 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-pink-300">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <FilterPanel />
    </div>
  );
};

export default CategoryView;