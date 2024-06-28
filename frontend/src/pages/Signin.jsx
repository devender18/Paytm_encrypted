import { useState } from "react";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Input } from "../components/Input";
import { Label } from "../components/Label";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signin() {
  const [username,setUserName] = useState();
  const [password,setPassword] = useState();
  const navigate = useNavigate();

  return (
    <div>
      <div
        id="outer"
        className="bg-neutral-500 w-screen h-screen flex justify-center items-center"
      >
        <div className="bg-white w-96 rounded-2xl flex justify-center">
          <div className="w-80 h-full m-8">
            <Heading title="Sign In" />
            <Label desc="Enter your credentials to access your account" />
            <Input label = "Email" placeHolder="johndoe@example.com" onChange={(e) => setUserName(e.target.value)} />
            <Input label = "Password" onChange={(e) => setPassword(e.target.value)}/>
            <Button title="Sign In" onClick={async ()=>{
              const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                username,
                password
              })
              navigate("/dashboard")
              
            }} />
            <div className="flex justify-center items-center mt-2">
                <div className="font-medium ">
                    <p>Already have an account? <Link to={"/signup"} className="underline">Sign Up</Link></p>
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
