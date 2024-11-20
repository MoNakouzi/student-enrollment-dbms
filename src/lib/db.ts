// Authors: CPS 510 Group 13
// Member 1: Mo Nakouzi
// Member 2: Prachi Patel
// Member 3: Mark Paul

import oracledb from 'oracledb';

// Type definitions for the Oracle DB connection
interface OracleDBConfig {
    user: string;
    password: string;
    connectString: string;
};

// Function to get the Oracle DB connection
export async function getOracleConnection(): Promise<oracledb.Connection> {
    try {
        const config: OracleDBConfig = {
            user: process.env.ORACLE_USER || '',
            password: process.env.ORACLE_PASSWORD || '',
            connectString: process.env.ORACLE_CONNECTION_STRING || '',
        }

        if (!config.user || !config.password || !config.connectString) {
            throw new Error('Database connection parameters are missing in the environment variables');
        }

        const connection = await oracledb.getConnection(config);
        return connection;
    }
    catch (error) {
        console.error('Error connecting to Oracle DB:', error);
        throw error;
    }
}

// Function to close an Oracle DB connection
export async function closeOracleConnection(connection: oracledb.Connection): Promise<void> {
    try {
        await connection.close();
        console.log('Oracle DB connection closed successfully');
    }
    catch (error) {
        console.error('Error closing Oracle DB connection:', error);
        throw error;
    }
}