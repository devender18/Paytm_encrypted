import { useState } from "react";
export function Input({label,placeHolder,onChange}){
    
    return (
        <div className="flex-col mt-2">

            <div>
                <p className="font-semibold text-md p-1">{label}</p>
            </div>

            <div className="border-2 rounded-lg ml-1">
                <input type="text" placeholder={placeHolder} className="p-1 ml-1 text-md outline-none" onChange={onChange}/>
            </div>

        </div>
    )
}