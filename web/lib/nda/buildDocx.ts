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
import { fillStandardTermsPlain } from "./fillTemplate";
import type { NdaFormValues, NdaParty } from "./types";

const BOLD_RUN = /\*\*(.+?)\*\*/g;
const LINK_MARKDOWN = /\[(.+?)\]\(.+?\)/g;

function displayValue(value: string, placeholder: string): string {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : `[${placeholder}]`;
}

function parseInlineRuns(text: string): TextRun[] {
  const runs: TextRun[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  BOLD_RUN.lastIndex = 0;
  while ((match = BOLD_RUN.exec(text))) {
    if (match.index > lastIndex) {
      runs.push(new TextRun(text.slice(lastIndex, match.index)));
    }
    runs.push(new TextRun({ text: match[1], bold: true }));
    lastIndex = BOLD_RUN.lastIndex;
  }
  if (lastIndex < text.length) {
    runs.push(new TextRun(text.slice(lastIndex)));
  }
  return runs;
}

function termsToParagraphs(markdown: string): Paragraph[] {
  const withoutLinks = markdown.replace(LINK_MARKDOWN, "$1");
  return withoutLinks
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter((block) => block.length > 0)
    .map(
      (block) =>
        new Paragraph({
          children: parseInlineRuns(block.replace(/\n/g, " ")),
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
  const filledTerms = fillStandardTermsPlain(values);

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
                  valueCell(displayValue(values.effectiveDate, "Effective Date")),
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
                  valueCell(displayValue(values.mndaTerm, "MNDA Term")),
                ],
              }),
              new TableRow({
                children: [
                  labelCell("Term of Confidentiality"),
                  valueCell(
                    displayValue(
                      values.termOfConfidentiality,
                      "Term of Confidentiality"
                    )
                  ),
                ],
              }),
              new TableRow({
                children: [
                  labelCell("Governing Law"),
                  valueCell(displayValue(values.governingLaw, "Governing Law")),
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
          ...termsToParagraphs(filledTerms),
        ],
      },
    ],
  });

  return Packer.toBlob(doc);
}
