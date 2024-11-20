import { NextRequest, NextResponse } from 'next/server';
import { getOracleConnection } from '@/lib/db';
import { queries } from '@/app/api/common/queries';
import oracledb from 'oracledb';

// Define a type for valid table names
type TableName = keyof typeof queries;

export async function GET(req: NextRequest, { params }: { params: { table: string } }) {
    const table = params.table as TableName;

    try {
        const connection = await getOracleConnection();

        // Use OUT_FORMAT_OBJECT to get column names as keys
        const result = await connection.execute(queries[table].selectAll, [], { outFormat: oracledb.OUT_FORMAT_OBJECT });

        await connection.close();

        // Return rows directly since they already have meaningful keys
        return NextResponse.json({
            success: true,
            data: result.rows, // Rows are objects with column names as keys
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch data.' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest, { params }: { params: { table: string } }) {
    try {
        const table = params.table as TableName;

        // Parse request body
        const body = await req.json();

        // Ensure the table exists in the queries and supports INSERT
        if (!queries[table] || !queries[table].insert) {
            return NextResponse.json(
                { success: false, error: `Insert operation is not supported for table '${table}'.` },
                { status: 400 }
            );
        }

        // Connect to Oracle DB
        const connection = await getOracleConnection();

        // Execute the INSERT query for the specified table
        await connection.execute(queries[table].insert, body, { autoCommit: true });

        // Close the connection
        await connection.close();

        // Return success response
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error inserting data:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to insert data.' },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest, { params }: { params: { table: string } }) {
    try {
        const table = params.table as TableName;

        // Parse request body
        const body = await req.json();

        // Ensure the table exists in the queries and supports UPDATE
        if (!queries[table] || !queries[table].update) {
            return NextResponse.json(
                { success: false, error: `Update operation is not supported for table '${table}'.` },
                { status: 400 }
            );
        }

        // Connect to Oracle DB
        const connection = await getOracleConnection();

        // Execute the UPDATE query for the specified table
        await connection.execute(queries[table].update, body, { autoCommit: true });

        // Close the connection
        await connection.close();

        // Return success response
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating data:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update data.' },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { table: string } }) {
    try {
        const table = params.table as TableName;

        // Parse request body
        const body = await req.json();

        // Ensure the table exists in the queries and supports DELETE
        if (!queries[table] || !queries[table].delete) {
            return NextResponse.json(
                { success: false, error: `Delete operation is not supported for table '${table}'.` },
                { status: 400 }
            );
        }

        // Connect to Oracle DB
        const connection = await getOracleConnection();

        // Execute the DELETE query for the specified table
        const updated_body = {STUDENT_ID: body.STUDENT_ID};
        await connection.execute(queries[table].delete, updated_body, { autoCommit: true });

        // Close the connection
        await connection.close();

        // Return success response
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting data:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete data.' },
            { status: 500 }
        );
    }
}
