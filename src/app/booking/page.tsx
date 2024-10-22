'use client'
import FormBooking from "./form-booking";
import { useSearchParams } from 'next/navigation';

function Booking() {
const searchParams = useSearchParams();
const idRoom = searchParams.get('idRoom');

    return (
        <>
            <h1 className="text-4xl text-center mt-8">Booking</h1>
            <FormBooking idRoom={idRoom ? parseInt(idRoom) : undefined} />
        </>
     );
}

export default Booking;

