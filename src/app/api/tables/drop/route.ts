import { NextResponse } from 'next/server';
import { getOracleConnection } from '@/lib/db';

// SQL Queries for Dropping Tables
const dropTableQueries: string[] = [
    // Step 1: Drop tables with direct dependencies on other tables
    `DROP TABLE ShoppingCart CASCADE CONSTRAINTS`,
    `DROP TABLE Dropped CASCADE CONSTRAINTS`,
    `DROP TABLE Completed CASCADE CONSTRAINTS`,
    `DROP TABLE Waitlisted CASCADE CONSTRAINTS`,
    `DROP TABLE Waitlist CASCADE CONSTRAINTS`,
    `DROP TABLE Enrolled CASCADE CONSTRAINTS`,
    `DROP TABLE Prereq CASCADE CONSTRAINTS`,
    `DROP TABLE Antireq CASCADE CONSTRAINTS`,
    `DROP TABLE Lecture CASCADE CONSTRAINTS`,
    `DROP TABLE LabTA CASCADE CONSTRAINTS`,
    `DROP TABLE Lab CASCADE CONSTRAINTS`,
    `DROP TABLE Section CASCADE CONSTRAINTS`,
    `DROP TABLE Teaches CASCADE CONSTRAINTS`,

    // Step 2: Drop tables with dependencies on Instructor, TA, and Course
    `DROP TABLE TA CASCADE CONSTRAINTS`,
    `DROP TABLE Instructor CASCADE CONSTRAINTS`,
    `DROP TABLE Course CASCADE CONSTRAINTS`,

    // Step 3: Drop tables with dependencies on Major and Department
    `DROP TABLE Semesters CASCADE CONSTRAINTS`,
    `DROP TABLE Student CASCADE CONSTRAINTS`,
    `DROP TABLE Major CASCADE CONSTRAINTS`,

    // Step 4: Drop Department, Advisor, and Faculty
    `DROP TABLE Department CASCADE CONSTRAINTS`,
    `DROP TABLE Advisor CASCADE CONSTRAINTS`,
    `DROP TABLE Faculty CASCADE CONSTRAINTS`,
];

export async function POST() {
    const connection = await getOracleConnection();
    const droppedTables: string[] = [];
    const errors: { table: string; error: any }[] = [];

    try {
        for (const query of dropTableQueries) {
            const tableName = query.match(/DROP TABLE (\w+)/)?.[1] || 'Unknown';
            try {
                await connection.execute(query);
                droppedTables.push(tableName);
            } catch (error) {
                console.error(`Error dropping table ${tableName}:`, error);
                errors.push({ table: tableName, error });
            }
        }
    } finally {
        await connection.close();
    }

    return NextResponse.json({
        success: true,
        message: 'Table dropping process completed.',
        droppedTables,
        errors,
    });
}
