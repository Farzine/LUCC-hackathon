"use client";
import React, { useEffect, useState } from "react";
import { Label } from "../../components/ui/SClabel";
import { Input } from "../../components/ui/SCinput";
import { cn } from "@/lib/utils";
import Cookies from 'js-cookie';
import { Button } from "../../components/ui/button"
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "/public/images/logo.png";
export default function SignupFormDemo(props: any) {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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



    useEffect(() => {
        const fetchUserData = async () => {
            const token = Cookies.get('token');
            if (token) {
                // router.push('/homepage'); // Redirect to login if no token is found
                return;
            }
        }
        fetchUserData();
    },
        [router]
    )


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const login = {
                email: email,
                password: password || 'password'
            }

            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(login),
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();

                toast.error(errorData.message || "Login failed", {
                    duration: 2000,
                    style: {
                      backgroundColor: "#fff",
                      color: "#a63939", //red
                      borderColor: "#a63939",
                    },
                  });

                setisError(true);
                // setError(errorData.message || "Error while logging in");
                
            } else {
                const data = await response.json();
                Cookies.set('token', data.token);
                localStorage.setItem('user_id', data.user_id);
                localStorage.setItem('user',data.user );
                toast.success("Logged In Successfully", {
                    duration: 2000,
                    style: {
                      backgroundColor: "#fff",
                      color: "#16a34a", //green
                      borderColor: "#16a34a",
                    },
                  });

                router.push('/profile') //router push to homepage
                console.log("//router push to homepage");
            }

        } catch (error) {
            console.log(error);
            setisError(true);
            setError("Error while logging in");
        }
    }

    const handleRegister = () => {
        props.handleRegister(false)
    }


    return (

        <div className="flex  h-screen w-screen justify-center items-center">



        {/* left side  */}
        <div className="w-1/2 h-screen flex flex-col justify-center items-center">

        <Image
      src={logo} // Path to your image
      alt="MeetSync"
      className=""
      width={500} // Image width
      height={100} // Image height
    />

    <h2 className="font-extralight  space-x-4 text-xl">Simplify Scheduling, Empower Productivity.</h2>


        </div>


            <div className="max-w-md w-screen shadow-2xl  mx-auto rounded-none md:rounded-md p-4 md:p-8 shadow-input bg-white dark:bg-black">
                
             

                <form className="my-10" onSubmit={handleSubmit}>
                    {(isError) ?
                        <div className="font-bold bg-red-400 bg-opacity-50 rounded-lg my-2 p-2">
                            {error}
                        </div> : <div></div>
                    }
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Email</Label>
                        <Input required id="email" placeholder="xyz12@student.sust.edu" type="email" value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="password">Password</Label>
                        <Input required id="password" placeholder="••••••••" type="password" value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </LabelInputContainer>
                    <div className="flex justify-end mb-4">
                        <Label htmlFor="password">Forgot Password ?</Label>
                    </div>

                    <div className="flex justify-center w-full mb-4 ">
                        <Button type="submit" variant='destructive' onClick={() => handleSubmit} className="px-8 w-full py-2 text-xl rounded-md bg-customRed  text-white font-bold transition duration-200 hover:bg-red-600 hover:shadow-lg   ">
                            Login
                        </Button>
                      
                    </div>


                    <div className="flex justify-center mb-4">
                        <Label onClick={handleRegister} htmlFor="password">Don&apos;t have any account ? <b className="hover:cursor-pointer hover:underline">Register</b></Label>
                    </div>

                </form>
            </div>
        </div>
    );
}

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