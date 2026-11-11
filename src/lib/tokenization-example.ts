// Illustrative economics from the supplied Tokenization brief, not a live offer.
export const TOKENIZATION_EXAMPLE = Object.freeze({
  assetValue: 100_000,
  tokenizedPercent: 40,
  tokenPrice: 100,
  ownerTokenPercent: 10,
  resaleRoyaltyPercent: 2,
  monthlyRent: 800,
});

export function tokenizationEconomics(example = TOKENIZATION_EXAMPLE) {
  const offeringValue = example.assetValue * example.tokenizedPercent / 100;
  const tokensIssued = offeringValue / example.tokenPrice;
  const ownerTokens = tokensIssued * example.ownerTokenPercent / 100;
  return {
    tokensIssued,
    ownerTokens,
    offeringValue,
    capitalIfAllSold: offeringValue,
    capitalWithOwnerRetention: (tokensIssued - ownerTokens) * example.tokenPrice,
    untokenizedPercent: 100 - example.tokenizedPercent,
    tokenHoldersMonthlyRent: example.monthlyRent * example.tokenizedPercent / 100,
    untokenizedOwnerMonthlyRent: example.monthlyRent * (100 - example.tokenizedPercent) / 100,
  };
}