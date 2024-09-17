"use client"
import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import Link from 'next/link';

const validationSchema = object().shape({
  email: string()
    .email('Invalid email address')
    .required('Email is required'),
  password: string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values);
        try {
          const { email, password } = values;

          const response = await fetch("/api/adminUser", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const result = await response.json();

          if (!response.ok) {
            console.error(result.error);
          } else {
            console.log(result);
          }
        } catch (error) {
          console.error("An error occurred:", error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="mx-5 my-5">
          <div className="grid grid-cols-1 gap-10 my-4">
            <div className="relative">
              <Field 
                type="email" 
                name="email" 
                className="border border-gray-300 p-2 rounded-md w-full"
                placeholder="Email" 
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="relative">
              <Field 
                type={showPassword ? "text" : "password"} // Toggle between text and password
                name="password" 
                className="border border-gray-300 p-2 rounded-md w-full"
                placeholder="Password" 
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />

              <div className="flex items-center mt-2">
                <input 
                  type="checkbox" 
                  id="showPassword" 
                  checked={showPassword} 
                  onChange={() => setShowPassword(!showPassword)} 
                />
                <label htmlFor="showPassword" className="ml-2 text-gray-700">
                  Show Password
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Submit
            </button>
            <Link href="adminUserList">
            <button 
              type="button"
              className="bg-green-500 text-white p-2 rounded-md"
            >
              Admin Users
            </button>
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default Page;
