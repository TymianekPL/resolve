import { type PoolConnection } from "mariadb";
import { pool } from "../db.js";

export const Errors = {
     "success": false,
     "already_exists": true
};

export const createUser = async (username: string, password: string, displayName: string): Promise<keyof typeof Errors> => {
     let connection: PoolConnection | null = null;

     try {
          connection = await pool.getConnection();

          await connection.beginTransaction();

          const insertUser = await connection.query<{ insertId: number; }>("insert into users (username, display_name) values (?, ?);", [username, displayName]);
          await connection.query("insert into user_preferences (id, language_id) values (?, null);", [insertUser.insertId]);
          await connection.query("insert into user_authentication (user_id, auth_type_id, is_primary, is_secondary, data) values (?, 1, true, false, ?);", [insertUser.insertId, password]);
          await connection.commit();
     }
     catch (error) {
          console.error(error);
          if (connection) connection.rollback();
          return "already_exists";
     }
     finally {
          if (connection) connection.release();
     }
     return "success";
};