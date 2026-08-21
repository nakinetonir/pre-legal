import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import { getTemplate } from "./templates";
import { resolveTokens, type TokenKey } from "./fillTemplate";
import { countryLabel } from "@/lib/nda/countries";
import { formatLegalDate } from "@/lib/nda/formatDate";
import { localeForCountry } from "@/lib/i18n/locale";
import { getUiDictionary, type UiDictionary } from "@/lib/i18n/ui";
import type { PilotFormValues, PilotParty } from "./types";

const PLACEHOLDER_GRAY = "8A8A8A";

/** Same docx-building pattern as frontend/lib/nda/buildDocx.ts, adapted to the Pilot Agreement. */
const SEGMENT_RE = /\{\{(\w+)\}\}|\*\*(.+?)\*\*|\[(.+?)\]\(.+?\)/g;

function displayValue(value: string, placeholder: string): string {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : `[${placeholder}]`;
}

function parseSegmentRuns(
  text: string,
  tokens: Record<TokenKey, { text: string; isPlaceholder: boolean }>
): TextRun[] {
  const runs: TextRun[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  SEGMENT_RE.lastIndex = 0;
  while ((match = SEGMENT_RE.exec(text))) {
    if (match.index > lastIndex) {
      runs.push(new TextRun(text.slice(lastIndex, match.index)));
    }
    const [, tokenKey, boldText, linkText] = match;
    if (tokenKey) {
      const token = tokens[tokenKey as TokenKey];
      if (token) {
        runs.push(
          new TextRun({
            text: token.text,
            bold: !token.isPlaceholder,
            italics: token.isPlaceholder,
            color: token.isPlaceholder ? PLACEHOLDER_GRAY : undefined,
          })
        );
      }
    } else if (boldText) {
      runs.push(new TextRun({ text: boldText, bold: true }));
    } else if (linkText) {
      runs.push(new TextRun(linkText));
    }
    lastIndex = SEGMENT_RE.lastIndex;
  }
  if (lastIndex < text.length) {
    runs.push(new TextRun(text.slice(lastIndex)));
  }
  return runs;
}

function termsToParagraphs(
  standardTermsTemplate: string,
  tokens: Record<TokenKey, { text: string; isPlaceholder: boolean }>
): Paragraph[] {
  return standardTermsTemplate
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter((block) => block.length > 0)
    .map(
      (block) =>
        new Paragraph({
          children: parseSegmentRuns(block.replace(/\n/g, " "), tokens),
          spacing: { after: 200 },
          alignment: AlignmentType.JUSTIFIED,
        })
    );
}

function labelCell(label: string, widthPct = 30): TableCell {
  return new TableCell({
    width: { size: widthPct, type: WidthType.PERCENTAGE },
    children: [
      new Paragraph({ children: [new TextRun({ text: label, bold: true })] }),
    ],
  });
}

function valueCell(value: string, widthPct = 70): TableCell {
  return new TableCell({
    width: { size: widthPct, type: WidthType.PERCENTAGE },
    children: [new Paragraph({ children: [new TextRun(value)] })],
  });
}

function partyTable(
  title: string,
  party: PilotParty,
  dict: UiDictionary
): (Paragraph | Table)[] {
  const p = dict.pilotDocument.placeholders;
  return [
    new Paragraph({
      children: [new TextRun({ text: title, bold: true })],
      spacing: { before: 200, after: 100 },
    }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            labelCell(dict.pilotDocument.legalNameLabel),
            valueCell(displayValue(party.name, p.partyName)),
          ],
        }),
        new TableRow({
          children: [
            labelCell(dict.pilotDocument.noticeAddressLabel),
            valueCell(displayValue(party.address, p.address)),
          ],
        }),
        new TableRow({
          children: [
            labelCell(dict.pilotDocument.signatoryNameLabel),
            valueCell(displayValue(party.signatoryName, p.signatoryName)),
          ],
        }),
        new TableRow({
          children: [
            labelCell(dict.pilotDocument.signatoryTitleLabel),
            valueCell(displayValue(party.signatoryTitle, p.signatoryTitle)),
          ],
        }),
        new TableRow({
          children: [
            labelCell(dict.pilotDocument.noticeEmailLabel),
            valueCell(displayValue(party.signatoryEmail, p.email)),
          ],
        }),
        new TableRow({
          children: [
            labelCell(dict.pilotDocument.signatureLabel),
            valueCell("_______________________"),
          ],
        }),
        new TableRow({
          children: [
            labelCell(dict.pilotDocument.dateLabel),
            valueCell("_______________________"),
          ],
        }),
      ],
    }),
  ];
}

export async function buildPilotDocxBlob(values: PilotFormValues): Promise<Blob> {
  const locale = localeForCountry(values.governingLawCountry);
  const dict = getUiDictionary(locale);
  const template = getTemplate(locale);
  const tokens = resolveTokens(values);
  const p = dict.pilotDocument.placeholders;

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: dict.pilotDocument.title,
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: dict.pilotDocument.coverPageHeading, bold: true, size: 28 }),
            ],
            spacing: { after: 200 },
          }),
          ...partyTable(dict.pilotDocument.providerSection, values.provider, dict),
          ...partyTable(dict.pilotDocument.customerSection, values.customer, dict),
          new Paragraph({
            children: [
              new TextRun({
                text: dict.pilotDocument.agreementTermsHeading,
                bold: true,
                size: 28,
              }),
            ],
            spacing: { before: 300, after: 200 },
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  labelCell(dict.pilotDocument.effectiveDateLabel),
                  valueCell(
                    displayValue(
                      formatLegalDate(values.effectiveDate, locale),
                      p.effectiveDate
                    )
                  ),
                ],
              }),
              new TableRow({
                children: [
                  labelCell(dict.pilotDocument.pilotPeriodLabel),
                  valueCell(template.describePilotPeriod(values.pilotPeriodMonths)),
                ],
              }),
              new TableRow({
                children: [
                  labelCell(dict.pilotDocument.evaluationPurposeLabel),
                  valueCell(displayValue(values.evaluationPurpose, p.evaluationPurpose)),
                ],
              }),
              new TableRow({
                children: [
                  labelCell(dict.pilotDocument.generalCapAmountLabel),
                  valueCell(displayValue(values.generalCapAmount, p.generalCapAmount)),
                ],
              }),
              new TableRow({
                children: [
                  labelCell(dict.pilotDocument.governingLawLabel),
                  valueCell(
                    displayValue(
                      countryLabel(values.governingLawCountry, locale),
                      p.governingLaw
                    )
                  ),
                ],
              }),
              new TableRow({
                children: [
                  labelCell(dict.pilotDocument.jurisdictionLabel),
                  valueCell(displayValue(values.jurisdiction, p.jurisdiction)),
                ],
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: dict.pilotDocument.standardTermsHeading,
                bold: true,
                size: 28,
              }),
            ],
            spacing: { before: 300, after: 200 },
          }),
          ...termsToParagraphs(template.STANDARD_TERMS_TEMPLATE, tokens),
        ],
      },
    ],
  });

  return Packer.toBlob(doc);
}
