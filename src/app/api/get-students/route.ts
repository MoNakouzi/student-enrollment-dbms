// Authors: CPS 510 Group 13
// Member 1: Mo Nakouzi
// Member 2: Prachi Patel
// Member 3: Mark Paul

import { NextRequest, NextResponse } from 'next/server';
import { getOracleConnection } from '@/lib/db';

// Define a type for the Student row
type StudentRow = [
    number, // STUDENT_ID
    string, // FIRST_NAME
    string, // LAST_NAME
    string, // EMAIL
    number, // OUTSTANDING_FEES
    string, // ACADEMIC_STANDING
    number, // CURRENT_YEAR
    number, // CGPA
    number, // CREDITS_EARNED
    number | null // MAJOR_ID (nullable)
];

// API Route to get students
export async function GET(req: NextRequest) {
    try {
        // Connect to Oracle DB
        const connection = await getOracleConnection();

        // Execute the query to get all students
        const result = await connection.execute(`SELECT * FROM Student`);

        // Close the connection
        await connection.close();

        // Map and format the rows
        const students = (result.rows as StudentRow[]).map(row => ({
            STUDENT_ID: row[0],
            FIRST_NAME: row[1],
            LAST_NAME: row[2],
            EMAIL: row[3],
            OUTSTANDING_FEES: row[4],
            ACADEMIC_STANDING: row[5],
            CURRENT_YEAR: row[6],
            CGPA: row[7],
            CREDITS_EARNED: row[8],
            MAJOR_ID: row[9],
        }));

        // Return the students as JSON
        return NextResponse.json({
            success: true,
            data: students,
        });
    } catch (error) {
        // Log and return the error
        console.error('Error getting students:', error);

        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch students',
            },
            { status: 500 }
        );
    }
}
