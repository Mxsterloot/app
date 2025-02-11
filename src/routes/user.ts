import Elysia from "elysia";
import { db } from "../utils/drizzle";
import { user } from "../schema/user.schema";
export const userRoutes = new Elysia().get("/api/users", async () => {
  try {
    const users = await db.select().from(user).limit(10);
    return users;
  } catch (error) {
    return { error: "Internal server error" };
  }
});

export const helloRoutes = new Elysia().get("/api/hello", async () => {
  return { message: "Hello World" };
});
