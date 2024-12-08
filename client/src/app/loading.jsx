'use client';
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import logo from "/public/images/logo.png";
import Image from 'next/image';


export default function loading() {
  return (
    <div className='flex flex-col min-h-screen justify-center items-center'>
        {/* <DotLottieReact
      width={300} // Image width
      height={50} 
      src="/loading.json"
      loop
      autoplay
    /> */}  

      <Image
     
      src={logo} // Path to your image
      alt="MeetSync"
      width={200} // Image width
      height={100} // Image height
    />



    </div>

    
  );
};

