"use client";
import React, { useEffect, useState } from 'react';
import Room from './room';

function ListRoom() {
    const [rooms, setRooms] = useState<any[]>([]);

    useEffect(() => {
        fetch('http://localhost:5102/api/Room')
            .then(response => response.json())
            .then(data => setRooms(data))
            .catch(error => console.error('Error fetching rooms:', error));
    }, []);

    return (
        <>
            <h1>Login</h1>
            {rooms.map(room => (
                <Room key={room.id} room={room} />
            ))}
        </>
    );
}

export default ListRoom;
