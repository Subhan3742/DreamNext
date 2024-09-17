import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="bg-black p-5 text-white">
      <div className=" mb-5">
        <h2 className="text-xl">© 2023 DreamFans All Rights Reserved</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-3 ps-5 mx-5">
          <h2 className="text-lg font-semibold"><u>CAN WE HELP YOU?</u></h2>
          <p>SEND EMAIL || CONTACT US || RETURN & EXCHANGE</p>
          <p>COMPANY EMAIL</p>
          <p>COMPANY CONTACT NUMBER</p>
          <p>POLICIES</p>
        </div>
        <div className="space-y-3 text-center">
          <h2 className="text-lg font-semibold"><u>SHIPPING</u></h2>
          <p><u>TRACK YOUR ORDER</u></p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
