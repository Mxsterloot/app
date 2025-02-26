import { Elysia, t } from "elysia";
import { PrismaClient } from "@prisma/client";
import { swagger } from "@elysiajs/swagger";
import { paginationSchema, userSchema, userUpdateSchema, idParamSchema } from "../types";
const db = new PrismaClient();

// Error handling utility
const handleError = (error: any) => {
  console.error('Operation failed:', error);
  if (error.code === 'P2025') {
    return { error: "Record not found" };
  }
  if (error.code === 'P2002') {
    return { error: "Unique constraint violation" };
  }
  return { error: "Internal server error" };
};

export const userRoutes = new Elysia({ prefix: "/users" })
  .use(swagger())
  .get("/",
    async ({ query }) => {
      try {
        const page = Number(query?.page) || 1;
        const limit = Number(query?.limit) || 10;
        const skip = (page - 1) * limit;

        const [users, total] = await Promise.all([
          db.user.findMany({
            where: {
              OR: query?.search ? [
                { name: { contains: query.search, mode: "insensitive" } },
                { email: { contains: query.search, mode: "insensitive" } }
              ] : undefined
            },
            select: {
              id: true,
              name: true,
              email: true,
              createdAt: true,
              updatedAt: true
            },
            skip,
            take: limit
          }),
          db.user.count({ where: {
            OR: query?.search ? [
              { name: { contains: query.search, mode: "insensitive" } },
              { email: { contains: query.search, mode: "insensitive" } }
            ] : undefined
          }})
        ]);

        return {
          success: true,
          data: users,
          pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
          }
        };
      } catch (error) {
        return handleError(error);
      }
    },
    {
      query: paginationSchema,
      detail: {
        summary: "Get all users with search and pagination",
        tags: ["Users"]
      }
    }
  )
  .post("/",
    async ({ body }) => {
      try {
        const user = await db.user.create({
          data: body,
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true
          }
        });
        return { success: true, data: user };
      } catch (error) {
        return handleError(error);
      }
    },
    {
      body: userSchema,
      detail: {
        summary: "Create a new user",
        tags: ["Users"]
      }
    }
  )
  .get("/:id",
    async ({ params: { id } }) => {
      try {
        const user = await db.user.findUnique({
          where: { id: parseInt(id) },
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true
          }
        });
        if (!user) return { error: "User not found" };
        return { success: true, data: user };
      } catch (error) {
        return handleError(error);
      }
    },
    {
      params: idParamSchema,
      detail: {
        summary: "Get user by ID",
        tags: ["Users"]
      }
    }
  )
  .put("/:id",
    async ({ params: { id }, body }) => {
      try {
        const user = await db.user.update({
          where: { id: parseInt(id) },
          data: body,
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true
          }
        });
        return { success: true, data: user };
      } catch (error) {
        return handleError(error);
      }
    },
    {
      params: idParamSchema,
      body: userUpdateSchema,
      detail: {
        summary: "Update user",
        tags: ["Users"]
      }
    }
  )
  .delete("/:id",
    async ({ params: { id } }) => {
      try {
        await db.user.delete({
          where: { id: parseInt(id) }
        });
        return {
          success: true,
          message: "User deleted successfully"
        };
      } catch (error) {
        return handleError(error);
      }
    },
    {
      params: idParamSchema,
      detail: {
        summary: "Delete user",
        tags: ["Users"]
      }
    }
  );

export const helloRoutes = new Elysia()
  .get("/hello",
    async () => {
      return {
        success: true,
        message: "Hello World"
      };
    }
  );
