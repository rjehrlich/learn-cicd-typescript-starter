import { describe, it, expect, test } from "vitest";
import type { IncomingHttpHeaders } from "http";
import { getAPIKey } from "../api/auth";

const person = {
    isActive: true,
    age: 32,
};

describe("getAPIKey", () => {
  it("returns null when authorization header is missing", () => {
    const headers = {} as IncomingHttpHeaders;
    expect(getAPIKey(headers)).toBeNull();
  });

  it("returns null for wrong scheme", () => {
    const headers = { authorization: "Bearer token" } as IncomingHttpHeaders;
    expect(getAPIKey(headers)).toBeNull();
  });

  it("returns null when header is malformed (no key)", () => {
    const headers = { authorization: "ApiKey" } as IncomingHttpHeaders;
    expect(getAPIKey(headers)).toBeNull();
  });

  it("returns the key when header is valid", () => {
    const headers = { authorization: "ApiKey my-secret-key" } as IncomingHttpHeaders;
    expect(getAPIKey(headers)).toBe("my-secret-key");
  });

  it("is case-sensitive for the scheme", () => {
    const headers = { authorization: "apikey my-secret-key" } as IncomingHttpHeaders;
    expect(getAPIKey(headers)).toBeNull();
  });
});

describe("person", () => {
  test("person is defined", () => {
    expect(person).toBeDefined();
  });

  test("is active", () => {
    expect(person.isActive).toBeTruthy();
  });
});
