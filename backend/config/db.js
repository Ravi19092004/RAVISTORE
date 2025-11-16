//backend/config/db.js
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

// creates a SQL connection using our env variables
export const sql = neon(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
);
// this sql function we export is used as a tagged template literal, which allows us to write SQL queries safely

// postgresql://PERN_owner:npg_T3dGLmhO6MEB@ep-red-smoke-a8thcksa-pooler.eastus2.azure.neon.tech/PERN?sslmode=require