"use client";
import React, { useEffect, useState } from "react";
import Booking from "./booking"; 

interface BookingData {
    id: number;
    roomId: number;
    username: string;
    checkInDate: string;
    checkOutDate: string;
    status: string;
}

function ListBooking() {
    const [bookings, setBookings] = useState<BookingData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {

        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        }

        async function fetchBookings() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}Booking`);
                if (!response.ok) {
                    throw new Error("Failed to fetch bookings");
                }
                const data = await response.json();
                setBookings(data);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        }

        fetchBookings();
    }, []);

    const handleDelete = async (id: number) => {
        if (!isLoggedIn) {
            alert("You must be logged in to delete a booking.");
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}Booking/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error("Failed to delete booking");
            }

            setBookings((prevBookings) => prevBookings.filter(booking => booking.id !== id));
        } catch (error) {
            console.error("Error deleting booking:", error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    return (
        <>
            {bookings.length === 0 ? (
                <h3 className="text-center">Hiện không có lượt Booking nào</h3>
            ) : (
                <div className="space-y-4">
                    {bookings.map((booking) => (
                        <Booking 
                            key={booking.id} 
                            onDelete={handleDelete} 
                            booking={booking} 
                            canDelete={isLoggedIn} // Pass canDelete as a prop
                        />
                    ))}
                </div>
            )}
        </>
    );
}

export default ListBooking;
