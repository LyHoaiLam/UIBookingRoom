'use client'
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PopupSearch from "./PopupSearch";

interface SearchBookingProps {
    onSearch: (searchQuery: { location: string, date: string }) => void;
}

function SearchBooking({ onSearch }: SearchBookingProps) {
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}Room?Location=${encodeURIComponent(location)}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setResults(data);
            setShowPopup(true);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div>
            <div className="flex space-x-4 mb-4">
                <Input 
                    type="text" 
                    placeholder="Enter location" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                    onKeyDown={handleKeyDown} 
                />
                <Input 
                    type="date" 
                    placeholder="Enter date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                    onKeyDown={handleKeyDown} 
                />
                <Button onClick={handleSearch} className="bg-blue-500">
                    Search
                </Button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <PopupSearch 
                isVisible={showPopup} 
                results={results} 
                onClose={() => setShowPopup(false)} 
            />
        </div>
    );
}

export default SearchBooking;
