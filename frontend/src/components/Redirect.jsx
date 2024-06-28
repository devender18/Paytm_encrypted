import { Link } from "react-router-dom"
export function Redirect({text, to}){
    return (
        <div>
            <div>
                <p>{text}<Link >{to}</Link></p>
            </div>
        </div>
    )
}