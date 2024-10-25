import Link from 'next/link';
import React, { useRef, useEffect } from 'react';

interface PopupSearchProps {
    isVisible: boolean;
    results: any[]; 
    onClose: () => void;
}

const PopupSearch: React.FC<PopupSearchProps> = ({ isVisible, results, onClose }) => {
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
            <div ref={popupRef} className="bg-white p-4 shadow-lg rounded-lg w-3/4 max-w-4xl relative overflow-y-auto max-h-[80vh]">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">
                    &times;
                </button>
                <h2 className="text-xl font-semibold mb-4">Search Results</h2>
                {results.length > 0 ? (
                    <ul>
                        {results.map(result => (
                            <div>

                                <li key={result.id} className="border p-4 mb-4">
                                    <h3 className="text-lg font-semibold">{result.name}</h3>
                                    <p>{result.location}</p>
                                    <p>{result.description}</p>
                                    <p>Price: {result.price}</p>
                                    <div className='flex'>
                                        <img src={result.imageUrl} alt={result.name} className="w-32 h-32 object-cover mt-2" />
                                        <Link href={{ pathname: "/booking", query: { idRoom: result.id } }}>
                                            <button className='h-10 w-48 ml-4 self-end text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-center'>Booking now</button>

                                        </Link>
                                    </div>
                                </li>
    
                            </div>
                        ))}
                    </ul>
                ) : (
                    <p>No results found</p>
                )}
            </div>
        </div>
    );
};

export default PopupSearch;
