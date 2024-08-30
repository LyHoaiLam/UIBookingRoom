import React from 'react';

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
        <div key={room.id} className="room-card">
            <h2>{room.name}</h2>
            <p>{room.description}</p>
            <p>Price: {room.price}</p>
            <img src={room.imageUrl} alt={room.name} />
        </div>
    );
}

export default Room;
