import { useEffect, useState } from "react";
import axios from "axios";
import TransactionStats from "./TransactionStats";
import TransactionsBarChart from "./TransactionsBarChart";

// const API_BASE_URL = "http://localhost:3000/api/transactions";
// const API_BASE_URL = "https://salescope-backend.onrender.com/api/transactions";

const API_BASE_URL = import.meta.env.VITE_API_URL + "/api/transactions";

export default function TransactionsTable() {
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState("");
    const [month, setMonth] = useState("March");
    const [page, setPage] = useState(1);
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    useEffect(() => {
        fetchTransactions();
    }, [month, page, search]);

    const fetchTransactions = async () => {
        try {
            console.log("Fetching transactions...");
            const response = await axios.get(`${API_BASE_URL}`, {
                params: { month, page, search }
            });
            console.log("Response:", response.data);
            setTransactions(response.data.data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    return (
        <div className="w-screen">
            <div className="w-screen max-w-[1200px] mx-auto p-4 bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Filters */}
                <div className="w-full max-w-[1200px] flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
                    <select
                        className="border p-3 rounded text-lg w-1/2"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                    >
                        {months.map((m) => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>

                    <input
                        type="text"
                        placeholder="Search transactions..."
                        className="border p-3 rounded text-lg w-1/2"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Transactions Table */}
                <div className="w-full overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 min-w-[600px]">
                        <thead className="bg-gray-200 text-sm md:text-base">
                            <tr>
                                <th className="border p-2">ID</th>
                                <th className="border p-2">Title</th>
                                <th className="border p-2">Description</th>
                                <th className="border p-2">Price</th>
                                <th className="border p-2">Category</th>
                                <th className="border p-2">Sold</th>
                                <th className="border p-2">Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.length > 0 ? (
                                transactions.map((txn, index) => (
                                    <tr key={index} className="border">
                                        <td className="border p-2">{txn.id}</td> {/* ID */}
                                        <td className="border p-2">{txn.title}</td> {/* Title */}
                                        <td className="border p-2">{txn.description}</td> {/* Description */}
                                        <td className="border p-2 text-right">${txn.price}</td> {/* Price */}
                                        <td className="border p-2">{txn.category}</td> {/* Category */}
                                        <td className="border p-2 text-center">
                                            {txn.sold ? (
                                                <span className="text-green-600 font-bold">✔ Sold</span>
                                            ) : (
                                                <span className="text-red-600 font-bold">❌ Not Sold</span>
                                            )}
                                        </td> {/* Sold Status */}
                                        <td className="border p-2">
                                            <img
                                                src={txn.image}
                                                alt={txn.title}
                                                className="w-16 h-16 object-cover rounded-md"
                                            />
                                        </td> {/* Image */}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center p-4">No transactions found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex justify-between mt-4">
                        <button
                            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                        >
                            Previous
                        </button>
                        <span>Page {page}</span>
                        <button
                            className="px-4 py-2 bg-gray-300 rounded"
                            onClick={() => setPage(page + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>


            <div className="w-screen mt-8">
                <div className="w-screen max-w-[1200px] mx-auto p-4 bg-white shadow-lg rounded-lg overflow-hidden">
                    {/* Transaction Statistics */}
                    <TransactionStats month={month} />
                </div>

                <div className="w-screen max-w-[1200px] mx-auto p-4 bg-white shadow-lg rounded-lg overflow-hidden mt-8">
                    {/* Bar Chart */}
                    <TransactionsBarChart month={month} />
                </div>
            </div>
        </div>
    );
}