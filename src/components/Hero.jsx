import React from 'react';
import Image from 'next/image';
import MyImage from '../../Public/images/dream-cover.jpeg';

const Hero = () => {
  return (
    <div className="w-full flex justify-center ">
    <div>
      <Image
        src={MyImage}
        alt="Hero Image"
        objectFit="cover"
        className="" 
      />
    </div>
    </div>
  );
};

export default Hero;
