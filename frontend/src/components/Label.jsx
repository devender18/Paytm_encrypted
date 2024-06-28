export function Label({desc}){
    return (
        <div className="flex justify-center items-center m-2">
            <div className="flex justify-center items-center">
                <p className="text-lg text-center text-slate-400">{desc}</p>
            </div>
        </div>
    )
}