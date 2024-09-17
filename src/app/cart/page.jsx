"use client";
import React, { useState, useEffect } from 'react';
import { useCardContext } from '@/store/CardContext';
import Image from 'next/image';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  address: Yup.string().required('Address is required'),
  phone: Yup.string().required('Phone number is required'),
  city: Yup.string().required('City is required'),
  productDetail: Yup.string().required('Product details are required'),
  total: Yup.number().required('Grand total is required').positive()
});

const Page = () => {
  const { cards, setCards } = useCardContext(); // Get cart items and setter from context
  const [quantities, setQuantities] = useState(cards.map(() => 1)); // Initialize quantities
  const [grandTotal, setGrandTotal] = useState(0);
  const [showForm, setShowForm] = useState(false); // State to toggle the form display

  useEffect(() => {
    // Calculate the grand total whenever cards or quantities change
    const calculateGrandTotal = () => {
      const total = cards.reduce((sum, item, index) => {
        return sum + item.price * quantities[index];
      }, 0);
      setGrandTotal(total);
    };

    calculateGrandTotal();
  }, [cards, quantities]);

  const incrementQuantity = (index) => {
    setQuantities(quantities.map((q, i) => (i === index ? q + 1 : q)));
  };

  const decrementQuantity = (index) => {
    setQuantities(quantities.map((q, i) => (i === index && q > 1 ? q - 1 : q)));
  };

  const removeItem = (index) => {
    setCards(cards.filter((_, i) => i !== index));
    setQuantities(quantities.filter((_, i) => i !== index));
  };

  // Prepare product details for hidden field
  const productDetails = cards.map((item, index) => ({
    productName: item.name,
    quantity: quantities[index]
  }));

  return (
    <div className="p-4 bg-gray-100">
      {showForm ? (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Checkout</h2>
          <Formik
            initialValues={{
              name: '',
              email: '',
              address: '',
              phone: '',
              city: '',
              productDetail: JSON.stringify(productDetails), // Hidden field for product details
              total: grandTotal // Hidden field for grand total
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const addUser = {
                  name: values.name,
                  email: values.email,
                  address: values.address,
                  phone: values.phone,
                  city: values.city,
                  productDetail: values.productDetail,
                  total: values.total
                };

                const response = await fetch("/api/order", {
                  method: "POST",
                  body: JSON.stringify(addUser),
                  headers: {
                    "Content-Type": "application/json",
                  },
                });

                const result = await response.json();

                if (!response.ok) {
                  console.error(result.error);
                } else {
                  // Show success alert
                  alert('Your order has been placed successfully!');
                  setShowForm(false); // Hide form on successful submission
                  setCards([]); // Clear cart items
                }
              } catch (error) {
                console.error("An error occurred:", error);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {() => (
              <Form>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2" htmlFor="name">Name</label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-600 text-sm mt-1" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2" htmlFor="email">Email</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2" htmlFor="address">Address</label>
                  <Field
                    type="text"
                    id="address"
                    name="address"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage name="address" component="div" className="text-red-600 text-sm mt-1" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2" htmlFor="phone">Phone Number</label>
                  <Field
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage name="phone" component="div" className="text-red-600 text-sm mt-1" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2" htmlFor="city">City</label>
                  <Field
                    type="text"
                    id="city"
                    name="city"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage name="city" component="div" className="text-red-600 text-sm mt-1" />
                </div>

                {/* Hidden fields */}
                <Field type="hidden" name="productDetail" value={JSON.stringify(productDetails)} />
                <Field type="hidden" name="total" value={grandTotal} />

                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                  >
                    Back to Cart
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4">Image</th>
                <th className="py-2 px-4">Product Name</th>
                <th className="py-2 px-4">Quantity</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Total</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cards.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4">
                    <Image
                      src={`/uploads/${item.image}`} // Path relative to the public directory
                      alt={item.name || "Product image"}
                      width={100}
                      height={50}
                      style={{ objectFit: 'cover' }} // Ensure the image covers the container
                    />
                  </td>
                  <td className="py-2 px-4">{item.name}</td>
                  <td className="py-2 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => decrementQuantity(index)}
                        className="bg-gray-300 p-1 rounded"
                      >
                        -
                      </button>
                      <span>{quantities[index]}</span>
                      <button
                        onClick={() => incrementQuantity(index)}
                        className="bg-gray-300 p-1 rounded"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-2 px-4">RS {item.price}</td>
                  <td className="py-2 px-4">RS {item.price * quantities[index]}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => removeItem(index)}
                      className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-lg font-semibold">Grand Total: RS {grandTotal.toFixed(2)}</h3>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
