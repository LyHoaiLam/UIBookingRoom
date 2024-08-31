import React from 'react';
import '../../app/globals.css'
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface RoomProps {
    room: {
        id: number;
        name: string;
        description: string;
        price: number;
        imageUrl: string;
    };
}


function Room({ room }: RoomProps) {
    return (
        <div key={room.id} className="room-card bg-slate-300 mt-2 rounded-lg">
            <div className='flex p-4'>
                <img className="w-72 h-52" src={room.imageUrl} alt={room.name} />
                <div className='ml-5'>
                    <h2 className='scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text'>{room.name}</h2>
                    <p className='text-xl'>Loại phòng: <span className='my-2 bg-gradient-to-r from-red-600 via-yellow-500 to-indigo-400 inline-block text-transparent bg-clip-text'>{room.description}</span></p>
                    <p>Price: <span className='my-2 bg-gradient-to-r from-red-600 via-yellow-500 to-indigo-400 inline-block text-transparent bg-clip-text'>{room.price} VNĐ</span></p>
                    <Button className="bg-sky-600 mt-5 animate-bounce">
                    <Link href={{ pathname: "/booking", query: { idRoom: room.id } }}>
                        Đặt phòng
                    </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Room;

