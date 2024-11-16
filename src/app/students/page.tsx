// Authors: CPS 510 Group 13
// Member 1: Mo Nakouzi
// Member 2: Prachi Patel
// Member 3: Mark Paul

'use client';

import { useState, useEffect } from "react";
import StudentTable from "@/components/StudentTable";

export default function StudentsPage() {
    const [students, setStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStudents = async() => {
            try {
                const res = await fetch("/api/get-students");
                if (!res.ok) throw new Error(`Error: ${res.statusText}`);
                const result = await res.json();
                console.log("Result: ", result);
                setStudents(result.data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchStudents();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Student Table:</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && <StudentTable students={students} />}
        </div>
    );
}
