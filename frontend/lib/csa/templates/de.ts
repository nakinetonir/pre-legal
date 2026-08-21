import type { CsaTemplateModule } from "./types";

/** German adaptation of the CSA Standard Terms - see en.ts for the source note. */
const STANDARD_TERMS_TEMPLATE = `1. **Dienstleistung**. Während des Abonnementzeitraums und vorbehaltlich der Bedingungen dieser Vereinbarung darf der Kunde auf den Cloud-Dienst sowie enthaltene Software und Dokumentation zugreifen und diese ausschließlich für seine internen Geschäftszwecke nutzen. Der Kunde ist verantwortlich für alle Handlungen auf den Konten seiner Nutzer und für deren Einhaltung dieser Vereinbarung. Der Kunde kann dem Anbieter Feedback geben, das dieser frei nutzen darf, und der Anbieter kann aggregierte Nutzungsdaten sammeln und analysieren, um seine Produkte und Dienstleistungen zu pflegen, zu verbessern und zu bewerben, einschließlich der Entwicklung oder Verbesserung von KI- oder Machine-Learning-Modellen, ohne den Kunden oder seine Nutzer zu identifizieren.

2. **Einschränkungen und Sperrung**. Sofern in dieser Vereinbarung nicht ausdrücklich gestattet, wird der Kunde das Produkt nicht zurückentwickeln, weiterverkaufen oder unterlizenzieren, Eigentumsvermerke entfernen oder es zur Entwicklung eines Konkurrenzprodukts oder unter Verstoß gegen geltendes Recht nutzen (und dies auch niemandem sonst gestatten). Hat der Kunde seit mehr als 30 Tagen einen unbestrittenen offenen Saldo oder verletzt er diese Vereinbarung wesentlich, kann der Anbieter den Zugang des Kunden sperren, wobei er, wo praktikabel, vorab zu informieren versucht, und den Zugang nach Behebung des Problems wiederherstellen.

3. **Zahlung und Steuern**. {{PAYMENT_PROCESS}}. Der Kunde ist für alle auf die Gebühren anfallenden Abgaben, Steuern und Umlagen verantwortlich, mit Ausnahme der Einkommensteuern des Anbieters. Bestreitet der Kunde eine Rechnung nach Treu und Glauben, muss er dies dem Anbieter vor Fälligkeit der Zahlung mitteilen und alle unbestrittenen Beträge fristgerecht zahlen; die Parteien arbeiten nach Treu und Glauben zusammen, um den Streit beizulegen.

4. **Laufzeit und Kündigung**. Diese Vereinbarung beginnt am {{EFFECTIVE_DATE}} und läuft für {{SUBSCRIPTION_PERIOD}}. Jede Partei kann sofort kündigen, wenn die andere Partei eine wesentliche Vertragsverletzung nicht innerhalb von 30 Tagen nach Mitteilung behebt oder zahlungsunfähig wird. Bei Ablauf oder Kündigung: verliert der Kunde jedes Recht zur Nutzung des Produkts; löscht der Anbieter Kundeninhalte innerhalb von 60 Tagen nach Aufforderung; geben oder vernichten beide Parteien die vertraulichen Informationen der jeweils anderen; und stellt der Anbieter eine Schlussrechnung über bis zur Kündigung angefallene Gebühren.

5. **Zusicherungen und Gewährleistungen**. Jede Partei sichert zu, dass sie zum Abschluss dieser Vereinbarung befugt ist und bei deren Erfüllung geltendes Recht einhält. Der Anbieter garantiert zudem, dass er die allgemeine Funktionalität des Cloud-Dienstes während des Abonnementzeitraums nicht wesentlich einschränken wird. Verletzt der Anbieter diese Garantie, besteht der einzige Anspruch des Kunden darin, dass der Anbieter die Funktionalität innerhalb von 45 Tagen nach Mitteilung wiederherstellt oder, andernfalls, dass der Kunde das betroffene Abonnement kündigt und eine anteilige Rückerstattung vorausbezahlter Gebühren erhält.

6. **Gewährleistungsausschluss**. Außer für die Garantien in Abschnitt 5 (Zusicherungen und Gewährleistungen) wird das Produkt **„WIE BESEHEN" bereitgestellt, und Anbieter und Kunde schließen jeweils alle sonstigen ausdrücklichen oder stillschweigenden Garantien und Bedingungen aus, einschließlich der stillschweigenden Garantien der Handelsüblichkeit, der Eignung für einen bestimmten Zweck und der Nichtverletzung von Rechten Dritter, soweit dies nach geltendem Recht zulässig ist**.

7. **Haftungsbeschränkung**. **Außer bei Verletzung von Abschnitt 9 (Vertraulichkeit) oder der Freistellungspflichten einer Partei nach Abschnitt 8 (Freistellung) übersteigt die kumulierte Gesamthaftung jeder Partei für alle Ansprüche aus oder im Zusammenhang mit dieser Vereinbarung nicht {{GENERAL_CAP_AMOUNT}}, und keine Partei haftet der anderen gegenüber für entgangenen Gewinn oder Folge-, besondere, indirekte, exemplarische, Straf- oder Nebenschäden, selbst wenn sie zuvor auf die Möglichkeit solcher Schäden hingewiesen wurde.** Diese Beschränkungen gelten für jede Haftung, ob deliktisch, vertraglich oder anderweitig, soweit nicht durch geltendes Recht verboten.

8. **Freistellung**. Der Anbieter verteidigt und stellt den Kunden von Ansprüchen Dritter frei, die geltend machen, das Produkt verletze deren Rechte an geistigem Eigentum, und der Kunde verteidigt und stellt den Anbieter von Ansprüchen Dritter frei, die aus einer missbräuchlichen Nutzung des Produkts oder der Kundeninhalte entstehen, jeweils einschließlich angemessener Anwaltskosten. Die freigestellte Partei muss die freistellende Partei unverzüglich über den Anspruch informieren, ihr die alleinige Kontrolle über Verteidigung und Vergleich einräumen und auf Kosten der freistellenden Partei angemessen mitwirken.

9. **Vertraulichkeit**. Außer soweit zur Erfüllung dieser Vereinbarung erforderlich, wird eine Partei, die vertrauliche Informationen der anderen erhält, diese weder nutzen noch offenlegen und mit mindestens der gleichen Sorgfalt schützen, die sie für ihre eigenen vergleichbaren Informationen anwendet. Diese Pflichten gelten nicht für Informationen, die öffentlich sind oder werden, die bereits ohne Einschränkung bekannt waren oder die unabhängig ohne Bezug auf die vertraulichen Informationen entwickelt wurden; eine Partei darf vertrauliche Informationen offenlegen, soweit gesetzlich verlangt, nachdem sie, wo rechtlich zulässig, angemessen vorab informiert hat.

10. **Rechtevorbehalt**. Außer für die in dieser Vereinbarung eingeräumten beschränkten Rechte behält der Anbieter alle Rechte, Titel und Ansprüche am Produkt, und der Kunde behält alle Rechte, Titel und Ansprüche an seinen Kundeninhalten.

11. **Anwendbares Recht und Gerichtsstand**. Diese Vereinbarung und alle damit zusammenhängenden Angelegenheiten unterliegen dem Recht von {{GOVERNING_LAW}} und werden danach ausgelegt, ohne Rücksicht auf dessen Kollisionsnormen. Jede gerichtliche Klage im Zusammenhang mit dieser Vereinbarung muss vor den Gerichten von {{JURISDICTION}} erhoben werden, deren ausschließlicher Zuständigkeit sich beide Parteien unwiderruflich unterwerfen. Eine Verletzung von Abschnitt 9 (Vertraulichkeit) oder der Rechte am geistigen Eigentum einer Partei kann einen nicht wiedergutzumachenden Schaden verursachen, sodass die nicht verletzende Partei zusätzlich zu ihren sonstigen Rechtsbehelfen einstweiligen Rechtsschutz beantragen kann.

12. **Allgemeine Bestimmungen**. Diese Vereinbarung stellt die gesamte Vereinbarung zwischen den Parteien zu ihrem Gegenstand dar und ersetzt alle vorherigen Erörterungen. Jede Änderung, jeder Verzicht oder jede Ergänzung bedarf der Schriftform und der Unterschrift beider Parteien; ist eine Bestimmung unwirksam, bleibt der Rest der Vereinbarung in Kraft. Keine Partei darf diese Vereinbarung ohne vorherige schriftliche Zustimmung der anderen abtreten, außer im Zusammenhang mit einer Fusion, Umstrukturierung oder dem Verkauf im Wesentlichen aller Vermögenswerte. Die Parteien sind unabhängige Vertragspartner, und keine haftet für eine durch ein Ereignis höherer Gewalt verursachte Verzögerung; dies befreit den Kunden jedoch nicht von der Pflicht, bereits angefallene Gebühren zu zahlen. Diese Vereinbarung kann in mehreren Ausfertigungen, auch elektronisch, unterzeichnet werden, wobei jede als Original gilt.

Angepasst nach dem Common Paper Cloud Service Agreement [Standard Terms Version 2.1](https://commonpaper.com/standards/cloud-service-agreement/2.1/), frei nutzbar unter [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
`;

function pluralYears(n: number): string {
  return `${n} Jahr${n === 1 ? "" : "e"}`;
}

function describeSubscriptionPeriod(years: number): string {
  return (
    `${pluralYears(years)} ab dem Datum des Inkrafttretens und verlängert sich automatisch um ` +
    `weitere Zeiträume von ${pluralYears(years)}, sofern nicht eine Partei mindestens 30 Tage vor ` +
    `Ende des jeweils laufenden Zeitraums die Nichtverlängerung mitteilt`
  );
}

export const de: CsaTemplateModule = {
  STANDARD_TERMS_TEMPLATE,
  describeSubscriptionPeriod,
};
