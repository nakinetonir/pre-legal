/**
 * Shape of the UI copy dictionary (AG-69/AG-77): every string shown in the
 * form, the live preview and the exported .docx, keyed once per locale.
 *
 * `document` is shared between NdaPreview's Cover Page and buildDocx.ts, so
 * both stay in sync from a single translation instead of duplicating labels.
 */
export type UiDictionary = {
  page: {
    title: string;
    introBefore: string;
    introLinkText: string;
    introAfter: string;
  };
  form: {
    partyA: string;
    partyB: string;
    nameLabel: string;
    namePlaceholder: string;
    addressLabel: string;
    addressPlaceholder: string;
    signatoryNameLabel: string;
    signatoryNamePlaceholder: string;
    signatoryTitleLabel: string;
    signatoryTitlePlaceholder: string;
    signatoryEmailLabel: string;
    signatoryEmailPlaceholder: string;
    termsTitle: string;
    effectiveDateLabel: string;
    mndaTermLabel: string;
    yearSingular: string;
    yearPlural: string;
    purposeLabel: string;
    purposePlaceholder: string;
    confidentialityLabel: string;
    indefiniteLabel: string;
    governingLawLabel: string;
    countryPlaceholder: string;
    jurisdictionLabel: string;
    jurisdictionPlaceholder: string;
  };
  document: {
    title: string;
    coverPageHeading: string;
    partyASection: string;
    partyBSection: string;
    legalNameLabel: string;
    noticeAddressLabel: string;
    signatoryNameLabel: string;
    signatoryTitleLabel: string;
    noticeEmailLabel: string;
    signatureLabel: string;
    dateLabel: string;
    agreementTermsHeading: string;
    effectiveDateLabel: string;
    purposeLabel: string;
    mndaTermLabel: string;
    confidentialityLabel: string;
    governingLawLabel: string;
    jurisdictionLabel: string;
    standardTermsHeading: string;
    placeholders: {
      partyName: string;
      address: string;
      signatoryName: string;
      signatoryTitle: string;
      email: string;
      effectiveDate: string;
      purpose: string;
      governingLaw: string;
      jurisdiction: string;
    };
  };
  preview: {
    downloadButton: string;
    downloadingButton: string;
    printButton: string;
    invalidFormNotice: string;
  };
  chat: {
    inputPlaceholder: string;
    sendButton: string;
    thinkingIndicator: string;
    errorMessage: string;
    retryButton: string;
    readyBanner: string;
  };
  validation: {
    partyName: string;
    partyAddress: string;
    partySignatoryName: string;
    partySignatoryTitle: string;
    partySignatoryEmail: string;
    invalidEmail: string;
    effectiveDate: string;
    purpose: string;
    invalidDuration: string;
    governingLawCountry: string;
    jurisdiction: string;
  };
};
