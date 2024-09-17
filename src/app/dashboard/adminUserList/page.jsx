"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Page = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/adminUser");
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/adminUser/${id}`);

      if (response.status === 200) {
        setData(data.filter(item => item.id !== id));
      } else {
        console.error('Failed to delete item:', response.data);
      }
    } catch (error) {
      console.error('Error deleting item:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="p-4">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 text-gray-600">
            <th className="px-4 py-2 border-b">Email</th>
            <th className="px-4 py-2 border-b">Password</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b text-center">{item.email}</td>
              <td className="px-4 py-2 border-b text-center">{item.password}</td>
              <td className="px-4 py-2 border-b text-center">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
