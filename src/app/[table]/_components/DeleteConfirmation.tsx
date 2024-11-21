// Authors: CPS 510 Group 13
// Member 1: Mo Nakouzi
// Member 2: Prachi Patel
// Member 3: Mark Paul

'use client';

import { useState } from 'react';
import axios from 'axios';

interface DeleteConfirmationProps {
    table: string; // The table name from which the row will be deleted
    rowData: { [key: string]: any }; // The data of the row to be deleted
    onDeleteSuccess: () => void; // Callback to trigger after successful deletion
    onClose: () => void; // Callback to close the modal
}

export default function DeleteConfirmation({
    table,
    rowData,
    onDeleteSuccess,
    onClose,
}: DeleteConfirmationProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async () => {
        setLoading(true);
        setError(null);

        try {
            await axios.delete(`/api/${table}`, { data: rowData });
            onDeleteSuccess(); // Notify parent about successful deletion
        } catch (err) {
            console.error('Error deleting row:', err);
            setError('Failed to delete the row. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    Confirm Deletion
                </h2>
                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete this row? This action cannot be undone.
                </p>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        disabled={loading}
                    >
                        {loading ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
}
