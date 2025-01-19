import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import { routes } from "./routes";
import { bearer } from "@elysiajs/bearer";
import { jwt } from "@elysiajs/jwt";

const app = new Elysia()
  .use(swagger())
  .use(cors())
  .use(bearer())
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET || "ELYSIA_IS_MY_FAVORITE_FRAMEWORK",
    })
  )
  .use(routes)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
