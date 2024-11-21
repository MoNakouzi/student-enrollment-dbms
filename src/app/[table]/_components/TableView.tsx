// Authors: CPS 510 Group 13
// Member 1: Mo Nakouzi
// Member 2: Prachi Patel
// Member 3: Mark Paul

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import DeleteConfirmation from './DeleteConfirmation';

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
    const [deleteRowData, setDeleteRowData] = useState<TableRow | null>(null);
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

    const handleAdd = () => {
        router.push(`/${table}/add`);
    };

    const handleBack = () => {
        router.push(`/`);
    };

    const handleDeleteSuccess = () => {
        fetchData(); // Refresh data after successful deletion
        setDeleteRowData(null); // Close the delete confirmation modal
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4 text-gray-700">{table.toUpperCase()} Table</h1>
            <div className='space-x-2'>
                <button
                    onClick={handleAdd}
                    className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Add Row
                </button>
                <button
                    onClick={handleBack}
                    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Go Back
                </button>
            </div>

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
                                    onClick={() => setDeleteRowData(row)}
                                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 shadow-sm"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {deleteRowData && (
                <DeleteConfirmation
                    table={table}
                    rowData={deleteRowData}
                    onDeleteSuccess={handleDeleteSuccess}
                    onClose={() => setDeleteRowData(null)}
                />
            )}
        </div>
    );
}
