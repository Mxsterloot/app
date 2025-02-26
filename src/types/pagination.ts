import { t } from "elysia";

/**
 * Pagination query parameters
 * @description This is a helper type for pagination queries.
 * @example
 * ```ts
 * const pagination = { search: "test", page: 1, limit: 10 };
 * ```
 */
export const paginationSchema = t.Object({
    search: t.Optional(t.String()),
    page: t.Optional(t.Numeric()),
    limit: t.Optional(t.Numeric())
});