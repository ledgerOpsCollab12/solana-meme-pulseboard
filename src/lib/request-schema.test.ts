import { describe, expect, it } from "vitest";
import { PROGRAM_URL, requestSchema } from "./request-schema";

const valid = { kind: "api", name: "Visitor", email: "visitor@example.com", message: "I would like API access." };
describe("Landing requests", () => {
  it("links directly to the supplied program", () => expect(PROGRAM_URL).toBe("https://memewalletscan.com"));
  it("requires a name", () => expect(requestSchema.safeParse({ ...valid, name: " " }).success).toBe(false));
  it("requires a valid email", () => expect(requestSchema.safeParse({ ...valid, email: "invalid" }).success).toBe(false));
  it("requires request details", () => expect(requestSchema.safeParse({ ...valid, message: " " }).success).toBe(false));
  it("limits message length", () => expect(requestSchema.safeParse({ ...valid, message: "a".repeat(2001) }).success).toBe(false));
  it("rejects unknown form kinds", () => expect(requestSchema.safeParse({ ...valid, kind: "other" }).success).toBe(false));
  it("rejects filled honeypots", () => expect(requestSchema.safeParse({ ...valid, website: "spam" }).success).toBe(false));
  it("accepts recommendations and trims fields", () => expect(requestSchema.parse({ ...valid, kind: "recommendation", name: " Visitor " }).name).toBe("Visitor"));
  it("accepts a meeting answer on API requests", () => expect(requestSchema.safeParse({ ...valid, meeting: "yes" }).success).toBe(true));
  it("rejects an unknown meeting answer", () => expect(requestSchema.safeParse({ ...valid, meeting: "maybe" }).success).toBe(false));
  it("keeps the meeting answer optional", () => expect(requestSchema.safeParse({ ...valid, kind: "recommendation" }).data?.meeting).toBeUndefined());
});