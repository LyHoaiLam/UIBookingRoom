'use client'
import FormBooking from "@/app/booking/form-booking";
import { useSearchParams } from 'next/navigation';

function Booking() {
const searchParams = useSearchParams();
const idRoom = searchParams.get('idRoom');

    return (
        <>
            <FormBooking idRoom={idRoom ? parseInt(idRoom) : undefined} />
        </>
     );
}

export default Booking;