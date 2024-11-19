import oracledb from 'oracledb';
import { TableSchema } from '@/types/tables';

/**
 * Executes a query against the Oracle database and returns the result.
 *
 * @param query - SQL query to execute.
 * @param params - Optional parameters for the query.
 * @returns - Result of the query execution.
 */
export async function executeQuery<T extends TableSchema>(query: string, params: any[] = []): Promise<T[]> {
    let connection: oracledb.Connection | null = null;

    try {
        // Establish connection
        connection = await oracledb.getConnection();

        // Execute the query
        const result = await connection.execute(query, params, { outFormat: oracledb.OUT_FORMAT_OBJECT });

        // Return the rows as typed data
        return result.rows as T[];
    } catch (error) {
        console.error('Error executing query:', error);
        throw new Error('Failed to execute database query');
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Error closing connection:', err);
            }
        }
    }
}

/**
 * Maps database row data to the appropriate table schema.
 *
 * @param rows - Rows fetched from the database.
 * @returns - Mapped data in the correct format.
 */
export function mapRowsToSchema<T extends TableSchema>(rows: any[], keys: (keyof T)[]): T[] {
    return rows.map((row) => {
        const mappedRow: Partial<T> = {};
        keys.forEach((key, index) => {
            mappedRow[key] = row[index];
        });
        return mappedRow as T;
    });
}

/**
 * Generates a dynamic SQL query for inserting data into a table.
 *
 * @param tableName - Name of the table.
 * @param data - Object containing the data to insert.
 * @returns - A query string and parameter array.
 */
export function generateInsertQuery(tableName: string, data: Record<string, any>): { query: string; params: any[] } {
    const keys = Object.keys(data);
    const placeholders = keys.map(() => '?').join(', ');
    const query = `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${placeholders})`;

    return { query, params: Object.values(data) };
}

/**
 * Generates a dynamic SQL query for updating data in a table.
 *
 * @param tableName - Name of the table.
 * @param data - Object containing the data to update.
 * @param whereClause - WHERE clause for the update.
 * @returns - A query string and parameter array.
 */
export function generateUpdateQuery(
    tableName: string,
    data: Record<string, any>,
    whereClause: string
): { query: string; params: any[] } {
    const keys = Object.keys(data);
    const setClause = keys.map((key) => `${key} = ?`).join(', ');
    const query = `UPDATE ${tableName} SET ${setClause} WHERE ${whereClause}`;

    return { query, params: Object.values(data) };
}

/**
 * Generates a dynamic SQL query for deleting data from a table.
 *
 * @param tableName - Name of the table.
 * @param whereClause - WHERE clause for the delete.
 * @returns - A query string.
 */
export function generateDeleteQuery(tableName: string, whereClause: string): string {
    return `DELETE FROM ${tableName} WHERE ${whereClause}`;
}
