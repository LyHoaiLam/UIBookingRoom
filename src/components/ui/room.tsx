import React from 'react';
import '../../app/globals.css'
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface RoomProps {
    room: {
        id: number;
        name: string;
        location: string;
        description: string;
        price: number;
        imageUrl: string;
    };
}

function Room({ room }: RoomProps) {
    return (
        <div key={room.id} className="room-card bg-slate-300 mt-2 rounded-lg">
            <div className='flex flex-col md:flex-row p-4'>
                <img className="w-full md:w-72 h-52 object-cover" src={room.imageUrl} alt={room.name} />
                <div className='ml-5'>
                    
                    <h2 className='scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text'>{room.name}</h2>

                    {/* <p className='text-xl relative group'>
                            Loại phòng: 
                            <span className='my-2 bg-gradient-to-r from-red-600 via-yellow-500 to-indigo-400 inline-block text-transparent bg-clip-text max-w-[300px] truncate'>
                                {room.description}
                            </span>
                            <span className='absolute left-0 top-full mt-2 w-max max-w-xs bg-white text-black py-2 px-4 shadow-lg rounded-lg opacity-0 invisible transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:visible'>
                                {room.description}
                            </span>
                        </p> */}

                <p className='text-xl flex flex-col relative group'>
                    <span>Loại phòng:</span>
                    <span className='my-2 relative'>
                        <span className='inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-yellow-500 to-indigo-400 max-w-[300px] w-full md:w-[180px] truncate'>
                        {room.description}
                        </span>
                        {/* <span className='absolute left-0 top-full mt-2 w-max max-w-xs bg-white text-black py-2 px-4 shadow-lg rounded-lg opacity-0 invisible transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:visible'>
                        {room.description}
                        </span> */}
                    </span>
                </p>

                    <p className='text-xl'>vị trí: <span className='my-2 bg-gradient-to-r from-red-600 via-yellow-500 to-indigo-400 inline-block text-transparent bg-clip-text'>{room.location}</span></p>
                    <p>Price: <span className='my-2 bg-gradient-to-r from-red-600 via-yellow-500 to-indigo-400 inline-block text-transparent bg-clip-text'>{room.price} VNĐ</span></p>
                    <Link href={{ pathname: "/booking", query: { idRoom: room.id } }}>
                        <Button className="bg-sky-600 mt-5 animate-bounce w-full md:w-auto">Booking</Button>
                    </Link>

                </div>
            </div>
        </div>
    );
}

export default Room;
