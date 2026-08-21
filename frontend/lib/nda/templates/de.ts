import { CONFIDENTIALITY_INDEFINITE, type ConfidentialityYears } from "../durations";
import type { TemplateModule } from "./types";

/**
 * German translation of the Standard Terms body of the Common Paper Mutual
 * NDA v1.0 (AG-89). The `{{TOKEN}}` placeholders are substituted by
 * fillStandardTerms() with the values from the form; they must be kept
 * verbatim and in the same relative order as the English source.
 *
 * Source: https://commonpaper.com/standards/mutual-nda/1.0/ (CC BY 4.0)
 */
const STANDARD_TERMS_TEMPLATE = `1. **Einführung**. Diese Gegenseitige Geheimhaltungsvereinbarung (die diese Standardbedingungen und das (nachstehend definierte) Deckblatt einbezieht) (die „**MNDA**“) ermöglicht es jeder Partei (die „**Offenlegende Partei**“), Informationen im Zusammenhang mit dem {{PURPOSE}} offenzulegen oder zugänglich zu machen, die (1) die Offenlegende Partei gegenüber der empfangenden Partei (die „**Empfangende Partei**“) als „vertraulich“, „firmeneigen“ oder Ähnliches kennzeichnet oder (2) aufgrund ihrer Art und der Umstände ihrer Offenlegung vernünftigerweise als vertraulich oder firmeneigen zu verstehen ist (die „**Vertraulichen Informationen**“). Die Vertraulichen Informationen jeder Partei umfassen auch das Bestehen und den Status der Gespräche zwischen den Parteien sowie die Informationen auf dem Deckblatt. Vertrauliche Informationen umfassen technische oder geschäftliche Informationen, Produktentwürfe oder -roadmaps, Anforderungen, Preise, Sicherheits- und Compliance-Dokumentation, Technologie, Erfindungen und Know-how. Um diese MNDA zu nutzen, müssen die Parteien ein Deckblatt ausfüllen und unterzeichnen, das diese Standardbedingungen einbezieht (das „**Deckblatt**“). Jede Partei wird auf dem Deckblatt bezeichnet, und großgeschriebene Begriffe haben die hier oder auf dem Deckblatt angegebene Bedeutung.

2. **Nutzung und Schutz Vertraulicher Informationen**. Die Empfangende Partei wird: (a) Vertrauliche Informationen ausschließlich für den {{PURPOSE}} verwenden; (b) Vertrauliche Informationen ohne vorherige schriftliche Zustimmung der Offenlegenden Partei nicht an Dritte weitergeben, mit der Ausnahme, dass die Empfangende Partei Vertrauliche Informationen an ihre Mitarbeiter, Vertreter, Berater, Auftragnehmer und sonstige Vertreter weitergeben darf, die ein berechtigtes Interesse an der Kenntnisnahme für den {{PURPOSE}} haben, sofern diese Vertreter vertraglichen Vertraulichkeitspflichten unterliegen, die nicht weniger schützend für die Offenlegende Partei sind als die geltenden Bestimmungen dieser MNDA, und die Empfangende Partei weiterhin für deren Einhaltung dieser MNDA verantwortlich bleibt; und (c) Vertrauliche Informationen mindestens mit demselben Schutz behandeln, den die Empfangende Partei für ihre eigenen vergleichbaren Informationen anwendet, jedoch nicht weniger als einen angemessenen Sorgfaltsmaßstab.

3. **Ausnahmen**. Die Verpflichtungen der Empfangenden Partei aus dieser MNDA gelten nicht für Informationen, bei denen sie nachweisen kann, dass diese: (a) ohne Verschulden der Empfangenden Partei öffentlich zugänglich sind oder werden; (b) ihr vor Erhalt von der Offenlegenden Partei bereits rechtmäßig ohne Vertraulichkeitsbeschränkungen bekannt waren oder sich in ihrem Besitz befanden; (c) sie rechtmäßig von einem Dritten ohne Vertraulichkeitsbeschränkungen erhalten hat; oder (d) sie unabhängig entwickelt hat, ohne die Vertraulichen Informationen zu nutzen oder sich darauf zu beziehen.

4. **Gesetzlich Vorgeschriebene Offenlegungen**. Die Empfangende Partei darf Vertrauliche Informationen offenlegen, soweit dies durch Gesetz, Verordnung oder Aufsichtsbehörde, Vorladung oder gerichtliche Anordnung vorgeschrieben ist, sofern sie (soweit gesetzlich zulässig) der Offenlegenden Partei eine angemessene vorherige Mitteilung über die erforderliche Offenlegung zukommen lässt und, auf Kosten der Offenlegenden Partei, angemessen mit deren Bemühungen zusammenarbeitet, eine vertrauliche Behandlung der Vertraulichen Informationen zu erwirken.

5. **Laufzeit und Beendigung**. Diese MNDA beginnt am {{EFFECTIVE_DATE}} und endet mit Ablauf der {{MNDA_TERM}}. Jede Partei kann diese MNDA aus beliebigem Grund oder ohne Angabe von Gründen durch schriftliche Mitteilung an die andere Partei kündigen. Die Verpflichtungen der Empfangenden Partei in Bezug auf Vertrauliche Informationen bleiben für die {{TERM_OF_CONFIDENTIALITY}} bestehen, unabhängig vom Ablauf oder der Beendigung dieser MNDA.

6. **Rückgabe oder Vernichtung Vertraulicher Informationen**. Nach Ablauf oder Beendigung dieser MNDA oder auf vorherige Anforderung der Offenlegenden Partei wird die Empfangende Partei: (a) die Nutzung der Vertraulichen Informationen einstellen; (b) unverzüglich nach schriftlicher Aufforderung der Offenlegenden Partei alle in ihrem Besitz oder unter ihrer Kontrolle befindlichen Vertraulichen Informationen vernichten oder an die Offenlegende Partei zurückgeben; und (c) auf Verlangen der Offenlegenden Partei die Einhaltung dieser Verpflichtungen schriftlich bestätigen. Als Ausnahme von Buchstabe (b) darf die Empfangende Partei Vertrauliche Informationen gemäß ihren üblichen Sicherungs- oder Aufbewahrungsrichtlinien oder soweit gesetzlich vorgeschrieben aufbewahren, wobei die Bestimmungen dieser MNDA weiterhin für die aufbewahrten Vertraulichen Informationen gelten.

7. **Eigentumsrechte**. Die Offenlegende Partei behält sämtliche Rechte des geistigen Eigentums und sonstige Rechte an ihren Vertraulichen Informationen, und deren Offenlegung gegenüber der Empfangenden Partei begründet keinerlei Lizenz an solchen Rechten.

8. **Haftungsausschluss**. SÄMTLICHE VERTRAULICHEN INFORMATIONEN WERDEN „WIE BESEHEN“, MIT ALLEN MÄNGELN UND OHNE JEGLICHE GEWÄHRLEISTUNG BEREITGESTELLT, EINSCHLIESSLICH DER STILLSCHWEIGENDEN GEWÄHRLEISTUNGEN DER RECHTMÄSSIGKEIT, DER MARKTGÄNGIGKEIT UND DER EIGNUNG FÜR EINEN BESTIMMTEN ZWECK.

9. **Anwendbares Recht und Gerichtsstand**. Diese MNDA und alle damit zusammenhängenden Angelegenheiten unterliegen dem Recht von {{GOVERNING_LAW}} und sind danach auszulegen, ohne Rücksicht auf dessen Kollisionsnormen. Jede Klage, Handlung oder jedes Verfahren im Zusammenhang mit dieser MNDA ist bei den zuständigen Gerichten in {{JURISDICTION}} einzuleiten. Jede Partei unterwirft sich unwiderruflich der ausschließlichen Zuständigkeit dieser Gerichte in {{JURISDICTION}} für jede derartige Klage, Handlung oder jedes derartige Verfahren.

10. **Anspruch auf Unterlassung**. Eine Verletzung dieser MNDA kann einen irreparablen Schaden verursachen, für den Schadensersatz in Geld keine ausreichende Abhilfe darstellt. Bei einer Verletzung dieser MNDA hat die Offenlegende Partei Anspruch darauf, zusätzlich zu ihren sonstigen Rechtsbehelfen angemessenen einstweiligen Rechtsschutz, einschließlich einer einstweiligen Verfügung, zu beantragen.

11. **Allgemeines**. Keine der Parteien ist im Rahmen dieser MNDA verpflichtet, der anderen Vertrauliche Informationen offenzulegen oder eine vorgeschlagene Transaktion fortzuführen. Keine Partei darf diese MNDA ohne die vorherige schriftliche Zustimmung der anderen Partei abtreten, mit der Ausnahme, dass jede Partei diese MNDA im Zusammenhang mit einer Fusion, Umstrukturierung, Übernahme oder sonstigen Übertragung sämtlicher oder im Wesentlichen sämtlicher ihrer Vermögenswerte oder stimmberechtigten Anteile abtreten darf. Jede Abtretung unter Verstoß gegen diese Bestimmung ist nichtig. Diese MNDA bindet die zulässigen Rechtsnachfolger und Abtretungsempfänger jeder Partei und kommt ihnen zugute. Verzichtserklärungen müssen vom bevollmächtigten Vertreter der verzichtenden Partei unterzeichnet werden und können nicht aus einem Verhalten abgeleitet werden. Sollte eine Bestimmung dieser MNDA für nicht durchsetzbar erklärt werden, wird sie auf das zur Aufrechterhaltung der übrigen MNDA erforderliche Mindestmaß beschränkt. Diese MNDA (einschließlich des Deckblatts) stellt die gesamte Vereinbarung der Parteien in Bezug auf ihren Gegenstand dar und ersetzt alle vorherigen und gleichzeitigen Abreden, Vereinbarungen, Zusicherungen und Gewährleistungen, ob schriftlich oder mündlich, die diesen Gegenstand betreffen. Diese MNDA darf nur durch eine von beiden Parteien unterzeichnete schriftliche Vereinbarung geändert, modifiziert, aufgehoben oder ergänzt werden. Mitteilungen, Anfragen und Genehmigungen im Rahmen dieser MNDA müssen schriftlich an die auf dem Deckblatt angegebenen E-Mail- oder Postanschriften gesendet werden und gelten mit Erhalt als zugestellt. Diese MNDA kann in mehreren Ausfertigungen, einschließlich elektronischer Kopien, unterzeichnet werden, von denen jede als Original gilt und die zusammen dieselbe Vereinbarung bilden.

Common Paper Gegenseitige Geheimhaltungsvereinbarung, [Version 1.0](https://commonpaper.com/standards/mutual-nda/1.0/), frei nutzbar unter der Lizenz [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
`;

function pluralYears(n: number): string {
  return `${n} Jahr${n === 1 ? "" : "e"}`;
}

/** Phrase eingefügt in "... und endet mit Ablauf der {{MNDA_TERM}}." */
function describeMndaTerm(years: number): string {
  return `${pluralYears(years)} ab dem Datum des Inkrafttretens`;
}

/** Phrase eingefügt in "... bleiben für die {{TERM_OF_CONFIDENTIALITY}} bestehen, ..." */
function describeConfidentiality(years: ConfidentialityYears): string {
  if (years === CONFIDENTIALITY_INDEFINITE) {
    return "einen unbefristeten Zeitraum nach Ablauf oder Beendigung dieser MNDA";
  }
  return `${pluralYears(years)} nach Ablauf oder Beendigung dieser MNDA`;
}

export const de: TemplateModule = {
  STANDARD_TERMS_TEMPLATE,
  describeMndaTerm,
  describeConfidentiality,
};
