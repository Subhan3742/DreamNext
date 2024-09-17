"use client"
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { object, string } from 'yup';

const validationSchema = object().shape({
  name: string().required('Name is required'),
  email: string().email('Invalid email address').required('Email is required'),
  no: string().required('Number is required'),
  text: string().required('Text is required'),
});

const Page = () => {
  return (
    <Formik
      initialValues={{
        name: '',
        email:'',
        no: '',
        text: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values);
        try {
          const addUser = { 
            name: values.name,
            email: values.email,
            no: values.no,
            text: values.text,
            
        
          };

          const response = await fetch("/api/message", {
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
          <div className="grid grid-cols-2 gap-10 my-4">
            <div className="relative">
              <Field 
                type="text" 
                name="name" 
                className="border border-gray-300 p-2 rounded-md w-full"
                placeholder="Name" 
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="relative">
              <Field 
                type="email" 
                name="email" 
                className="border border-gray-300 p-2 rounded-md w-full"
                placeholder="Email" 
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 my-4">
            <div className="relative">
              <Field 
                type="text" 
                name="no" 
                className="border border-gray-300 p-2 rounded-md w-full"
                placeholder="Number" 
              />
              <ErrorMessage name="no" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="relative">
              <Field 
                type="text" 
                name="text" 
                className="border border-gray-300 p-2 rounded-md w-full"
                placeholder="Text" 
              />
              <ErrorMessage name="text" component="div" className="text-red-500 text-sm mt-1" />
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
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default Page;
