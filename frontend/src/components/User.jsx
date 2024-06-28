import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export function User(){
    const [user,setUser] = useState([]);
    const [filter,setFilter] = useState("");

    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
        .then((response)=>{
            setUser(response.data.user)
        })
    },[filter])
    return (
        <div className="flex-col mt-4">
            
            <div>
                <div className="ml-4">
                    <p className="font-bold text-2xl">Users</p>
                </div>
            </div>

            <div className="mt-4 mr-4">
                <div className="border-2 rounded-lg ml-4">
                    <input type="text" placeholder="Search users..." className="outline-none m-1 ml-2 w-full " onChange={(e) => setFilter(e.target.value)}/>
                </div>
            </div>

            <div>
                {user.map((user)=><UserRender user={user} key={user._id}/>)}
            </div>

        </div>
    )
}

function UserRender({user}){
    const navigate = useNavigate();
    return(
        <div>
            <div className="">
                <div className="flex justify-between items-center mx-4 mt-10">
                    
                    <div className="flex">
                        <div className="bg-gray-300 w-10 h-10 rounded-full flex justify-center items-center">
                            <p className="text-lg font-bold">{user.firstName[0].toUpperCase()}</p>
                        </div>
                        <div className="w-80 h-10 flex justify-start items-center ml-4">
                            <p className="text-lg font-bold">{user.firstName}</p>
                        </div>
                    </div>

                    <div  className="flex justify-center items-center bg-black rounded-lg" onClick ={()=>{
                        navigate(`/send?id=${user._id}&name=${user.firstName}`)
                    }}>
                        <div className="flex justify-center items-center w-36 h-8 p-1">
                            <p className="text-white font-medium text-lg ">Send Money</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}