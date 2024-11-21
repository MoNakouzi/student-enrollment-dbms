import { NextRequest, NextResponse } from 'next/server';
import { getOracleConnection } from '@/lib/db';
import { queries } from '@/app/api/common/queries';
import oracledb from 'oracledb';

// Define a type for valid table names
type TableName = keyof typeof queries;

export async function GET(req: NextRequest, { params }: { params: { table: string } }) {
    try {
        const resolvedParams = await params;
        const table = resolvedParams.table as TableName;

        if (!queries[table] || !queries[table].selectAll) {
            return NextResponse.json(
                { success: false, error: `Select operation is not supported for table '${table}'.` },
                { status: 400 }
            );
        }

        const connection = await getOracleConnection();

        // Use OUT_FORMAT_OBJECT to get column names as keys
        const result = await connection.execute(queries[table].selectAll, [], {
            outFormat: oracledb.OUT_FORMAT_OBJECT,
        });

        await connection.close();

        return NextResponse.json({
            success: true,
            data: result.rows,
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({
            success: false,
            error: (error as any).message,
        });
    }
}

export async function POST(req: NextRequest, { params }: { params: { table: string } }) {
    try {
        const resolvedParams = await params;
        const table = resolvedParams.table as TableName;

        // Parse request body
        const body = await req.json();

        if (!queries[table] || !queries[table].insert) {
            return NextResponse.json(
                { success: false, error: `Insert operation is not supported for table '${table}'.` },
                { status: 400 }
            );
        }

        const connection = await getOracleConnection();

        console.log('Inserting data:', body);
        await connection.execute(queries[table].insert, body, { autoCommit: true });

        await connection.close();

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
        const resolvedParams = await params;
        const table = resolvedParams.table as TableName;

        // Parse request body
        const body = await req.json();

        if (!queries[table] || !queries[table].update) {
            return NextResponse.json(
                { success: false, error: `Update operation is not supported for table '${table}'.` },
                { status: 400 }
            );
        }

        const connection = await getOracleConnection();

        await connection.execute(queries[table].update, body, { autoCommit: true });

        await connection.close();

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
        const resolvedParams = await params;
        const table = resolvedParams.table as TableName;

        // Parse request body
        const body = await req.json();

        if (!queries[table] || !queries[table].delete) {
            return NextResponse.json(
                { success: false, error: `Delete operation is not supported for table '${table}'.` },
                { status: 400 }
            );
        }

        const connection = await getOracleConnection();

        // Extract the keys from the provided data
        const keys = queries[table].keys;
        const bindParams: { [key: string]: any } = {};
        keys.forEach((key: string) => {
            bindParams[key] = body[key];
        });

        // Construct the delete query dynamically
        const whereClause = keys.map((key: string) => `${key} = :${key}`).join(' AND ');
        const deleteQuery = `DELETE FROM ${table} WHERE ${whereClause}`;

        await connection.execute(deleteQuery, bindParams, { autoCommit: true });

        await connection.close();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting data:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete data.' },
            { status: 500 }
        );
    }
}
