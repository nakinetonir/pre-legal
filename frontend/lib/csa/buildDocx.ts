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
import type { CsaFormValues, CsaParty } from "./types";

const PLACEHOLDER_GRAY = "8A8A8A";

/** Same docx-building pattern as frontend/lib/nda/buildDocx.ts, adapted to CSA. */
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

function partyTable(title: string, party: CsaParty, dict: UiDictionary): (Paragraph | Table)[] {
  const p = dict.csaDocument.placeholders;
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
            labelCell(dict.csaDocument.legalNameLabel),
            valueCell(displayValue(party.name, p.partyName)),
          ],
        }),
        new TableRow({
          children: [
            labelCell(dict.csaDocument.noticeAddressLabel),
            valueCell(displayValue(party.address, p.address)),
          ],
        }),
        new TableRow({
          children: [
            labelCell(dict.csaDocument.signatoryNameLabel),
            valueCell(displayValue(party.signatoryName, p.signatoryName)),
          ],
        }),
        new TableRow({
          children: [
            labelCell(dict.csaDocument.signatoryTitleLabel),
            valueCell(displayValue(party.signatoryTitle, p.signatoryTitle)),
          ],
        }),
        new TableRow({
          children: [
            labelCell(dict.csaDocument.noticeEmailLabel),
            valueCell(displayValue(party.signatoryEmail, p.email)),
          ],
        }),
        new TableRow({
          children: [
            labelCell(dict.csaDocument.signatureLabel),
            valueCell("_______________________"),
          ],
        }),
        new TableRow({
          children: [
            labelCell(dict.csaDocument.dateLabel),
            valueCell("_______________________"),
          ],
        }),
      ],
    }),
  ];
}

export async function buildCsaDocxBlob(values: CsaFormValues): Promise<Blob> {
  const locale = localeForCountry(values.governingLawCountry);
  const dict = getUiDictionary(locale);
  const template = getTemplate(locale);
  const tokens = resolveTokens(values);
  const p = dict.csaDocument.placeholders;

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: dict.csaDocument.title,
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: dict.csaDocument.coverPageHeading, bold: true, size: 28 }),
            ],
            spacing: { after: 200 },
          }),
          ...partyTable(dict.csaDocument.providerSection, values.provider, dict),
          ...partyTable(dict.csaDocument.customerSection, values.customer, dict),
          new Paragraph({
            children: [
              new TextRun({ text: dict.csaDocument.agreementTermsHeading, bold: true, size: 28 }),
            ],
            spacing: { before: 300, after: 200 },
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  labelCell(dict.csaDocument.effectiveDateLabel),
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
                  labelCell(dict.csaDocument.subscriptionPeriodLabel),
                  valueCell(template.describeSubscriptionPeriod(values.subscriptionPeriodYears)),
                ],
              }),
              new TableRow({
                children: [
                  labelCell(dict.csaDocument.paymentProcessLabel),
                  valueCell(displayValue(values.paymentProcess, p.paymentProcess)),
                ],
              }),
              new TableRow({
                children: [
                  labelCell(dict.csaDocument.generalCapAmountLabel),
                  valueCell(displayValue(values.generalCapAmount, p.generalCapAmount)),
                ],
              }),
              new TableRow({
                children: [
                  labelCell(dict.csaDocument.governingLawLabel),
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
                  labelCell(dict.csaDocument.jurisdictionLabel),
                  valueCell(displayValue(values.jurisdiction, p.jurisdiction)),
                ],
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: dict.csaDocument.standardTermsHeading, bold: true, size: 28 }),
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
