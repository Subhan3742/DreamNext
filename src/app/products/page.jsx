"use client";
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useCardContext } from '@/store/CardContext';

const Page = () => {
  const [categoryValue, setCategoryValue] = useState("All");
  const categories = ["ceiling", "pedestal", "bracket", "exhaust"];
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const { setCards } = useCardContext(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/post");
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
      }
    };

    fetchData();
  }, []);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };
  setCards(cart);

  return (
    <div className="p-4 bg-gray-100">
      {/* Category Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setCategoryValue(category)}
            className={`px-4 py-2 rounded-md text-white font-semibold ${category === categoryValue ? 'bg-blue-600' : 'bg-blue-400'} hover:bg-blue-500 transition-colors duration-300`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data
          .filter(item => categoryValue === "All" || item.category === categoryValue)
          .map((item) => (
            <div key={item.id} className="shadow-lg border border-gray-200 bg-white rounded-lg overflow-hidden">
              {/* Product Image */}
              <div className="relative w-full h-60">
                <Image
                  src={`/uploads/${item.image}`} // Path relative to the public directory
                  alt={item.name || "Product image"}
                  fill
                  style={{ objectFit: 'cover' }} // Ensure the image covers the container
                />
              </div>

              {/* Product Details */}
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{item.name}</div>
                <div className="font-semibold text-lg text-gray-900">RS {item.price}</div>
                <button
                  onClick={() => addToCart(item)}
                  className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-300"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Page;
