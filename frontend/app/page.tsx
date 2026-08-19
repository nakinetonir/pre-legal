"use client";

import { useMemo, useState } from "react";
import { AuthGate } from "@/components/AuthGate";
import { NdaForm } from "@/components/NdaForm";
import { NdaPreview } from "@/components/NdaPreview";
import { emptyNdaFormValues, type NdaFormValues } from "@/lib/nda/types";
import { isNdaFormValid, validateNdaForm } from "@/lib/nda/validation";

export default function Home() {
  const [values, setValues] = useState<NdaFormValues>(emptyNdaFormValues);
  const [forceShowErrors, setForceShowErrors] = useState(false);

  const errors = useMemo(() => validateNdaForm(values), [values]);
  const isValid = useMemo(() => isNdaFormValid(errors), [errors]);

  return (
    <AuthGate>
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-10 sm:px-6">
        <header className="print:hidden">
          <h1 className="text-2xl font-bold text-dark-navy">
            Creador de NDA mutuo (Common Paper)
          </h1>
          <p className="mt-1 text-sm text-black/60 dark:text-white/60">
            Rellena los datos a la izquierda y observa cómo el documento de la
            derecha se actualiza al instante. El texto usa el estándar del{" "}
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

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 print:block">
          <div className="print:hidden">
            <NdaForm
              values={values}
              errors={errors}
              forceShowErrors={forceShowErrors}
              onChange={setValues}
            />
          </div>
          <div className="lg:sticky lg:top-6 lg:self-start lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto">
            <NdaPreview
              values={values}
              isValid={isValid}
              onAttemptInvalidAction={() => setForceShowErrors(true)}
            />
          </div>
        </div>
      </main>
    </AuthGate>
  );
}
