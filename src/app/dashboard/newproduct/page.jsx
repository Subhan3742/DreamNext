"use client"
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import axios from 'axios';

const validationSchema = object().shape({

});

const Page = () => {
  return (
    <Formik
      initialValues={{
        name: '',
        price: '',
        category: '',
        detail: '',
        image: null, // Use null or an empty value for file input
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values);
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('price', values.price);
        formData.append('category', values.category);
        formData.append('detail', values.detail);
        if (values.image) formData.append('image', values.image);

        try {
          const response = await axios.post('/api/post', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log(response.data);
        } catch (error) {
          console.error('Error submitting form:', error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className="mx-5 my-5">
          <div className="grid grid-cols-2 gap-10 my-4">
            <div className="relative">
              <Field 
                type="text" 
                name="name" 
                className="border border-gray-300 p-2 rounded-md w-full"
                placeholder="Name" 
              />
              {/* Uncomment if using error messages */}
              {/* <ErrorMessage name="name" component="div" className="text-red-500 text-sm absolute mt-1" /> */}
            </div>

            <div className="relative">
              <Field 
                type="text" 
                name="price" 
                className="border border-gray-300 p-2 rounded-md w-full"
                placeholder="Price" 
              />
              {/* Uncomment if using error messages */}
              {/* <ErrorMessage name="price" component="div" className="text-red-500 text-sm absolute mt-1" /> */}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 my-4">
            <div className="relative">
              <input
                type="file" 
                name="image" 
                className="border border-gray-300 p-2 rounded-md w-full"
                onChange={(event) => {
                  setFieldValue('image', event.currentTarget.files[0]);
                }}
              />
              {/* Uncomment if using error messages */}
              {/* <ErrorMessage name="image" component="div" className="text-red-500 text-sm absolute mt-1" /> */}
            </div>

            <div className="relative">
              <Field 
                type="text" 
                name="category" 
                className="border border-gray-300 p-2 rounded-md w-full"
                placeholder="Category" 
              />
              {/* Uncomment if using error messages */}
              {/* <ErrorMessage name="category" component="div" className="text-red-500 text-sm absolute mt-1" /> */}
            </div>
          </div>

          <div className="relative">
            <Field 
              type="text" 
              name="detail" 
              className="border border-gray-300 p-2 rounded-md w-full"
              placeholder="Detail" 
            />
            {/* Uncomment if using error messages */}
            {/* <ErrorMessage name="detail" component="div" className="text-red-500 text-sm absolute mt-1" /> */}
          </div>

          <div className="flex justify-between mt-4">
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default Page;
