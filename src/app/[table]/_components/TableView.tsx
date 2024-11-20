'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface TableViewProps {
    table: string; // Table name from the dynamic route
}

interface TableRow {
    [key: string]: any;
}

export default function TableView({ table }: TableViewProps) {
    const [data, setData] = useState<TableRow[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

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

    useEffect(() => {
        fetchData();
    }, [table]);

    const handleDelete = async (row: TableRow) => {
        if (!confirm('Are you sure you want to delete this row?')) return;

        try {
            await axios.delete(`/api/${table}`, { data: row });
            fetchData();
        } catch (err) {
            console.error('Error deleting row:', err);
            setError('Failed to delete row');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4 text-gray-700">{table.toUpperCase()} Table</h1>
            <table className="table-auto border-collapse border border-gray-400 w-full text-sm">
                <thead>
                    <tr className="bg-gray-200">
                        {Object.keys(data[0] || {}).map((key) => (
                            <th key={key} className="border px-4 py-2 text-left text-gray-800">
                                {key.replace(/_/g, ' ')}
                            </th>
                        ))}
                        <th className="border px-4 py-2 text-left text-gray-800">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            {Object.entries(row).map(([key, value]) => (
                                <td key={key} className="border px-4 py-2 text-gray-700">
                                    {value}
                                </td>
                            ))}
                            <td className="border px-4 py-2 space-y-2 flex flex-col">
                                <button
                                    onClick={() => router.push(`/${table}/edit/${index}`)}
                                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 shadow-sm"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(row)}
                                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 shadow-sm"
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
