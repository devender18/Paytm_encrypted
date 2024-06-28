export function TopBar(){
    return (
        <div>
            <div className="flex justify-between items-center mt-4">
                <div className="flex justify-center items-center ml-4">
                    <p className="font-bold text-4xl">PayTM</p>
                </div>

                <div className="flex justify-center items-center mr-4">
                    <div className="mr-4 text-lg">
                        <p>Hello User</p>
                    </div>
                    <div className="bg-gray-300 flex justify-center items-center w-10 h-10 rounded-full">
                        <p className="text-xl">U</p>
                    </div>
                </div>
            </div>
            <div className="border-b-2 mt-2"></div>
        </div>
    )
}