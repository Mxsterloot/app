import { describe, expect, it } from "bun:test";
import "../src/index";
import { edenTreaty } from "@elysiajs/eden";
import type { App } from "../src/index";

const treaty = edenTreaty<App>("http://localhost:3000");

describe("Get Users", () => {
  it("return a response", async () => {
    const { data } = await treaty.api.users.get();

    expect(data).toBeArray();
    expect(data?.length).toBeGreaterThan(0);
  });

  it("return a response with jwt", async () => {
    const { data } = await treaty.api.users.get();

    expect(data).toBeArray();
    expect(data?.length).toBeGreaterThan(1);
  });
});
