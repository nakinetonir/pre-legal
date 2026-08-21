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
import type { GenericDocumentTypeId } from "@/lib/documents/types";
import type { GenericFormValues, GenericParty } from "./types";

const PLACEHOLDER_GRAY = "8A8A8A";

/** Matches, in order of priority: a {{TOKEN}}, a **bold** run, a [text](url) link, or plain text. */
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

/**
 * Unlike the NDA/CSA/Pilot bodies (one blank-line-separated paragraph per
 * section), the generic bodies keep their source nested-list line breaks
 * (frontend/lib/generic/templates/*.ts), so each line becomes its own
 * paragraph here, indented by its leading whitespace, instead of splitting
 * on blank lines.
 */
function termsToParagraphs(
  standardTermsTemplate: string,
  tokens: Record<TokenKey, { text: string; isPlaceholder: boolean }>
): Paragraph[] {
  return standardTermsTemplate
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .map((line) => {
      const leadingSpaces = line.match(/^\s*/)?.[0].length ?? 0;
      const indentLevel = Math.floor(leadingSpaces / 4);
      return new Paragraph({
        children: parseSegmentRuns(line.trim(), tokens),
        spacing: { after: 150 },
        indent: indentLevel > 0 ? { left: indentLevel * 360 } : undefined,
        alignment: AlignmentType.JUSTIFIED,
      });
    });
}

function labelCell(label: string, widthPct = 30): TableCell {
  return new TableCell({
    width: { size: widthPct, type: WidthType.PERCENTAGE },
    children: [new Paragraph({ children: [new TextRun({ text: label, bold: true })] })],
  });
}

function valueCell(value: string, widthPct = 70): TableCell {
  return new TableCell({
    width: { size: widthPct, type: WidthType.PERCENTAGE },
    children: [new Paragraph({ children: [new TextRun(value)] })],
  });
}

function partyTable(title: string, party: GenericParty, dict: UiDictionary): (Paragraph | Table)[] {
  const p = dict.genericDocument.placeholders;
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
            labelCell(dict.genericDocument.legalNameLabel),
            valueCell(displayValue(party.name, p.partyName)),
          ],
        }),
        new TableRow({
          children: [
            labelCell(dict.genericDocument.noticeAddressLabel),
            valueCell(displayValue(party.address, p.address)),
          ],
        }),
        new TableRow({
          children: [
            labelCell(dict.genericDocument.signatoryNameLabel),
            valueCell(displayValue(party.signatoryName, p.signatoryName)),
          ],
        }),
        new TableRow({
          children: [
            labelCell(dict.genericDocument.signatoryTitleLabel),
            valueCell(displayValue(party.signatoryTitle, p.signatoryTitle)),
          ],
        }),
        new TableRow({
          children: [
            labelCell(dict.genericDocument.noticeEmailLabel),
            valueCell(displayValue(party.signatoryEmail, p.email)),
          ],
        }),
        new TableRow({
          children: [labelCell(dict.genericDocument.signatureLabel), valueCell("_______________________")],
        }),
        new TableRow({
          children: [labelCell(dict.genericDocument.dateLabel), valueCell("_______________________")],
        }),
      ],
    }),
  ];
}

export async function buildGenericDocxBlob(
  documentType: GenericDocumentTypeId,
  values: GenericFormValues
): Promise<Blob> {
  const locale = localeForCountry(values.governingLawCountry);
  const dict = getUiDictionary(locale);
  const template = getTemplate(documentType);
  const tokens = resolveTokens(values, locale);
  const p = dict.genericDocument.placeholders;

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: dict.documentTypeNames[documentType],
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: dict.genericDocument.coverPageHeading, bold: true, size: 28 }),
            ],
            spacing: { after: 200 },
          }),
          ...partyTable(dict.genericDocument.partyASection, values.partyA, dict),
          ...partyTable(dict.genericDocument.partyBSection, values.partyB, dict),
          new Paragraph({
            children: [
              new TextRun({ text: dict.genericDocument.agreementTermsHeading, bold: true, size: 28 }),
            ],
            spacing: { before: 300, after: 200 },
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  labelCell(dict.genericDocument.effectiveDateLabel),
                  valueCell(displayValue(formatLegalDate(values.effectiveDate, locale), p.effectiveDate)),
                ],
              }),
              new TableRow({
                children: [
                  labelCell(dict.genericDocument.purposeLabel),
                  valueCell(displayValue(values.purpose, p.purpose)),
                ],
              }),
              new TableRow({
                children: [
                  labelCell(dict.genericDocument.governingLawLabel),
                  valueCell(displayValue(countryLabel(values.governingLawCountry, locale), p.governingLaw)),
                ],
              }),
              new TableRow({
                children: [
                  labelCell(dict.genericDocument.jurisdictionLabel),
                  valueCell(displayValue(values.jurisdiction, p.jurisdiction)),
                ],
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: dict.genericDocument.standardTermsHeading, bold: true, size: 28 }),
            ],
            spacing: { before: 300, after: 200 },
          }),
          new Paragraph({
            children: [new TextRun({ text: dict.genericDocument.standardTermsNotice, italics: true })],
            spacing: { after: 200 },
          }),
          ...termsToParagraphs(template.STANDARD_TERMS_TEMPLATE, tokens),
        ],
      },
    ],
  });

  return Packer.toBlob(doc);
}
