import { useEffect, useState } from "react";
import { getSnacks } from "../api/canteenApi.js";
import SnackCard from "../components/SnackCard.js";
import type { Snack } from "../models/index.js";

const SnackSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden p-4 animate-pulse">
        <div className="w-full h-48 bg-gray-300 rounded-lg mb-4"></div>
        <div className="h-4 bg-gray-300 rounded mb-3 w-3/4"></div>
        <div className="h-3 bg-gray-300 rounded mb-4 w-full"></div>
        <div className="h-3 bg-gray-300 rounded mb-6 w-2/3"></div>
        <div className="flex justify-between items-center">
            <div className="h-5 bg-gray-300 rounded w-16"></div>
            <div className="h-10 bg-gray-300 rounded w-20"></div>
        </div>
    </div>
);

const Snacks = () => {
    const [snacks, setSnacks] = useState<Snack[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getSnacks().then((data: Snack[]) => {
            setSnacks(data);
            setLoading(false);
        });
    }, []);



    return (
        <div className="min-h-screen bg-linear-to-b from-blue-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-12">
                <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                        <h1 className=" text-3xl md:text-4xl font-bold text-gray-900 mb-0.5 md:mb-2">Order Your Snacks</h1>
                        <p className="text-lg text-gray-600">Choose from our delicious menu of fresh snacks</p>
                    </div>

                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <SnackSkeleton key={i} />
                        ))}
                    </div>
                ) : snacks.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🍴</div>
                        <p className="text-xl text-gray-600">No snacks available right now</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {snacks.map((snack: Snack) => (
                            <SnackCard key={snack.id} snack={snack} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Snacks;
