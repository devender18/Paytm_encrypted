export const Button = ({title,onClick})=>{
    return (
        <div>
            <div className="bg-black text-white text-lg flex justify-center items-center mx-1 rounded-xl mt-10">
                <div className="w-full flex justify-center items-center cursor-pointer" onClick={onClick}>
                    <p className="p-1">{title}</p>
                </div>
            </div>
        </div>
    )
}