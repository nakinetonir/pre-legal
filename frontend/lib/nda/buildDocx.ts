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
import { countryLabel } from "./countries";
import { formatLegalDate } from "./formatDate";
import { localeForCountry } from "@/lib/i18n/locale";
import { getUiDictionary, type UiDictionary } from "@/lib/i18n/ui";
import type { NdaFormValues, NdaParty } from "./types";

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
  party: NdaParty,
  dict: UiDictionary
): (Paragraph | Table)[] {
  const p = dict.document.placeholders;
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
            labelCell(dict.document.legalNameLabel),
            valueCell(displayValue(party.name, p.partyName)),
          ],
        }),
        new TableRow({
          children: [
            labelCell(dict.document.noticeAddressLabel),
            valueCell(displayValue(party.address, p.address)),
          ],
        }),
        new TableRow({
          children: [
            labelCell(dict.document.signatoryNameLabel),
            valueCell(displayValue(party.signatoryName, p.signatoryName)),
          ],
        }),
        new TableRow({
          children: [
            labelCell(dict.document.signatoryTitleLabel),
            valueCell(displayValue(party.signatoryTitle, p.signatoryTitle)),
          ],
        }),
        new TableRow({
          children: [
            labelCell(dict.document.noticeEmailLabel),
            valueCell(displayValue(party.signatoryEmail, p.email)),
          ],
        }),
        new TableRow({
          children: [
            labelCell(dict.document.signatureLabel),
            valueCell("_______________________"),
          ],
        }),
        new TableRow({
          children: [
            labelCell(dict.document.dateLabel),
            valueCell("_______________________"),
          ],
        }),
      ],
    }),
  ];
}

export async function buildNdaDocxBlob(values: NdaFormValues): Promise<Blob> {
  const locale = localeForCountry(values.governingLawCountry);
  const dict = getUiDictionary(locale);
  const template = getTemplate(locale);
  const tokens = resolveTokens(values);
  const p = dict.document.placeholders;

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: dict.document.title,
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: dict.document.coverPageHeading, bold: true, size: 28 }),
            ],
            spacing: { after: 200 },
          }),
          ...partyTable(dict.document.partyASection, values.partyA, dict),
          ...partyTable(dict.document.partyBSection, values.partyB, dict),
          new Paragraph({
            children: [
              new TextRun({ text: dict.document.agreementTermsHeading, bold: true, size: 28 }),
            ],
            spacing: { before: 300, after: 200 },
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  labelCell(dict.document.effectiveDateLabel),
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
                  labelCell(dict.document.purposeLabel),
                  valueCell(displayValue(values.purpose, p.purpose)),
                ],
              }),
              new TableRow({
                children: [
                  labelCell(dict.document.mndaTermLabel),
                  valueCell(template.describeMndaTerm(values.mndaTermYears)),
                ],
              }),
              new TableRow({
                children: [
                  labelCell(dict.document.confidentialityLabel),
                  valueCell(template.describeConfidentiality(values.confidentialityYears)),
                ],
              }),
              new TableRow({
                children: [
                  labelCell(dict.document.governingLawLabel),
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
                  labelCell(dict.document.jurisdictionLabel),
                  valueCell(displayValue(values.jurisdiction, p.jurisdiction)),
                ],
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: dict.document.standardTermsHeading, bold: true, size: 28 }),
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
