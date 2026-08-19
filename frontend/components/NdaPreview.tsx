"use client";

import { useMemo, useState } from "react";
import { marked } from "marked";
import { saveAs } from "file-saver";
import { buildNdaDocxBlob } from "@/lib/nda/buildDocx";
import { fillStandardTermsHtml } from "@/lib/nda/fillTemplate";
import { countryLabel } from "@/lib/nda/countries";
import { describeConfidentiality, describeMndaTerm } from "@/lib/nda/durations";
import { formatLegalDate } from "@/lib/nda/formatDate";
import type { NdaFormValues, NdaParty } from "@/lib/nda/types";

/**
 * Cover Page header (AG-6): every field below feeds this block live, with no
 * submit step — Party A/B identity, Effective Date, Purpose, MNDA Term,
 * Term of Confidentiality, Governing Law and Jurisdiction. It re-renders on
 * every keystroke because `values` is owned by the parent page and passed
 * straight through as a prop.
 */
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

function PartyCard({ title, party }: { title: string; party: NdaParty }) {
  const name = display(party.name, "Party name");
  const address = display(party.address, "Address");
  const signatory = display(party.signatoryName, "Signatory name");
  const title2 = display(party.signatoryTitle, "Title");
  const email = display(party.signatoryEmail, "Email");
  return (
    <div className="rounded-lg border border-black/10 dark:border-white/15 p-4 text-sm">
      <h3 className="mb-2 font-semibold">{title}</h3>
      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
        <dt className="text-black/60 dark:text-white/60">Legal Name</dt>
        <dd className={name.isEmpty ? "italic text-black/40 dark:text-white/40" : ""}>
          {name.text}
        </dd>
        <dt className="text-black/60 dark:text-white/60">Address</dt>
        <dd className={address.isEmpty ? "italic text-black/40 dark:text-white/40" : ""}>
          {address.text}
        </dd>
        <dt className="text-black/60 dark:text-white/60">Signatory</dt>
        <dd className={signatory.isEmpty || title2.isEmpty ? "italic text-black/40 dark:text-white/40" : ""}>
          {signatory.text} — {title2.text}
        </dd>
        <dt className="text-black/60 dark:text-white/60">Email</dt>
        <dd className={email.isEmpty ? "italic text-black/40 dark:text-white/40" : ""}>
          {email.text}
        </dd>
      </dl>
    </div>
  );
}

export function NdaPreview({
  values,
  isValid,
  onAttemptInvalidAction,
}: {
  values: NdaFormValues;
  isValid: boolean;
  onAttemptInvalidAction: () => void;
}) {
  const [isDownloading, setIsDownloading] = useState(false);

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
      const blob = await buildNdaDocxBlob(values);
      saveAs(blob, "Mutual-NDA.docx");
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

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3 print:hidden">
        <button
          onClick={handleDownloadDocx}
          disabled={isDownloading}
          className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {isDownloading ? "Generando…" : "Descargar .docx"}
        </button>
        <button
          onClick={handlePrint}
          className="rounded-md border border-black/15 dark:border-white/20 px-4 py-2 font-medium hover:bg-black/5 dark:hover:bg-white/10"
        >
          Imprimir / Guardar como PDF
        </button>
        {!isValid && (
          <span className="text-xs text-red-600 dark:text-red-400">
            Completa los campos obligatorios del formulario para descargar o imprimir.
          </span>
        )}
      </div>

      <article className="rounded-lg border border-black/10 dark:border-white/15 p-6 sm:p-8 print:border-none print:p-0">
        <h1 className="text-center text-xl font-bold tracking-wide text-dark-navy">
          MUTUAL NON-DISCLOSURE AGREEMENT
        </h1>

        <section className="mt-6">
          <h2 className="mb-3 font-semibold uppercase tracking-wide text-sm text-black/60 dark:text-white/60">
            Cover Page
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <PartyCard title="Party A" party={values.partyA} />
            <PartyCard title="Party B" party={values.partyB} />
          </div>
          <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <Field
              label="Effective Date"
              value={display(formatLegalDate(values.effectiveDate), "Effective Date")}
            />
            <Field label="MNDA Term" value={{ text: describeMndaTerm(values.mndaTermYears), isEmpty: false }} />
            <Field label="Purpose" value={display(values.purpose, "Purpose")} />
            <Field
              label="Term of Confidentiality"
              value={{ text: describeConfidentiality(values.confidentialityYears), isEmpty: false }}
            />
            <Field
              label="Governing Law"
              value={display(countryLabel(values.governingLawCountry), "Governing Law")}
            />
            <Field label="Jurisdiction" value={display(values.jurisdiction, "Jurisdiction")} />
          </dl>
        </section>

        <section className="mt-8">
          <h2 className="mb-3 font-semibold uppercase tracking-wide text-sm text-black/60 dark:text-white/60">
            Standard Terms
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
