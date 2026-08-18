"use client";

import { useState } from "react";
import { NdaForm } from "@/components/NdaForm";
import { NdaPreview } from "@/components/NdaPreview";
import { emptyNdaFormValues, type NdaFormValues } from "@/lib/nda/types";

export default function Home() {
  const [step, setStep] = useState<"form" | "preview">("form");
  const [values, setValues] = useState<NdaFormValues>(emptyNdaFormValues);

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-4 py-10 sm:px-6">
      <header className="print:hidden">
        <h1 className="text-2xl font-bold">
          Creador de NDA mutuo (Common Paper)
        </h1>
        <p className="mt-1 text-sm text-black/60 dark:text-white/60">
          Rellena los datos de ambas partes y de la finalidad del acuerdo. El
          documento generado usa el texto estándar del{" "}
          <a
            href="https://commonpaper.com/standards/mutual-nda/1.0/"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Common Paper Mutual NDA v1.0
          </a>{" "}
          (en inglés, formato habitual para este tipo de acuerdo).
        </p>
      </header>

      {step === "form" ? (
        <NdaForm
          initialValues={values}
          onSubmit={(submitted) => {
            setValues(submitted);
            setStep("preview");
          }}
        />
      ) : (
        <NdaPreview values={values} onEdit={() => setStep("form")} />
      )}
    </main>
  );
}
