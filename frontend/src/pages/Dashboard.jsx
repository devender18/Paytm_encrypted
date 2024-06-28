import { Balance } from "../components/Balance";
import { TopBar } from "../components/TopBar";
import { User } from "../components/User";

export default function Dashboard(){
    return (
        <div>
            <TopBar />
            <Balance />
            <User />
        </div>
    )
}