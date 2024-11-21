// Authors: CPS 510 Group 13
// Member 1: Mo Nakouzi
// Member 2: Prachi Patel
// Member 3: Mark Paul

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddRowForm({ table }: { table: string }) {
    const [formData, setFormData] = useState<{ [key: string]: any }>({});
    const [columns, setColumns] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Fetch column names for the table
    useEffect(() => {
        const fetchColumns = async () => {
            try {
                const response = await axios.get(`/api/${table}/metadata`);
                if (response.data.success) {
                    console.log(response.data.columns);
                    setColumns(response.data.columns);
                } else {
                    setError('Failed to fetch column data');
                }
            } catch (err) {
                console.error("Error fetching columns:", err);
                setError("Failed to fetch column metadata.");
            }
        };

        fetchColumns();
    }, [table]);

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Send the data to the API
            await axios.post(`/api/${table}`, formData);
            router.push(`/${table}`); // Redirect back to the table page
        } catch (err) {
            console.error("Error adding row:", err);
            setError("Failed to add row. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!columns.length) {
        return <p>Loading form...</p>;
    }

    return (
        <div className="p-6 w-full lg:w-2/3 mx-auto">
            <h1 className="text-2xl font-bold mb-4">Add New Row to {table}</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                {columns.map((column) => (
                    <div key={column} className="flex flex-col">
                        <label htmlFor={column} className="font-semibold mb-1">
                            {column.replace(/_/g, " ")}
                        </label>
                        <input
                            type="text"
                            id={column}
                            name={column}
                            value={formData[column] || ""}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-3 py-2"
                        />
                    </div>
                ))}
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    {loading ? "Adding..." : "Add Row"}
                </button>
            </form>
        </div>
    );
}
