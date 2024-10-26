import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sliders, 
  Sparkles, 
  TrendingUp, 
  Filter,
  X,
  ChevronDown,
  Star
} from "lucide-react";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("new");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const observer = useRef();
  const navigate = useNavigate();

  const categories = {
    frocks: ["Casual", "Party", "Traditional", "Summer"],
    denims: ["Jeans", "Jackets", "Skirts", "Shorts"],
    accessories: ["Jewelry", "Bags", "Scarves", "Belts"],
    menswear: ["Shirts", "Pants", "Suits", "Casual"]
  };

  const lastProductRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [activeTab, selectedCategory, selectedSubCategory, sortBy]);

  useEffect(() => {
    fetchProducts();
  }, [page, activeTab, selectedCategory, selectedSubCategory, sortBy]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8080/user/${activeTab === 'new' ? 'new_arrivals' : 'trending'}?page=${page}&limit=20&category=${selectedCategory}&subcategory=${selectedSubCategory}&sortBy=${sortBy}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      // Handle both array and object responses
      const newProducts = Array.isArray(data) ? data : (data.products || []);
      const hasMoreProducts = data.hasMore !== undefined ? data.hasMore : newProducts.length === 20;

      setProducts(prev => {
        const combinedProducts = [...prev, ...newProducts];
        // Remove duplicates based on product_ID
        return Array.from(new Map(combinedProducts.map(item => [item.product_ID, item])).values());
      });
      setHasMore(hasMoreProducts);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError("Failed to load products");
      setLoading(false);
    }
  };

  const getRandomSize = () => {
    const sizes = [
      { height: "h-64", span: "row-span-1" },
      { height: "h-96", span: "row-span-2" },
      { height: "h-80", span: "row-span-2" }
    ];
    return sizes[Math.floor(Math.random() * sizes.length)];
  };

  const ProductCard = ({ product, isLast }) => {
    const { height, span } = getRandomSize();
    const ref = isLast ? lastProductRef : null;

    return (
      <motion.div
        ref={ref}
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`group relative ${span} break-inside-avoid mb-6`}
        whileHover={{ y: -5 }}
        onClick={() => navigate(`/product/${product.product_ID}`)}
      >
        <div className="bg-gray-900 rounded-lg overflow-hidden border border-pink-300/20 hover:border-pink-300/40 transition-colors h-full">
          <div className="relative">
            <img 
              src={product.image_link} 
              alt={product.product_Name}
              className={`w-full ${height} object-cover transition-transform group-hover:scale-105`}
            />
            {product.isNew && (
              <div className="absolute top-2 right-2 bg-pink-500 text-white px-2 py-1 rounded-full text-xs">
                NEW
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-pink-300 mb-1">{product.product_Name}</h3>
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
      </motion.div>
    );
  };

  // ... (keeping the Dropdown, TabButton, and FilterPanel components the same)


const Dropdown = ({ value, options, onChange, placeholder, isOpen, setIsOpen }) => (
  <div className="relative">
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="w-full bg-gray-800 text-left px-4 py-2 rounded-lg border border-pink-300/20 hover:border-pink-300/40 flex justify-between items-center"
    >
      <span className="text-pink-100">{value === "all" ? placeholder : value || placeholder}</span>
      <ChevronDown className={`w-4 h-4 text-pink-300 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    
    {isOpen && (
      <div className="absolute z-50 w-full mt-2 bg-gray-800 border border-pink-300/20 rounded-lg shadow-xl">
        <div className="py-1">
          <button
            onClick={() => {
              onChange("all");
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-left text-pink-100 hover:bg-pink-500/10"
          >
            All {placeholder}s
          </button>
          {Object.keys(options).map(option => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-pink-100 hover:bg-pink-500/10"
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </div>
    )}
  </div>
);

const TabButton = ({ value, active, onClick, children }) => (
  <button
    onClick={() => onClick(value)}
    className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
      active ? 'bg-pink-500 text-white' : 'text-pink-300 hover:bg-pink-500/10'
    }`}
  >
    {children}
  </button>
);

const FilterPanel = () => (
  <motion.div
    className="fixed inset-y-0 right-0 w-80 bg-gray-900 shadow-lg p-6 pt-20 border-l border-pink-300/20 overflow-y-auto"
    initial={{ x: 300 }}
    animate={{ x: isFilterOpen ? 0 : 300 }}
    transition={{ type: "spring", stiffness: 100 }}
  >
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold text-pink-300">Filters</h2>
      <button 
        onClick={() => setIsFilterOpen(false)}
        className="text-pink-300 hover:text-pink-400"
      >
        <X className="w-6 h-6" />
      </button>
    </div>

    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium text-pink-200 mb-2 block">
          Category
        </label>
        <Dropdown
          value={selectedCategory}
          options={categories}
          onChange={setSelectedCategory}
          placeholder="Category"
          isOpen={isCategoryOpen}
          setIsOpen={setIsCategoryOpen}
        />
      </div>

      {selectedCategory !== "all" && (
        <div>
          <label className="text-sm font-medium text-pink-200 mb-2 block">
            Sub-Category
          </label>
          <Dropdown
            value={selectedSubCategory}
            options={{ ...categories[selectedCategory].reduce((acc, curr) => ({...acc, [curr.toLowerCase()]: [curr]}), {}) }}
            onChange={setSelectedSubCategory}
            placeholder="Sub-Category"
            isOpen={isSubCategoryOpen}
            setIsOpen={setIsSubCategoryOpen}
          />
        </div>
      )}

      <div>
        <label className="text-sm font-medium text-pink-200 mb-2 block">
          Sort By
        </label>
        <Dropdown
          value={sortBy}
          options={{
            newest: ["Newest First"],
            price_low: ["Price: Low to High"],
            price_high: ["Price: High to Low"],
            popular: ["Most Popular"],
            rating: ["Highest Rated"]
          }}
          onChange={setSortBy}
          placeholder="Sort by"
          isOpen={isSortOpen}
          setIsOpen={setIsSortOpen}
        />
      </div>

      <button 
        onClick={() => {
          fetchFilteredProducts();
          setIsFilterOpen(false);
        }}
        className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
      >
        Apply Filters
      </button>
    </div>
  </motion.div>
);



  return (
    <div className="min-h-screen bg-black text-pink-100 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-pink-300">Fashion Collection</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-gray-900 px-4 py-2 rounded-lg border border-pink-300/20 hover:border-pink-300/40"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="w-5 h-5 text-pink-300" />
            <span>Filters</span>
          </motion.button>
        </div>

        <div className="space-y-8">
          <div className="flex space-x-4 bg-gray-900 p-1 rounded-lg w-fit">
            <TabButton value="new" active={activeTab === "new"} onClick={setActiveTab}>
              <Sparkles className="w-4 h-4" />
              <span>New Arrivals</span>
            </TabButton>
            <TabButton value="trending" active={activeTab === "trending"} onClick={setActiveTab}>
              <TrendingUp className="w-4 h-4" />
              <span>Trending</span>
            </TabButton>
          </div>

          {error ? (
            <div className="text-center py-12 text-pink-300">{error}</div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-4 gap-6">
              <AnimatePresence>
                {products.map((product, index) => (
                  <ProductCard 
                    key={product.product_ID} 
                    product={product} 
                    isLast={index === products.length - 1}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
          
          {loading && (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-pink-300 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          )}
        </div>
      </div>

      <FilterPanel />
    </div>
  );
};

export default Shop;