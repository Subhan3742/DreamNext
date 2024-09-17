"use client"; // Ensures this component runs on the client-side

import React from 'react';

const Page = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Product List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detail</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">D7</td>
              <td className="px-6 py-4 whitespace-nowrap">2000</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <img src="path/to/dsdsdsds.png" alt="Product Image" className="w-16 h-16 object-cover rounded-md" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">Pedestal</td>
              <td className="px-6 py-4 whitespace-nowrap">Amsama</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Update</button>
                <button className="ml-2 bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">Delete</button>
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
