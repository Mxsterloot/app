import { Elysia, t } from "elysia";
import { userRoutes } from "./user";

export const routes = new Elysia().use(userRoutes);

export type Routes = typeof routes;
