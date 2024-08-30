import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link";

function Header() {
    return (
        <div className="bg-gray-500 p-4">
            <div className="flex items-center">

                <div className="w-[20%] text-3xl cursor-pointer">
                    <Link href="/">Home Page Booking</Link>
                </div>
                <div className="w-[50%]">
                    <Input placeholder="Search Booking theo Ngày và Vị trí" />
                </div>
                
                <div className="flex w-[30%] justify-end">
                        <Button className="bg-sky-600 w-[28%] mr-8">
                            <Link href="/login">Login</Link>
                        </Button>

                        <Button className="bg-sky-600 w-[28%]">
                            <Link href="/register">Register</Link>
                        </Button>
                </div>
            </div>
        </div>
    )
}

export default Header;
