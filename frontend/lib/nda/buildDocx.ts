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
import { STANDARD_TERMS_TEMPLATE } from "./standardTermsTemplate";
import { resolveTokens, type TokenKey } from "./fillTemplate";
import { countryLabel } from "./countries";
import { describeConfidentiality, describeMndaTerm } from "./durations";
import { formatLegalDate } from "./formatDate";
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
  tokens: Record<TokenKey, { text: string; isPlaceholder: boolean }>
): Paragraph[] {
  return STANDARD_TERMS_TEMPLATE.split(/\n\s*\n/)
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

function partyTable(title: string, party: NdaParty): (Paragraph | Table)[] {
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
            labelCell("Legal Name"),
            valueCell(displayValue(party.name, "Party name")),
          ],
        }),
        new TableRow({
          children: [
            labelCell("Notice Address"),
            valueCell(displayValue(party.address, "Address")),
          ],
        }),
        new TableRow({
          children: [
            labelCell("Signatory Name"),
            valueCell(displayValue(party.signatoryName, "Signatory name")),
          ],
        }),
        new TableRow({
          children: [
            labelCell("Signatory Title"),
            valueCell(displayValue(party.signatoryTitle, "Signatory title")),
          ],
        }),
        new TableRow({
          children: [
            labelCell("Notice Email"),
            valueCell(displayValue(party.signatoryEmail, "Email")),
          ],
        }),
        new TableRow({
          children: [labelCell("Signature"), valueCell("_______________________")],
        }),
        new TableRow({
          children: [labelCell("Date"), valueCell("_______________________")],
        }),
      ],
    }),
  ];
}

export async function buildNdaDocxBlob(values: NdaFormValues): Promise<Blob> {
  const tokens = resolveTokens(values);

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: "MUTUAL NON-DISCLOSURE AGREEMENT",
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Cover Page", bold: true, size: 28 }),
            ],
            spacing: { after: 200 },
          }),
          ...partyTable("Party A (Disclosing / Receiving Party)", values.partyA),
          ...partyTable("Party B (Disclosing / Receiving Party)", values.partyB),
          new Paragraph({
            children: [new TextRun({ text: "Agreement Terms", bold: true, size: 28 })],
            spacing: { before: 300, after: 200 },
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  labelCell("Effective Date"),
                  valueCell(
                    displayValue(
                      formatLegalDate(values.effectiveDate),
                      "Effective Date"
                    )
                  ),
                ],
              }),
              new TableRow({
                children: [
                  labelCell("Purpose"),
                  valueCell(displayValue(values.purpose, "Purpose")),
                ],
              }),
              new TableRow({
                children: [
                  labelCell("MNDA Term"),
                  valueCell(describeMndaTerm(values.mndaTermYears)),
                ],
              }),
              new TableRow({
                children: [
                  labelCell("Term of Confidentiality"),
                  valueCell(describeConfidentiality(values.confidentialityYears)),
                ],
              }),
              new TableRow({
                children: [
                  labelCell("Governing Law"),
                  valueCell(
                    displayValue(
                      countryLabel(values.governingLawCountry),
                      "Governing Law"
                    )
                  ),
                ],
              }),
              new TableRow({
                children: [
                  labelCell("Jurisdiction"),
                  valueCell(displayValue(values.jurisdiction, "Jurisdiction")),
                ],
              }),
            ],
          }),
          new Paragraph({
            children: [new TextRun({ text: "Standard Terms", bold: true, size: 28 })],
            spacing: { before: 300, after: 200 },
          }),
          ...termsToParagraphs(tokens),
        ],
      },
    ],
  });

  return Packer.toBlob(doc);
}
