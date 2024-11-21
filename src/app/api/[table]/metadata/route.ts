import { NextRequest, NextResponse } from "next/server";
import { getOracleConnection } from "@/lib/db";

export async function GET(req: NextRequest, { params }: { params: { table: string } }) {
    try {
        const resolvedParams = await params;
        const table = resolvedParams.table;

        const connection = await getOracleConnection();

        const query = `SELECT column_name FROM user_tab_columns WHERE table_name = :table_name`;
        const result = await connection.execute(query, { table_name: table.toUpperCase() });

        await connection.close();

        const columns = result.rows?.map((row: any) => row[0]);

        return NextResponse.json({
            success: true,
            columns,
        });
    } catch (error) {
        console.error("Error fetching metadata:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch metadata.",
            },
            { status: 500 }
        );
    }
}
