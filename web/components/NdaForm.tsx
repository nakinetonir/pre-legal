"use client";

import { useState } from "react";
import type { NdaFormValues, NdaParty } from "@/lib/nda/types";

type PartyFieldKey = keyof NdaParty;

const partyFields: { key: PartyFieldKey; label: string; placeholder: string }[] = [
  { key: "name", label: "Nombre legal", placeholder: "Acme, Inc." },
  {
    key: "address",
    label: "Dirección de notificación",
    placeholder: "Calle Mayor 1, 28013 Madrid, España",
  },
  { key: "signatoryName", label: "Nombre del firmante", placeholder: "Jane Doe" },
  { key: "signatoryTitle", label: "Cargo del firmante", placeholder: "CEO" },
  {
    key: "signatoryEmail",
    label: "Email del firmante",
    placeholder: "jane@acme.com",
  },
];

function PartyFieldset({
  title,
  party,
  onChange,
}: {
  title: string;
  party: NdaParty;
  onChange: (field: PartyFieldKey, value: string) => void;
}) {
  return (
    <fieldset className="rounded-lg border border-black/10 dark:border-white/15 p-4">
      <legend className="px-1 font-medium">{title}</legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {partyFields.map((field) => (
          <label key={field.key} className="flex flex-col gap-1 text-sm">
            <span>{field.label}</span>
            <input
              type={field.key === "signatoryEmail" ? "email" : "text"}
              required
              value={party[field.key]}
              placeholder={field.placeholder}
              onChange={(e) => onChange(field.key, e.target.value)}
              className="rounded-md border border-black/15 dark:border-white/20 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function NdaForm({
  initialValues,
  onSubmit,
}: {
  initialValues: NdaFormValues;
  onSubmit: (values: NdaFormValues) => void;
}) {
  const [values, setValues] = useState<NdaFormValues>(initialValues);

  function updateParty(party: "partyA" | "partyB", field: PartyFieldKey, value: string) {
    setValues((prev) => ({
      ...prev,
      [party]: { ...prev[party], [field]: value },
    }));
  }

  function updateField<K extends keyof Omit<NdaFormValues, "partyA" | "partyB">>(
    field: K,
    value: NdaFormValues[K]
  ) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(values);
      }}
      className="flex flex-col gap-6"
    >
      <PartyFieldset
        title="Parte A"
        party={values.partyA}
        onChange={(field, value) => updateParty("partyA", field, value)}
      />
      <PartyFieldset
        title="Parte B"
        party={values.partyB}
        onChange={(field, value) => updateParty("partyB", field, value)}
      />

      <fieldset className="rounded-lg border border-black/10 dark:border-white/15 p-4">
        <legend className="px-1 font-medium">Términos del acuerdo</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm">
            <span>Fecha efectiva</span>
            <input
              type="date"
              required
              value={values.effectiveDate}
              onChange={(e) => updateField("effectiveDate", e.target.value)}
              className="rounded-md border border-black/15 dark:border-white/20 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span>Duración del MNDA</span>
            <input
              type="text"
              required
              placeholder="2 años desde la Fecha Efectiva"
              value={values.mndaTerm}
              onChange={(e) => updateField("mndaTerm", e.target.value)}
              className="rounded-md border border-black/15 dark:border-white/20 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm sm:col-span-2">
            <span>Finalidad (Purpose)</span>
            <textarea
              required
              rows={2}
              placeholder="Evaluar una posible relación comercial entre las partes"
              value={values.purpose}
              onChange={(e) => updateField("purpose", e.target.value)}
              className="rounded-md border border-black/15 dark:border-white/20 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span>Duración de la confidencialidad</span>
            <input
              type="text"
              required
              placeholder="3 años tras la divulgación"
              value={values.termOfConfidentiality}
              onChange={(e) => updateField("termOfConfidentiality", e.target.value)}
              className="rounded-md border border-black/15 dark:border-white/20 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span>Ley aplicable (Estado/País)</span>
            <input
              type="text"
              required
              placeholder="España"
              value={values.governingLaw}
              onChange={(e) => updateField("governingLaw", e.target.value)}
              className="rounded-md border border-black/15 dark:border-white/20 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span>Jurisdicción (tribunales)</span>
            <input
              type="text"
              required
              placeholder="Madrid, España"
              value={values.jurisdiction}
              onChange={(e) => updateField("jurisdiction", e.target.value)}
              className="rounded-md border border-black/15 dark:border-white/20 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>
      </fieldset>

      <button
        type="submit"
        className="self-start rounded-md bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
      >
        Generar NDA
      </button>
    </form>
  );
}
