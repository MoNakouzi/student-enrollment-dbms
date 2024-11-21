// Authors: CPS 510 Group 13
// Member 1: Mo Nakouzi
// Member 2: Prachi Patel
// Member 3: Mark Paul

'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

export default function HomePage() {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [queryResult, setQueryResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const tables = [
        'Advisor',
        'Antireq',
        'Completed',
        'Course',
        'Department',
        'Dropped',
        'Enrolled',
        'Faculty',
        'Instructor',
        'Lab',
        'LabTA',
        'Lecture',
        'Major',
        'Prereq',
        'Section',
        'Semesters',
        'ShoppingCart',
        'Student',
        'TA',
        'Teaches',
        'Waitlist',
        'Waitlisted',
    ];

    // Handle executing a raw query
    const executeQuery = async () => {
        setQueryResult(null);
        setError(null);
        setLoading(true);
        try {
            const response = await axios.post('/api/execute-query', { query });
            if (response.data.success) {
                setQueryResult(JSON.stringify(response.data.result, null, 2));
            } else {
                setError(response.data.error || 'Failed to execute query.');
            }
        } catch (err) {
            console.error(err);
            setError('Error executing query.');
        } finally {
            setLoading(false);
        }
    };

    // Handle batch table operations
    const handleBatchOperation = async (operation: string) => {
        setQueryResult(null);
        setError(null);
        setLoading(true);
        try {
            const response = await axios.post(`/api/tables/${operation}`);
            if (response.data.success) {
                setQueryResult(`${operation} operation completed successfully.`);
            } else {
                setError(response.data.error || `Failed to ${operation} tables.`);
            }
        } catch (err) {
            console.error(err);
            setError(`Error during ${operation} operation.`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Database Management Dashboard</h1>

            {/* Table Links Section */}
            <section>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tables</h2>
                <ul className="grid grid-cols-3 gap-4">
                    {tables.map((table) => (
                        <li key={table} className="flex justify-center">
                            <button
                                onClick={() => router.push(`/${table.toLowerCase()}`)}
                                className="w-full max-w-xs px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 shadow-sm"
                            >
                                {table}
                            </button>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Batch Operations Section */}
            <section>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Batch Operations</h2>
                <div className="space-x-4">
                    <button
                        onClick={() => handleBatchOperation('create')}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 shadow-sm"
                    >
                        Create All Tables
                    </button>
                    <button
                        onClick={() => handleBatchOperation('drop')}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 shadow-sm"
                    >
                        Drop All Tables
                    </button>
                    <button
                        onClick={() => handleBatchOperation('populate')}
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 shadow-sm"
                    >
                        Populate Tables
                    </button>
                </div>
            </section>

            {/* Query Execution Section */}
            <section>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Execute Query</h2>
                <textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Write your SQL query here..."
                    rows={5}
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                />
                <button
                    onClick={executeQuery}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 shadow-sm"
                >
                    Execute
                </button>
                {loading && <p className="text-gray-500 mt-4">Executing query...</p>}
                {error && <p className="text-red-500 mt-4">{error}</p>}
                {queryResult && (
                    <pre className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded text-sm overflow-x-auto">
                        {queryResult}
                    </pre>
                )}
            </section>
        </div>
    );
}
