import mariadb, { type Pool, type PoolConnection } from "mariadb";

export let pool: Pool;

export const checkDb = async () => {
    if (!process.env["DB_USER"] || !process.env["DB_NAME"]) {
        throw "Environment not defined.";
    }
    if (!process.env["DB_PASSWORD"]) {
        console.warn("Empty db password");
    }
    pool = mariadb.createPool({
        host: process.env["DB_HOST"] ?? "localhost",
        port: parseInt(process.env["DB_PORT"] ?? "3306"),
        user: process.env["DB_USER"]!,
        password: process.env["DB_PASSWORD"] ?? "",
        database: process.env["DB_NAME"]!
    });

    let connection: PoolConnection | null = null;
    try {
        connection = await pool.getConnection();
        await connection.query("SELECT 1;");
        console.log("Connected to the database");
    }
    finally {
        if (connection) connection.release();
    }
};
