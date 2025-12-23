import { drizzle } from "drizzle-orm/neon-http";
import { NeonHttpDatabase } from "drizzle-orm/neon-http";

let dbInstance: NeonHttpDatabase | null = null;

function getDatabase() {
  if (!dbInstance) {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      throw new Error(
        "DATABASE_URL is not defined. Please add it to your .env.local file."
      );
    }

    dbInstance = drizzle(databaseUrl);
  }

  return dbInstance;
}

export const db = new Proxy({} as NeonHttpDatabase, {
  get(_, prop) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (getDatabase() as any)[prop];
  },
});
