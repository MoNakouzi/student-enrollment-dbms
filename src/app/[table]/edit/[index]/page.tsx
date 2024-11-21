// Authors: CPS 510 Group 13
// Member 1: Mo Nakouzi
// Member 2: Prachi Patel
// Member 3: Mark Paul

'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';

export default function EditRowForm() {
    const router = useRouter();
    const params = useParams();
    const table = params.table;
    const index = Array.isArray(params.index) ? params.index[0] : params.index; // Ensure `index` is a string
    const [formData, setFormData] = useState<{ [key: string]: any } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch the specific row data based on index
    useEffect(() => {
        if (!index) {
            setError('Invalid index provided.');
            setLoading(false);
            return;
        }

        const fetchRowData = async () => {
            try {
                const response = await axios.get(`/api/${table}`);
                if (response.data.success && response.data.data[+index]) {
                    setFormData(response.data.data[+index]); // Use `+index` to cast the string to a number
                } else {
                    setError('Row data not found.');
                }
            } catch (err) {
                console.error('Error fetching row data:', err);
                setError('Failed to fetch row data.');
            } finally {
                setLoading(false);
            }
        };

        fetchRowData();
    }, [table, index]);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!formData) {
                alert('No data to submit.');
                return;
            }

            await axios.put(`/api/${table}`, formData);

            router.push(`/${table}`);
        } catch (err) {
            console.error('Error updating row:', err);
            alert('Failed to update row.');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-w-md mx-auto">
            {formData &&
                Object.entries(formData).map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                        <label htmlFor={key} className="text-gray-600">
                            {key}
                        </label>
                        <input
                            type="text"
                            id={key}
                            name={key}
                            value={value || ''}
                            onChange={handleChange}
                            className="border rounded px-2 py-1"
                        />
                    </div>
                ))}
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Update
            </button>
        </form>
    );
}
