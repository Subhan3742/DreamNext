"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Page = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null); // State for error messages

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/order");
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        setError('Failed to load data.');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Data</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>} {/* Display error message */}
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Address</th>
            <th className="py-2 px-4">Phone</th>
            <th className="py-2 px-4">City</th>
            <th className="py-2 px-4">Product Detail</th>
            <th className="py-2 px-4">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-4 text-center">No data available</td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">{item.email}</td>
                <td className="py-2 px-4">{item.address}</td>
                <td className="py-2 px-4">{item.phone}</td>
                <td className="py-2 px-4">{item.city}</td>
                <td className="py-2 px-4">{item.productDetail}</td>
                <td className="py-2 px-4">{item.total}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
