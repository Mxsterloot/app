import { Elysia, t } from "elysia";
import { userRoutes } from "./user";
import { helloRoutes } from "./user";

export const routes = new Elysia().use(userRoutes).use(helloRoutes);

export type Routes = typeof routes;
