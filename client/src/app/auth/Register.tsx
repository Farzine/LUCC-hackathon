"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "/public/images/logo-no-bg.png";
import Cookies from 'js-cookie';
import { Label } from "@/components/ui/SClabel";
import { Input } from "@/components/ui/SCinput";
import { cn } from "@/lib/utils";
import UploadIImg from "../components/UploadImg";
import { Button } from "@/components/ui/button";

export default function SignupFormDemo(props: any) {

  const [name, set_name] = React.useState("");
  const [edu_mail, set_edu_mail] = React.useState("");
  const [userPic, setUserPic] = useState<File | null>(null);
  const [password, set_password] = React.useState("");
  const [confirm_password, set_confirm_password] = React.useState("");
  const [error, setError] = useState("");
  const [isError, setisError] = useState(false);

 

  
  useEffect(() => {
    let timer: any;
    if (isError) {
      timer = setTimeout(() => {
        setisError(false);
      }, 4000);
    }    
    return () => clearTimeout(timer);
  }, [isError]);



  // handle registration
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    if (password !== confirm_password) {
      setisError(true);
      setError("Passwords do not match");
      
      return;
    }
    
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", edu_mail);
      formData.append("password", password);
      formData.append("confirmPassword", confirm_password);

      if (userPic) {
        formData.append("userPicUrl", userPic);
      }
      
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setisError(true);
        setError(errorData.message || "Error registering user");
      } else {
        props.handleRegister(true); 
        alert("User registered successfully");
      }
    } catch (err) {
      setisError(true);
      setError("Error registering user");
      
    }
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUserPic(e.target.files[0]);
    }
  };

  const handleRegister = () => {
    props.handleRegister(true);

  }




  return (

    <div className="flex h-full w-screen justify-center items-center">
      <div className="max-w-md w-screen mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        
      <Image
      src={logo} // Path to your image
      alt="MeetSync"
      className=""
      width={200} // Image width
      height={40} // Image height
    />
         <h2 className="font-extralight  space-x-4 text-xl">Simplify Scheduling, Empower Productivity.</h2>

        <form className="my-4" onSubmit={handleSubmit}>
        {(isError) ?
            <div className="font-bold bg-red-400 bg-opacity-50 rounded-lg my-2 p-2">
              {error}
            </div> : <div></div>
          }
          
            <div className=" flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="firstname">Name</Label>
                <Input required value={name} onChange={(e) => set_name(e.target.value)}
                  id="firstname" placeholder="John Doe" type="text" />
              </LabelInputContainer>
            </div>

          
         


          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input required value={edu_mail} onChange={(e) => set_edu_mail(e.target.value)} id="email" placeholder="xyz12@student.sust.edu" type="email" />
          </LabelInputContainer>

        
          <div className="flex gap-4 justify-between">
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input  required value={password} onChange={(e) => set_password(e.target.value)} id="password" placeholder="••••••••" type="password" />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Confirm Password</Label>
              <Input required value={confirm_password} onChange={(e) => set_confirm_password(e.target.value)} id="password" placeholder="••••••••" type="password" />
            </LabelInputContainer>
          </div>



          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label htmlFor="picture">Picture</Label>
            <Input id="picture" type="file" onChange={handleFileChange} />
          </div>
          <div className="w-full flex justify-center mb-4">
            <Button variant='outline' className="px-8 py-2 rounded-full font-bold transition duration-200  bg-customRed text-white hover:text-white hover:bg-red-500 hover:shadow-xl  ">
              Register
            </Button>
          </div>

          <div className="flex justify-center">
            <Label onClick={handleRegister} htmlFor="password">Already have account ? <b className="hover:cursor-pointer hover:underline">Sign in</b></Label>
          </div>
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};