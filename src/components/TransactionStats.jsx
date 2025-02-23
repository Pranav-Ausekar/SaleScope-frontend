import { useEffect, useState } from "react";
import axios from "axios";

// const API_STATS_URL = "http://localhost:3000/api/statistics";
// const API_STATS_URL = "https://salescope-backend.onrender.com/api/statistics";
const API_STATS_URL = import.meta.env.VITE_API_URL + "/api/statistics";




export default function TransactionStats({ month }) {
    const [stats, setStats] = useState({
        totalSaleAmount: 0,
        totalSoldItems: 0,
        totalNotSoldItems: 0,
    });

    useEffect(() => {
        fetchStats();
    }, [month]);

    const fetchStats = async () => {
        try {
            const response = await axios.get(`${API_STATS_URL}`, { params: { month } });
            console.log("API Response:", response.data);

            setStats({
                totalSaleAmount: response.data.totalSaleAmount,
                totalSoldItems: response.data.totalSoldItems,
                totalNotSoldItems: response.data.totalUnsoldItems,
            });
        } catch (error) {
            console.error("Error fetching transaction stats:", error);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Total Sale Amount */}
            <div className="p-4 bg-green-100 border border-green-400 rounded-lg shadow">
                <h2 className="text-xl font-bold text-green-800">Total Sale Amount</h2>
                <p className="text-2xl font-semibold">${stats.totalSaleAmount}</p>
            </div>

            {/* Total Sold Items */}
            <div className="p-4 bg-blue-100 border border-blue-400 rounded-lg shadow">
                <h2 className="text-xl font-bold text-blue-800">Total Sold Items</h2>
                <p className="text-2xl font-semibold">{stats.totalSoldItems}</p>
            </div>

            {/* Total Not Sold Items */}
            <div className="p-4 bg-red-100 border border-red-400 rounded-lg shadow">
                <h2 className="text-xl font-bold text-red-800">Total Not Sold Items</h2>
                <p className="text-2xl font-semibold">{stats.totalNotSoldItems}</p>
            </div>
        </div>
    );
}
