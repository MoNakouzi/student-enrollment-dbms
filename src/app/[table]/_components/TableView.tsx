'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

// Props to define the table's structure dynamically
interface TableViewProps {
    table: string; // Table name from the dynamic route
}

// Generic type for table rows
interface TableRow {
    [key: string]: any;
}

export default function TableView({ table }: TableViewProps) {
    const [data, setData] = useState<TableRow[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch data from the API
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/${table}`);
            if (response.data.success) {
                setData(response.data.data);
            } else {
                setError(response.data.error || 'Failed to fetch data');
            }
        } catch (err) {
            setError('Error fetching data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchData();
    }, [table]);

    // Handle adding a new row
    const handleAdd = async () => {
        const newRow: TableRow = {}; // Define the structure for a new row dynamically
        // Example: prompt user for values
        Object.keys(data[0] || {}).forEach((key) => {
            newRow[key] = prompt(`Enter value for ${key}`);
        });

        try {
            await axios.post(`/api/${table}`, newRow);
            fetchData(); // Refresh data
        } catch (err) {
            console.error('Error adding row:', err);
            setError('Failed to add row');
        }
    };

    // Handle editing a row
    const handleEdit = async (row: TableRow) => {
        const updatedRow = { ...row };
        Object.keys(row).forEach((key) => {
            const newValue = prompt(`Edit value for ${key}`, row[key]);
            if (newValue !== null) updatedRow[key] = newValue;
        });

        try {
            await axios.put(`/api/${table}`, updatedRow);
            fetchData(); // Refresh data
        } catch (err) {
            console.error('Error updating row:', err);
            setError('Failed to update row');
        }
    };

    // Handle deleting a row
    const handleDelete = async (row: TableRow) => {
        if (!confirm('Are you sure you want to delete this row?')) return;

        try {
            await axios.delete(`/api/${table}`, { data: row });
            fetchData(); // Refresh data
        } catch (err) {
            console.error('Error deleting row:', err);
            setError('Failed to delete row');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Table: {table}</h1>
            <button
                onClick={handleAdd}
                className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
                Add Row
            </button>
            <table className="table-auto border-collapse border border-gray-300 w-full">
                <thead>
                    <tr className="bg-gray-100">
                        {Object.keys(data[0] || {}).map((key) => (
                            <th key={key} className="border px-4 py-2">
                                {key}
                            </th>
                        ))}
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {Object.entries(row).map(([key, value]) => (
                                <td key={key} className="border px-4 py-2">
                                    {value}
                                </td>
                            ))}
                            <td className="border px-4 py-2 space-x-2">
                                <button
                                    onClick={() => handleEdit(row)}
                                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(row)}
                                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
