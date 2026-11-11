import { describe, expect, it } from "vitest";
import { TOKENIZATION_EXAMPLE, tokenizationEconomics } from "./tokenization-example";

describe("document-supplied tokenization example", () => {
  it("issues 400 tokens at $100 for 40% of a $100,000 asset", () => {
    const result = tokenizationEconomics();
    expect(result.tokensIssued).toBe(400);
    expect(TOKENIZATION_EXAMPLE.tokenPrice).toBe(100);
    expect(result.offeringValue).toBe(40_000);
    expect(result.untokenizedPercent).toBe(60);
  });
  it("raises $40,000 only when all 400 tokens are sold", () => {
    expect(tokenizationEconomics().capitalIfAllSold).toBe(40_000);
  });
  it("accounts for 10% retained tokens rather than claiming they were sold", () => {
    const result = tokenizationEconomics();
    expect(result.ownerTokens).toBe(40);
    expect(result.capitalWithOwnerRetention).toBe(36_000);
  });
  it("allocates $800 monthly rent proportionally to the 40% tokenized share", () => {
    const result = tokenizationEconomics();
    expect(result.tokenHoldersMonthlyRent).toBe(320);
    expect(result.untokenizedOwnerMonthlyRent).toBe(480);
  });
  it("preserves the illustrative 2% resale royalty", () => {
    expect(TOKENIZATION_EXAMPLE.resaleRoyaltyPercent).toBe(2);
  });
});