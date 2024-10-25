// "use client";
// import React, { useEffect, useState } from 'react';
// import Room from './room';

// function ListRoom() {
//     const [rooms, setRooms] = useState<any[]>([]);

//     useEffect(() => {
//         // fetch('http://localhost:5102/api/Room')
//         fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}Room`)
//             .then(response => response.json())
//             .then(data => setRooms(data))
//             .catch(error => console.error('Error fetching rooms:', error));
//     }, []);

//     console.log('Base URL:', process.env.NEXT_PUBLIC_API_ENDPOINT);


//     return (
//         <>
//             <h1 className='text-3xl text-center'>Danh sách các phòng</h1>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                 {rooms.map(room => (
//                     <Room key={room.id} room={room} />
//                 ))}
//             </div>
//         </>
//     );
// }

// export default ListRoom;

"use client";
import React, { useEffect, useState } from 'react';
import Room from './room';

function ListRoom() {
    const [rooms, setRooms] = useState<any[]>([]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}Room`)
            .then(response => response.json())
            .then(data => setRooms(data))
            .catch(error => console.error('Error fetching rooms:', error));
    }, []);

    return (
        <>
            <h1 className='text-3xl text-center'>List Of Rooms</h1>
            {/* Thêm lớp lg:grid-cols-2 để giảm xuống 2 phòng ở màn hình lớn */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {rooms.map(room => (
                    <Room key={room.id} room={room} />
                ))}
            </div>
        </>
    );
}

export default ListRoom;
