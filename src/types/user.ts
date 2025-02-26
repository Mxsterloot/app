import { t } from "elysia";

export const userSchema = t.Object({
    name: t.String(),
    email: t.String(),
    password: t.String()
});

export const userUpdateSchema = t.Object({
    name: t.Optional(t.String()),
    email: t.Optional(t.String()),
    password: t.Optional(t.String())
});

export const idParamSchema = t.Object({
    id: t.String()
});