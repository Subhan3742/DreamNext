import React from 'react'
import Image from 'next/image'
import MyImage from '../../Public/images/certificates.png'
const Certificates = () => {
  return (
    <>
    <h1 className='text-3xl  text-center'>Certifications</h1>
    <div className='flex justify-center'>
      <div>
      <Image src={MyImage}/>
      </div>
    </div>
    </>
  )
}

export default Certificates
