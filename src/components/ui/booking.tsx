import React from "react";

interface BookingProps {
    booking: {
        id: number;
        roomId: number;
        username: string;
        checkInDate: string;
        checkOutDate: string;
        status: string;
    };
    onDelete: (id: number) => void;
    canDelete: boolean;
}

function Booking({ booking, onDelete, canDelete }: BookingProps) {
    return (
        <div className="p-4 border rounded">
            <h4 className="text-xl">Booking ID: {booking.id}</h4>
            <p>Room ID: {booking.roomId}</p>
            <p>Username: {booking.username}</p>
            <p>Check-in Date: {booking.checkInDate}</p>
            <p>Check-out Date: {booking.checkOutDate}</p>
            <p>Status: {booking.status}</p>
            {canDelete && (
                <button
                    className="bg-red-500 text-white p-2 rounded"
                    onClick={() => onDelete(booking.id)}
                >
                    Delete
                </button>
            )}
        </div>
    );
}

export default Booking;
