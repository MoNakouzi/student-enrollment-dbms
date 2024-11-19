import { NextRequest, NextResponse } from 'next/server';
import { getOracleConnection } from '@/lib/db';
import { queries } from '@/app/api/common/queries';

// Define a type for valid table names
type TableName = keyof typeof queries;

export async function GET(req: NextRequest, { params }: { params: { table: TableName } }) {
    try {
        const { table } = params;

        // Ensure the table exists in the queries
        if (!queries[table]) {
            return NextResponse.json(
                { success: false, error: `Table '${table}' is not supported.` },
                { status: 400 }
            );
        }

        // Connect to Oracle DB
        const connection = await getOracleConnection();

        // Execute the SELECT ALL query for the specified table
        const result = await connection.execute(queries[table].selectAll);

        // Close the connection
        await connection.close();

        // Return the data as JSON
        return NextResponse.json({
            success: true,
            data: result.rows,
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch data.' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest, { params }: { params: { table: TableName } }) {
    try {
        const { table } = params;

        // Parse request body
        const body = await req.json();

        // Ensure the table exists in the queries
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

export async function PUT(req: NextRequest, { params }: { params: { table: TableName } }) {
    try {
        const { table } = params;

        // Parse request body
        const body = await req.json();

        // Ensure the table exists in the queries
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

export async function DELETE(req: NextRequest, { params }: { params: { table: TableName } }) {
    try {
        const { table } = params;

        // Parse request body
        const body = await req.json();

        // Ensure the table exists in the queries
        if (!queries[table] || !queries[table].delete) {
            return NextResponse.json(
                { success: false, error: `Delete operation is not supported for table '${table}'.` },
                { status: 400 }
            );
        }

        // Connect to Oracle DB
        const connection = await getOracleConnection();

        // Execute the DELETE query for the specified table
        await connection.execute(queries[table].delete, body, { autoCommit: true });

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
