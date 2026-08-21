"use client";

import { useMemo, useState } from "react";
import { marked } from "marked";
import { saveAs } from "file-saver";
import { buildPilotDocxBlob } from "@/lib/pilot/buildDocx";
import { fillStandardTermsHtml } from "@/lib/pilot/fillTemplate";
import { getTemplate } from "@/lib/pilot/templates";
import { countryLabel } from "@/lib/nda/countries";
import { formatLegalDate } from "@/lib/nda/formatDate";
import { localeForCountry } from "@/lib/i18n/locale";
import { getUiDictionary, type UiDictionary } from "@/lib/i18n/ui";
import type { SavedDocument } from "@/lib/documents/client";
import type { PilotFormValues, PilotParty } from "@/lib/pilot/types";
import { SaveDocumentButton } from "./SaveDocumentButton";

function display(value: string, placeholder: string): { text: string; isEmpty: boolean } {
  const trimmed = value.trim();
  return trimmed.length > 0
    ? { text: trimmed, isEmpty: false }
    : { text: `[${placeholder}]`, isEmpty: true };
}

function Field({ label, value }: { label: string; value: { text: string; isEmpty: boolean } }) {
  return (
    <div className="flex justify-between gap-4 border-b border-black/10 dark:border-white/10 py-1">
      <dt className="text-black/60 dark:text-white/60">{label}</dt>
      <dd
        className={
          value.isEmpty
            ? "text-right italic text-black/40 dark:text-white/40"
            : "text-right"
        }
      >
        {value.text}
      </dd>
    </div>
  );
}

function PartyCard({
  title,
  party,
  dict,
}: {
  title: string;
  party: PilotParty;
  dict: UiDictionary;
}) {
  const p = dict.pilotDocument.placeholders;
  const name = display(party.name, p.partyName);
  const address = display(party.address, p.address);
  const signatory = display(party.signatoryName, p.signatoryName);
  const title2 = display(party.signatoryTitle, p.signatoryTitle);
  const email = display(party.signatoryEmail, p.email);
  return (
    <div className="rounded-lg border border-black/10 dark:border-white/15 p-4 text-sm">
      <h3 className="mb-2 font-semibold">{title}</h3>
      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
        <dt className="text-black/60 dark:text-white/60">{dict.pilotDocument.legalNameLabel}</dt>
        <dd className={name.isEmpty ? "italic text-black/40 dark:text-white/40" : ""}>
          {name.text}
        </dd>
        <dt className="text-black/60 dark:text-white/60">
          {dict.pilotDocument.noticeAddressLabel}
        </dt>
        <dd className={address.isEmpty ? "italic text-black/40 dark:text-white/40" : ""}>
          {address.text}
        </dd>
        <dt className="text-black/60 dark:text-white/60">
          {dict.pilotDocument.signatoryNameLabel}
        </dt>
        <dd
          className={
            signatory.isEmpty || title2.isEmpty ? "italic text-black/40 dark:text-white/40" : ""
          }
        >
          {signatory.text} — {title2.text}
        </dd>
        <dt className="text-black/60 dark:text-white/60">{dict.pilotDocument.noticeEmailLabel}</dt>
        <dd className={email.isEmpty ? "italic text-black/40 dark:text-white/40" : ""}>
          {email.text}
        </dd>
      </dl>
    </div>
  );
}

export function PilotPreview({
  values,
  isValid,
  onAttemptInvalidAction,
  documentId,
  onSaved,
}: {
  values: PilotFormValues;
  isValid: boolean;
  onAttemptInvalidAction: () => void;
  documentId: number | null;
  onSaved: (document: SavedDocument) => void;
}) {
  const [isDownloading, setIsDownloading] = useState(false);

  const locale = localeForCountry(values.governingLawCountry);
  const dict = getUiDictionary(locale);
  const template = getTemplate(locale);

  const termsHtml = useMemo(() => {
    const markdown = fillStandardTermsHtml(values);
    return marked.parse(markdown, { async: false, gfm: true });
  }, [values]);

  async function handleDownloadDocx() {
    if (!isValid) {
      onAttemptInvalidAction();
      return;
    }
    setIsDownloading(true);
    try {
      const blob = await buildPilotDocxBlob(values);
      saveAs(blob, "Pilot-Agreement.docx");
    } finally {
      setIsDownloading(false);
    }
  }

  function handlePrint() {
    if (!isValid) {
      onAttemptInvalidAction();
      return;
    }
    window.print();
  }

  const p = dict.pilotDocument.placeholders;
  const title = values.customer.name.trim()
    ? `${values.customer.name.trim()} — ${dict.documentTypeNames["Pilot-Agreement"]}`
    : dict.documentTypeNames["Pilot-Agreement"];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3 print:hidden">
        <button
          onClick={handleDownloadDocx}
          disabled={isDownloading}
          className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {isDownloading ? dict.preview.downloadingButton : dict.preview.downloadButton}
        </button>
        <button
          onClick={handlePrint}
          className="rounded-md border border-black/15 dark:border-white/20 px-4 py-2 font-medium hover:bg-black/5 dark:hover:bg-white/10"
        >
          {dict.preview.printButton}
        </button>
        <SaveDocumentButton
          dict={dict}
          documentId={documentId}
          documentType="Pilot-Agreement"
          title={title}
          values={values}
          onSaved={onSaved}
        />
        {!isValid && (
          <span className="text-xs text-red-600 dark:text-red-400">
            {dict.preview.invalidFormNotice}
          </span>
        )}
      </div>

      <article className="rounded-lg border border-black/10 dark:border-white/15 p-6 sm:p-8 print:border-none print:p-0">
        <h1 className="text-center text-xl font-bold tracking-wide text-dark-navy">
          {dict.pilotDocument.title}
        </h1>

        <section className="mt-6">
          <h2 className="mb-3 font-semibold uppercase tracking-wide text-sm text-black/60 dark:text-white/60">
            {dict.pilotDocument.coverPageHeading}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <PartyCard
              title={dict.pilotDocument.providerSection}
              party={values.provider}
              dict={dict}
            />
            <PartyCard
              title={dict.pilotDocument.customerSection}
              party={values.customer}
              dict={dict}
            />
          </div>
          <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <Field
              label={dict.pilotDocument.effectiveDateLabel}
              value={display(formatLegalDate(values.effectiveDate, locale), p.effectiveDate)}
            />
            <Field
              label={dict.pilotDocument.pilotPeriodLabel}
              value={{
                text: template.describePilotPeriod(values.pilotPeriodMonths),
                isEmpty: false,
              }}
            />
            <Field
              label={dict.pilotDocument.evaluationPurposeLabel}
              value={display(values.evaluationPurpose, p.evaluationPurpose)}
            />
            <Field
              label={dict.pilotDocument.generalCapAmountLabel}
              value={display(values.generalCapAmount, p.generalCapAmount)}
            />
            <Field
              label={dict.pilotDocument.governingLawLabel}
              value={display(countryLabel(values.governingLawCountry, locale), p.governingLaw)}
            />
            <Field
              label={dict.pilotDocument.jurisdictionLabel}
              value={display(values.jurisdiction, p.jurisdiction)}
            />
          </dl>
        </section>

        <section className="mt-8">
          <h2 className="mb-3 font-semibold uppercase tracking-wide text-sm text-black/60 dark:text-white/60">
            {dict.pilotDocument.standardTermsHeading}
          </h2>
          <div
            className="text-sm leading-relaxed [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-4 [&_p]:mb-2 [&_strong]:font-semibold [&_a]:underline [&_.nda-token--empty]:italic [&_.nda-token--empty]:text-black/40 dark:[&_.nda-token--empty]:text-white/40 [&_.nda-token--empty]:font-normal"
            dangerouslySetInnerHTML={{ __html: termsHtml }}
          />
        </section>
      </article>
    </div>
  );
}
