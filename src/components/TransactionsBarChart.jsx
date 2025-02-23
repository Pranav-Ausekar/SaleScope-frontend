import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// const API_CHART_URL = "http://localhost:3000/api/transactions";
const API_CHART_URL = "https://salescope-backend.onrender.com/api/transactions";


export default function TransactionsBarChart({ month }) {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        fetchChartData();
    }, [month]);

    const fetchChartData = async () => {
        try {
            const response = await axios.get(API_CHART_URL, { params: { month } });
            console.log("API Response:", response.data);

            //here define price range buckets
            const priceRanges = [
                { range: "0-100", min: 0, max: 100, count: 0 },
                { range: "101-200", min: 101, max: 200, count: 0 },
                { range: "201-300", min: 201, max: 300, count: 0 },
                { range: "301-400", min: 301, max: 400, count: 0 },
                { range: "401-500", min: 401, max: 500, count: 0 },
                { range: "501-600", min: 501, max: 600, count: 0 },
                { range: "601-700", min: 601, max: 700, count: 0 },
                { range: "701-800", min: 701, max: 800, count: 0 },
                { range: "801-900", min: 801, max: 900, count: 0 },
                { range: "901+", min: 901, max: Infinity, count: 0 }
            ];

            // Ensure response
            if (!response.data || !response.data.data) {
                console.error("Invalid API response:", response.data);
                return;
            }

            // Count items in each range
            response.data.data.forEach((item) => {
                const price = item.price;
                const range = priceRanges.find(r => price >= r.min && price <= r.max);
                if (range) {
                    range.count += 1;
                }
            });

            console.log("Processed Chart Data:", priceRanges);
            setChartData(priceRanges);
        } catch (error) {
            console.error("Error fetching chart data:", error);
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4 text-center">Bar Chart Stats - {month}</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} barSize={50}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis
                        tickCount={6}
                        domain={[0, 10]}
                        tickFormatter={(tick) => `${tick}`} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#4CAF50" radius={[5, 5, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
