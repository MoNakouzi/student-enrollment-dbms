"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface AddRowFormProps {
    table: string; // Table name from the dynamic route
    columnNames: string[]; // Array of column names for the table
}

export default function AddRowForm({ table, columnNames }: AddRowFormProps) {
    const [formData, setFormData] = useState<{ [key: string]: any }>({});
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

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

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Add New Row to {table}</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                {columnNames.map((column) => (
                    <div key={column} className="flex flex-col">
                        <label htmlFor={column} className="font-semibold mb-1">
                            {column}
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