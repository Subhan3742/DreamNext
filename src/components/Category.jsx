import React from 'react'; // Corrected import statement
import Image from 'next/image';
import MyImage from '../../public/images/ceiling.png'; // Fixed path
import MyImage1 from '../../public/images/pedestal.png';
import MyImage2 from '../../public/images/exhaust.png';
import MyImage3 from '../../public/images/bracket.png';
import Link from 'next/link';
const Category = () => {
  return (
    <div className="p-4 bg-black">
      <h2 className="text-center text-3xl text-white mb-6">Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {/* Responsive grid items with border, shadow, rounded corners */}
        <div className="flex justify-center items-center">
          <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Link href="products"> <Image src={MyImage} alt="Category 1" className="object-cover w-full h-48" /></Link> 
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Link href="products">    <Image src={MyImage3} alt="Category 2" className="object-cover w-full h-48" /></Link> 
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Link href="products">    <Image src={MyImage1} alt="Category 3" className="object-cover w-full h-48" /></Link> 
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Link href="products">    <Image src={MyImage2} alt="Category 4" className="object-cover w-full h-48" /></Link> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
