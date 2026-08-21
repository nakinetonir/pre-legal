import type { PilotTemplateModule } from "./types";

/** German adaptation of the Pilot Agreement Standard Terms - see en.ts for the source note. */
const STANDARD_TERMS_TEMPLATE = `1. **Pilotzugang**. Während des Pilotzeitraums und vorbehaltlich der Bedingungen dieser Vereinbarung darf der Kunde auf das Produkt sowie enthaltene Software zugreifen und diese ausschließlich für {{EVALUATION_PURPOSE}} nutzen. Der Kunde ist verantwortlich für alle Handlungen auf den Konten seiner Nutzer und für deren Einhaltung dieser Vereinbarung. Der Kunde kann dem Anbieter Feedback geben, das dieser frei nutzen darf, und der Anbieter kann aggregierte Nutzungsdaten sammeln und analysieren, um seine Produkte und Dienstleistungen zu pflegen, zu verbessern und zu bewerben. Sofern in dieser Vereinbarung nicht ausdrücklich gestattet, wird der Kunde das Produkt nicht zurückentwickeln, weiterverkaufen oder unterlizenzieren, Eigentumsvermerke entfernen oder es zur Entwicklung eines Konkurrenzprodukts nutzen. Außer für diese beschränkte Lizenz behält der Anbieter alle Rechte, Titel und Ansprüche am Produkt, und der Kunde behält alle Rechte, Titel und Ansprüche an seinen Kundeninhalten.

2. **Laufzeit und Kündigung**. Diese Vereinbarung beginnt am {{EFFECTIVE_DATE}} und läuft, sofern nicht vorzeitig gekündigt, für {{PILOT_PERIOD}}. Jede Partei kann sofort kündigen, wenn die andere Partei eine wesentliche Vertragsverletzung nicht innerhalb von 30 Tagen nach Mitteilung behebt, zahlungsunfähig wird, oder aus beliebigem oder keinem Grund mit einer Frist von 30 Tagen. Bei Ablauf oder Kündigung: stellt der Kunde die Nutzung des Produkts ein und deinstalliert gegebenenfalls jegliche Software; löscht der Anbieter Kundeninhalte innerhalb von 60 Tagen nach Aufforderung; und geben oder vernichten beide Parteien die in ihrem Besitz befindlichen vertraulichen Informationen der jeweils anderen.

3. **Zusicherungen**. Jede Partei sichert der anderen zu, dass sie zum Abschluss dieser Vereinbarung rechtlich befugt und nach dem geltenden Recht ihres Ursprungslandes ordnungsgemäß gegründet und in gutem Rechtsstand ist.

4. **Gewährleistungsausschluss**. Der Anbieter garantiert nicht, dass das Produkt stets unterbrechungs- oder fehlerfrei sein wird. **Das Produkt wird „WIE BESEHEN" und „WIE VERFÜGBAR" bereitgestellt, und der Anbieter schließt alle Garantien und Bedingungen aus, ausdrücklich oder stillschweigend, einschließlich der stillschweigenden Garantien der Handelsüblichkeit, der Eignung für einen bestimmten Zweck und der Nichtverletzung von Rechten Dritter, soweit dies nach geltendem Recht zulässig ist.**

5. **Haftungsbeschränkung**. **Außer bei Verletzung von Abschnitt 6 (Vertraulichkeit) übersteigt die kumulierte Gesamthaftung jeder Partei für alle Ansprüche aus oder im Zusammenhang mit dieser Vereinbarung nicht {{GENERAL_CAP_AMOUNT}}, und keine Partei haftet der anderen gegenüber für entgangenen Gewinn oder Folge-, besondere, indirekte, exemplarische, Straf- oder Nebenschäden, selbst wenn sie zuvor auf die Möglichkeit solcher Schäden hingewiesen wurde.** Diese Beschränkungen gelten für jede Haftung, ob deliktisch, vertraglich oder anderweitig, soweit nicht durch geltendes Recht verboten.

6. **Vertraulichkeit**. Außer soweit zur Erfüllung dieser Vereinbarung erforderlich, wird eine Partei, die vertrauliche Informationen der anderen erhält, diese weder nutzen noch offenlegen und mit mindestens der gleichen Sorgfalt schützen, die sie für ihre eigenen vergleichbaren Informationen anwendet. Diese Pflichten gelten nicht für Informationen, die öffentlich sind oder werden, die bereits ohne Einschränkung bekannt waren oder die unabhängig ohne Bezug auf die vertraulichen Informationen entwickelt wurden; eine Partei darf vertrauliche Informationen offenlegen, soweit gesetzlich verlangt, nachdem sie, wo rechtlich zulässig, angemessen vorab informiert hat.

7. **Anwendbares Recht und Gerichtsstand**. Diese Vereinbarung und alle damit zusammenhängenden Angelegenheiten unterliegen dem Recht von {{GOVERNING_LAW}} und werden danach ausgelegt, ohne Rücksicht auf dessen Kollisionsnormen. Jede gerichtliche Klage im Zusammenhang mit dieser Vereinbarung muss vor den Gerichten von {{JURISDICTION}} erhoben werden, deren ausschließlicher Zuständigkeit sich beide Parteien unwiderruflich unterwerfen. Eine Verletzung von Abschnitt 6 (Vertraulichkeit) kann einen nicht wiedergutzumachenden Schaden verursachen, sodass die nicht verletzende Partei zusätzlich zu ihren sonstigen Rechtsbehelfen einstweiligen Rechtsschutz beantragen kann.

8. **Allgemeine Bestimmungen**. Diese Vereinbarung stellt die gesamte Vereinbarung zwischen den Parteien zu ihrem Gegenstand dar und ersetzt alle vorherigen Erörterungen. Jede Änderung, jeder Verzicht oder jede Ergänzung bedarf der Schriftform und der Unterschrift beider Parteien; ist eine Bestimmung unwirksam, bleibt der Rest der Vereinbarung in Kraft. Keine Partei darf diese Vereinbarung ohne vorherige schriftliche Zustimmung der anderen abtreten, außer im Zusammenhang mit einer Fusion, Umstrukturierung oder dem Verkauf im Wesentlichen aller Vermögenswerte. Die Parteien sind unabhängige Vertragspartner, und keine haftet für eine durch ein Ereignis höherer Gewalt verursachte Verzögerung. Diese Vereinbarung kann in mehreren Ausfertigungen, auch elektronisch, unterzeichnet werden, wobei jede als Original gilt.

Angepasst nach dem Common Paper Pilot Agreement [Standard Terms Version 1.1](https://commonpaper.com/standards/pilot-agreement/1.1), frei nutzbar unter [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
`;

function pluralMonths(n: number): string {
  return `${n} Monat${n === 1 ? "" : "e"}`;
}

function describePilotPeriod(months: number): string {
  return `${pluralMonths(months)} ab dem Datum des Inkrafttretens`;
}

export const de: PilotTemplateModule = {
  STANDARD_TERMS_TEMPLATE,
  describePilotPeriod,
};
