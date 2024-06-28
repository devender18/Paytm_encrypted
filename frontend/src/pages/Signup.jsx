import React from "react";
import { Heading } from "./../components/Heading"
import { Label } from "../components/Label";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Link, useNavigate} from "react-router-dom";
import {useState} from 'react'
import axios from "axios"

export default function Signup(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");
    const navigate = useNavigate();

    return (
        <div>
            <div id="outer" className="bg-neutral-500 w-screen h-screen flex justify-center items-center">
                <div className="bg-white w-96  rounded-2xl flex justify-center">
                    <div className="w-80 h-full m-8">
                        <Heading title="Sign Up" />

                        <Label desc = "Enter your information to create an account" />

                        <Input label="First Name" placeHolder="John" onChange={(e)=>{
                            setFirstName(e.target.value)
                        }}/>
                        
                        <Input label="Last Name" placeHolder="Doe" onChange = {(e)=> setLastName(e.target.value)}/>

                        <Input label="Email" placeHolder="john@xyz.com" onChange={e => setUserName(e.target.value)}/>

                        <Input label="Password" placeHolder="password" onChange = {e => setPassword(e.target.value)} />

                        <Button title="Sign up" onClick ={async()=>{
                            const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                                username,
                                password,
                                firstName,
                                lastName
                            });
                            localStorage.setItem("token",response.data.token)
                            navigate("/dashboard")


                            
                        }}/>

                        <div className="flex justify-center items-center mt-2">
                            <div className="font-medium  ">
                                <p>Already have an account? <Link to={"/signin"} className="underline">Login</Link></p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}