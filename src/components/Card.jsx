"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useCardContext } from '@/store/CardContext'; // Import useCardContext from your store

const Card = () => {
  const [data, setData] = useState([]);
  const { cards, setCards } = useCardContext(); // Access cart context

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
    setCards([...cards, item]); // Add item to cart
    alert(`${item.name} added to cart successfully!`); // Show alert with success message
  };

  return (
    <div className="p-5">
      <h2 className='text-center text-3xl py-5'>Trending Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((item) => (
          <div key={item.id} className="shadow-lg border border-gray-200 bg-white">
            {/* Product Image */}
            <div className="relative w-full h-60">
              <Image
                src={`/uploads/${item.image}`} // Path relative to the public directory
                alt={item.name || "Product image"}
                layout="fill"
                objectFit="cover" // Ensure the image covers the container
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

export default Card;
