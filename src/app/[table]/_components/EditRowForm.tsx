// Authors: CPS 510 Group 13
// Member 1: Mo Nakouzi
// Member 2: Prachi Patel
// Member 3: Mark Paul

"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface EditRowFormProps {
    table: string; // Table name from the dynamic route
    row: { [key: string]: any }; // The row data to be edited
}

export default function EditRowForm({ table, row }: EditRowFormProps) {
    const [formData, setFormData] = useState<{ [key: string]: any }>(row);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await axios.put(`/api/${table}`, formData); // API call to update the row
            router.push(`/${table}`); // Redirect to the table view after success
        } catch (err) {
            console.error("Error updating row:", err);
            setError("Failed to update row. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Edit Row in {table}</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                {Object.keys(row).map((key) => (
                    <div key={key} className="flex flex-col">
                        <label htmlFor={key} className="font-semibold text-gray-700">
                            {key}
                        </label>
                        <input
                            type="text"
                            id={key}
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                ))}
                <button
                    type="submit"
                    disabled={loading}
                    className={`px-4 py-2 text-white rounded ${
                        loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                >
                    {loading ? "Updating..." : "Update Row"}
                </button>
            </form>
        </div>
    );
}
