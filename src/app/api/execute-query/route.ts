/* import { NextRequest, NextResponse } from 'next/server';
import { getOracleConnection } from '@/lib/db';
import oracledb from 'oracledb';

export async function POST(req: NextRequest) {
    try {
        const { query } = await req.json();

        if (!query || typeof query !== 'string') {
            return NextResponse.json(
                { success: false, error: 'Invalid query provided.' },
                { status: 400 }
            );
        }

        const sanitizedQuery = query.trim().replace(/;$/, ''); // Remove trailing semicolon
        console.log('Executing Query:', sanitizedQuery);

        const connection = await getOracleConnection();

        try {
            const result = await connection.execute(sanitizedQuery, {}, { 
                outFormat: oracledb.OUT_FORMAT_OBJECT, 
                autoCommit: true 
            });

            // If the query is a SELECT, return the rows
            if (sanitizedQuery.toUpperCase().startsWith('SELECT')) {
                return NextResponse.json({
                    success: true,
                    data: result.rows || [],
                });
            }

            // Otherwise, return success with rows affected (INSERT, UPDATE, DELETE)
            return NextResponse.json({
                success: true,
                message: 'Query executed successfully.',
                rowsAffected: result.rowsAffected || 0,
            });
        } finally {
            await connection.close();
        }
    } catch (error) {
        console.error('Error executing query:', error);
        return NextResponse.json(
            { success: false, error: (error as any).message || 'Failed to execute query.' },
            { status: 500 }
        );
    }
}
*/

import { NextRequest, NextResponse } from 'next/server';
import { getOracleConnection } from '@/lib/db';
import oracledb from 'oracledb';

export async function POST(req: NextRequest) {
    try {
        const { query } = await req.json();

        if (!query || typeof query !== 'string') {
            return NextResponse.json(
                { success: false, error: 'Invalid query provided.' },
                { status: 400 }
            );
        }

        // Sanitize the query by removing trailing semicolon
        const sanitizedQuery = query.trim().replace(/;$/, '');
        console.log('Executing Query:', sanitizedQuery);

        const connection = await getOracleConnection();

        try {
            const result = await connection.execute(sanitizedQuery, {}, {
                outFormat: oracledb.OUT_FORMAT_OBJECT,
                autoCommit: true,
            });
            
            // Check the type of query and return appropriate response
            if (sanitizedQuery.toUpperCase().startsWith('SELECT')) {
                return NextResponse.json({
                    success: true,
                    data: result.rows || [],
                });
            } else {
                return NextResponse.json({
                    success: true,
                    message: 'Query executed successfully.',
                    rowsAffected: result.rowsAffected || 0,
                });
            }
        } finally {
            await connection.close();
        }
    } catch (error) {
        console.error('Error executing query:', error);
        return NextResponse.json(
            { success: false, error: (error as any).message || 'Failed to execute query.' },
            { status: 500 }
        );
    }
}

