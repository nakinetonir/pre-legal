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
    /** Generic "this field is required" message, reused by CSA/Pilot free-text fields (AG-64). */
    requiredField: string;
  };
  /** Cover Page + Standard Terms chrome for the dedicated CSA preview/docx (AG-64). */
  csaDocument: {
    title: string;
    coverPageHeading: string;
    providerSection: string;
    customerSection: string;
    legalNameLabel: string;
    noticeAddressLabel: string;
    signatoryNameLabel: string;
    signatoryTitleLabel: string;
    noticeEmailLabel: string;
    signatureLabel: string;
    dateLabel: string;
    agreementTermsHeading: string;
    effectiveDateLabel: string;
    subscriptionPeriodLabel: string;
    paymentProcessLabel: string;
    generalCapAmountLabel: string;
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
      paymentProcess: string;
      generalCapAmount: string;
      governingLaw: string;
      jurisdiction: string;
    };
  };
  /** Cover Page + Standard Terms chrome for the dedicated Pilot preview/docx (AG-64). */
  pilotDocument: {
    title: string;
    coverPageHeading: string;
    providerSection: string;
    customerSection: string;
    legalNameLabel: string;
    noticeAddressLabel: string;
    signatoryNameLabel: string;
    signatoryTitleLabel: string;
    noticeEmailLabel: string;
    signatureLabel: string;
    dateLabel: string;
    agreementTermsHeading: string;
    effectiveDateLabel: string;
    pilotPeriodLabel: string;
    evaluationPurposeLabel: string;
    generalCapAmountLabel: string;
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
      evaluationPurpose: string;
      generalCapAmount: string;
      governingLaw: string;
      jurisdiction: string;
    };
  };
  /** Shared Cover Page + Standard Terms chrome for the 8 generic document types (AG-64). */
  genericDocument: {
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
    governingLawLabel: string;
    jurisdictionLabel: string;
    standardTermsHeading: string;
    standardTermsNotice: string;
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
  /** Localized display name per catalog.json document type (AG-64), keyed by DocumentTypeId. */
  documentTypeNames: Record<
    | "Mutual-NDA"
    | "CSA"
    | "Design-Partner-Agreement"
    | "SLA"
    | "PSA"
    | "DPA"
    | "Software-License-Agreement"
    | "Partnership-Agreement"
    | "Pilot-Agreement"
    | "BAA"
    | "AI-Addendum",
    string
  >;
  /** Chrome for the auth/document-management UI added in AG-65. */
  app: {
    myDocumentsButton: string;
    newDocumentButton: string;
    signOutButton: string;
    myDocumentsTitle: string;
    myDocumentsEmpty: string;
    openButton: string;
    deleteButton: string;
    deleteConfirm: string;
    saveButton: string;
    savingButton: string;
    savedNotice: string;
    closeButton: string;
    noDocumentSelected: string;
  };
};
