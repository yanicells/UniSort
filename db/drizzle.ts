import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { NeonHttpDatabase } from "drizzle-orm/neon-http";

let dbInstance: NeonHttpDatabase | null = null;

function getDatabase(): NeonHttpDatabase {
  if (!dbInstance) {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      throw new Error(
        "DATABASE_URL is not defined. Please add it to your .env.local file."
      );
    }

    // Create neon client 
    const sql = neon(databaseUrl);
    dbInstance = drizzle(sql);
  }

  return dbInstance;
}

export const db = new Proxy({} as NeonHttpDatabase, {
  get(_, prop) {
    const database = getDatabase();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (database as any)[prop];
  },
});
