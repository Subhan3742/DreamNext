"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import MyImage from '../../Public/images/nav.png';
import Link from 'next/link';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white ">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex flex-shrink-0 items-center">
            <Image className="h-14 w-48" src={MyImage} alt="Dream Fans" />
          </div>

          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex space-x-4">
            <Link href="/" className="rounded-md px-3 py-2 text-lg font-medium text-black hover:bg-gray-700 hover:text-white" aria-current="page">
              Home
            </Link>
            <Link href="/products" className="rounded-md px-3 py-2 text-lg font-medium text-black hover:bg-gray-700 hover:text-white">
              Products
            </Link>
            <Link href="/cart" className="rounded-md px-3 py-2 text-lg font-medium text-black hover:bg-gray-700 hover:text-white">
              Cart
            </Link>
            <Link href="/contact" className="rounded-md px-3 py-2 text-lg font-medium text-black hover:bg-gray-700 hover:text-white">
              Contact Us
            </Link>
            <Link href="/about" className="rounded-md px-3 py-2 text-lg font-medium text-black hover:bg-gray-700 hover:text-white">
              About Us
            </Link>
            <Link href="/policy" className="rounded-md px-3 py-2 text-lg font-medium text-black hover:bg-gray-700 hover:text-white">
              Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link href="/" className="block rounded-md px-3 py-2 text-lg font-medium text-black hover:bg-gray-700 hover:text-white">
            Home
          </Link>
          <Link href="/cart" className="block rounded-md px-3 py-2 text-lg font-medium text-black hover:bg-gray-700 hover:text-white">
            Cart
          </Link>
          <Link href="/contact" className="block rounded-md px-3 py-2 text-lg font-medium text-black hover:bg-gray-700 hover:text-white">
            Contact Us
          </Link>
          <Link href="/about" className="block rounded-md px-3 py-2 text-lg font-medium text-black hover:bg-gray-700 hover:text-white">
            About Us
          </Link>
          <Link href="/policy" className="block rounded-md px-3 py-2 text-lg font-medium text-black hover:bg-gray-700 hover:text-white">
            Policy
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
