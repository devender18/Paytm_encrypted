import { useState } from "react";
import { Input } from "../components/Input";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function SendMoney(){
    const [searchParam] = useSearchParams();
    const name = searchParam.get("name");
    const id = searchParam.get("id")
    const [amount,setAmount] = useState(0);

    return (
        <div>
            <div className="w-screen h-screen bg-gray-200 flex justify-center items-center">
                <div className="h-96 w-96 shadow-2xl bg-white rounded-2xl">
                    
                    <div id="marginBox" className="flex-col h-full mx-4">
                        
                        <div className="flex justify-center items-center mt-8">
                            <p className="font-bold text-4xl ">Send Money</p>
                        </div>

                        <div className="flex-col mt-16">
                            <div className="flex justify-start items-center">
                                <div className="bg-green-400 flex justify-center items-center rounded-full h-12 w-12 m-2">
                                    <p className="text-2xl text-white">{name[0]}</p>
                                </div>
                                <div className="flex justify-center items-center ml-2">
                                    <p className="font-bold text-2xl">{name}</p>
                                </div>
                            </div>

                            <div className="ml-2">
                                <Input label= "Amount (in Rs)" placeHolder="Enter amount" onChange={(e)=>setAmount(e.target.value)}/>
                            </div>
                        </div>

                        <div className="mt-5 ml-4">
                            <div className="bg-green-400 rounded-lg h-10 w-full flex justify-center items-center " onClick={async ()=>{
                                await axios.post("http://localhost:3000/api/v1/account/transfer",{
                                    to : id,
                                    amount
                                },{
                                    headers : {
                                        Authorization : `Bearer ${localStorage.getItem("token")}`
                                    }
                                })


                            }}>
                                <p className="text-white">Initiate Transfer</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}