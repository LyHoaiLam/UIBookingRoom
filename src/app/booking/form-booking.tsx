'use client'
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface FormBookingProps {
    idRoom: number | undefined;
}

function FormBooking({ idRoom }: FormBookingProps) {
    const [roomId, setRoomId] = useState<number | undefined>(idRoom);
    const [username, setUsername] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [status, setStatus] = useState('Đã đặt');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        console.log("FormBooking Component - idRoom:", idRoom);
        if (idRoom) {
            setRoomId(idRoom);
        }
        const now = new Date();
        const formattedCheckInDate = now.toISOString().slice(0, 16);
        const checkOut = new Date();
        const formattedCheckOutDate = checkOut.toISOString().slice(0, 16);
        setCheckInDate(formattedCheckInDate);
        setCheckOutDate(formattedCheckOutDate);
    }, [idRoom]);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (!roomId) {
            setError('Room ID is missing');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        const bookingData = {
            roomId,
            username,
            checkInDate,
            checkOutDate,
            status,
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}Booking`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            if (!response.ok) {
                throw new Error('Booking failed. Please try again.');
            }

            setSuccessMessage('Booking successful!');
            setUsername('');
            setCheckInDate('');
            setCheckOutDate('');
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label>Username</label>
                    <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label>Check-In Date</label>
                    <Input type="datetime-local" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} required />
                </div>

                <div>
                    <label>Check-Out Date</label>
                    <Input type="datetime-local" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} required />
                </div>

                <Button type="submit" className="bg-sky-600">
                    {loading ? 'Đang đặt phòng...' : 'Booking'}
                </Button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
        </>
    );
}

export default FormBooking;
