import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 p-5 m-5'>
      <div className='bg-black text-white p-5 m-5 text-center text-2xl'>
       <Link href="/dashboard/newproduct"> <h2>Add Product</h2></Link>
      </div>
      <div className='bg-black text-white p-5 m-5 text-center text-2xl'>
      <Link href="/dashboard/order">    <h2>Order</h2></Link>
      </div>
      <div className='bg-black text-white p-5 m-5 text-center text-2xl'>
      <Link href="/dashboard/adminUser">  <h2>Admin User</h2></Link>
      </div>
      <div className='bg-black text-white p-5 m-5 text-center text-2xl'>
      <Link href="/dashboard/message"> <h2>Message</h2></Link>
      </div>
      
    </div>
  )
}

export default page
