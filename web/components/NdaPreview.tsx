"use client";

import { useMemo, useState } from "react";
import { marked } from "marked";
import { saveAs } from "file-saver";
import { buildNdaDocxBlob } from "@/lib/nda/buildDocx";
import { fillStandardTermsMarkdown } from "@/lib/nda/fillTemplate";
import type { NdaFormValues, NdaParty } from "@/lib/nda/types";

function display(value: string, placeholder: string): string {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : `[${placeholder}]`;
}

function PartyCard({ title, party }: { title: string; party: NdaParty }) {
  return (
    <div className="rounded-lg border border-black/10 dark:border-white/15 p-4 text-sm">
      <h3 className="mb-2 font-semibold">{title}</h3>
      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
        <dt className="text-black/60 dark:text-white/60">Legal Name</dt>
        <dd>{display(party.name, "Party name")}</dd>
        <dt className="text-black/60 dark:text-white/60">Address</dt>
        <dd>{display(party.address, "Address")}</dd>
        <dt className="text-black/60 dark:text-white/60">Signatory</dt>
        <dd>
          {display(party.signatoryName, "Signatory name")} —{" "}
          {display(party.signatoryTitle, "Title")}
        </dd>
        <dt className="text-black/60 dark:text-white/60">Email</dt>
        <dd>{display(party.signatoryEmail, "Email")}</dd>
      </dl>
    </div>
  );
}

export function NdaPreview({
  values,
  onEdit,
}: {
  values: NdaFormValues;
  onEdit: () => void;
}) {
  const [isDownloading, setIsDownloading] = useState(false);

  const termsHtml = useMemo(() => {
    const markdown = fillStandardTermsMarkdown(values);
    return marked.parse(markdown, { async: false, gfm: true });
  }, [values]);

  async function handleDownloadDocx() {
    setIsDownloading(true);
    try {
      const blob = await buildNdaDocxBlob(values);
      saveAs(blob, "Mutual-NDA.docx");
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-3 print:hidden">
        <button
          onClick={onEdit}
          className="rounded-md border border-black/15 dark:border-white/20 px-4 py-2 font-medium hover:bg-black/5 dark:hover:bg-white/10"
        >
          ← Editar datos
        </button>
        <button
          onClick={handleDownloadDocx}
          disabled={isDownloading}
          className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {isDownloading ? "Generando…" : "Descargar .docx"}
        </button>
        <button
          onClick={() => window.print()}
          className="rounded-md border border-black/15 dark:border-white/20 px-4 py-2 font-medium hover:bg-black/5 dark:hover:bg-white/10"
        >
          Imprimir / Guardar como PDF
        </button>
      </div>

      <article className="rounded-lg border border-black/10 dark:border-white/15 p-6 sm:p-8 print:border-none print:p-0">
        <h1 className="text-center text-xl font-bold tracking-wide">
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
            <div className="flex justify-between border-b border-black/10 dark:border-white/10 py-1">
              <dt className="text-black/60 dark:text-white/60">Effective Date</dt>
              <dd>{display(values.effectiveDate, "Effective Date")}</dd>
            </div>
            <div className="flex justify-between border-b border-black/10 dark:border-white/10 py-1">
              <dt className="text-black/60 dark:text-white/60">MNDA Term</dt>
              <dd>{display(values.mndaTerm, "MNDA Term")}</dd>
            </div>
            <div className="flex justify-between border-b border-black/10 dark:border-white/10 py-1 sm:col-span-2">
              <dt className="text-black/60 dark:text-white/60">Purpose</dt>
              <dd className="text-right">{display(values.purpose, "Purpose")}</dd>
            </div>
            <div className="flex justify-between border-b border-black/10 dark:border-white/10 py-1">
              <dt className="text-black/60 dark:text-white/60">
                Term of Confidentiality
              </dt>
              <dd>
                {display(values.termOfConfidentiality, "Term of Confidentiality")}
              </dd>
            </div>
            <div className="flex justify-between border-b border-black/10 dark:border-white/10 py-1">
              <dt className="text-black/60 dark:text-white/60">Governing Law</dt>
              <dd>{display(values.governingLaw, "Governing Law")}</dd>
            </div>
            <div className="flex justify-between border-b border-black/10 dark:border-white/10 py-1">
              <dt className="text-black/60 dark:text-white/60">Jurisdiction</dt>
              <dd>{display(values.jurisdiction, "Jurisdiction")}</dd>
            </div>
          </dl>
        </section>

        <section className="mt-8">
          <h2 className="mb-3 font-semibold uppercase tracking-wide text-sm text-black/60 dark:text-white/60">
            Standard Terms
          </h2>
          <div
            className="text-sm leading-relaxed [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-4 [&_p]:mb-2 [&_strong]:font-semibold [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: termsHtml }}
          />
        </section>
      </article>
    </div>
  );
}
