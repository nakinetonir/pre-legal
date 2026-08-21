import { CONFIDENTIALITY_INDEFINITE, type ConfidentialityYears } from "../durations";
import type { TemplateModule } from "./types";

/**
 * Dutch translation of the Standard Terms body of the Common Paper Mutual
 * NDA v1.0 (AG-95). Also used as the default template for Belgium (BE),
 * per the locale mapping decision in lib/i18n/locale.ts (AG-76). The
 * `{{TOKEN}}` placeholders are substituted by fillStandardTerms() with the
 * values from the form; they must be kept verbatim and in the same
 * relative order as the English source.
 *
 * Source: https://commonpaper.com/standards/mutual-nda/1.0/ (CC BY 4.0)
 */
const STANDARD_TERMS_TEMPLATE = `1. **Inleiding**. Deze Wederzijdse Geheimhoudingsovereenkomst (die deze Standaardvoorwaarden en het Voorblad (hierna gedefinieerd) omvat) (“**MNDA**”) stelt elke partij (“**Verstrekkende Partij**”) in staat om informatie te verstrekken of beschikbaar te stellen in verband met het {{PURPOSE}}, die (1) de Verstrekkende Partij ten opzichte van de ontvangende partij (“**Ontvangende Partij**”) aanduidt als “vertrouwelijk”, “eigendomsrechtelijk beschermd” of iets dergelijks, of (2) redelijkerwijs als vertrouwelijk of eigendomsrechtelijk beschermd moet worden beschouwd gezien de aard ervan en de omstandigheden van de verstrekking (“**Vertrouwelijke Informatie**”). De Vertrouwelijke Informatie van elke partij omvat ook het bestaan en de status van de besprekingen tussen partijen en de informatie op het Voorblad. Vertrouwelijke Informatie omvat technische of commerciële informatie, productontwerpen of roadmaps, vereisten, prijsstelling, documentatie over beveiliging en compliance, technologie, uitvindingen en knowhow. Om deze MNDA te gebruiken, moeten de partijen een voorblad invullen en ondertekenen waarin deze Standaardvoorwaarden zijn opgenomen (“**Voorblad**”). Elke partij wordt op het Voorblad geïdentificeerd en met een hoofdletter geschreven termen hebben de betekenis die daaraan hierin of op het Voorblad wordt toegekend.

2. **Gebruik en Bescherming van Vertrouwelijke Informatie**. De Ontvangende Partij zal: (a) Vertrouwelijke Informatie uitsluitend gebruiken voor het {{PURPOSE}}; (b) Vertrouwelijke Informatie niet aan derden bekendmaken zonder voorafgaande schriftelijke toestemming van de Verstrekkende Partij, met dien verstande dat de Ontvangende Partij Vertrouwelijke Informatie mag verstrekken aan haar werknemers, vertegenwoordigers, adviseurs, contractanten en andere vertegenwoordigers die deze redelijkerwijs moeten kennen voor het {{PURPOSE}}, mits deze vertegenwoordigers gebonden zijn aan geheimhoudingsverplichtingen die niet minder beschermend zijn voor de Verstrekkende Partij dan de toepasselijke bepalingen van deze MNDA, en de Ontvangende Partij verantwoordelijk blijft voor hun naleving van deze MNDA; en (c) Vertrouwelijke Informatie beschermen met ten minste dezelfde bescherming die de Ontvangende Partij toepast op haar eigen soortgelijke informatie, maar niet minder dan een redelijke mate van zorgvuldigheid.

3. **Uitzonderingen**. De verplichtingen van de Ontvangende Partij uit hoofde van deze MNDA zijn niet van toepassing op informatie waarvan zij kan aantonen dat deze: (a) algemeen bekend is of wordt zonder toedoen van de Ontvangende Partij; (b) haar reeds rechtmatig bekend was of in haar bezit was voorafgaand aan ontvangst van de Verstrekkende Partij, zonder geheimhoudingsverplichtingen; (c) rechtmatig is verkregen van een derde zonder geheimhoudingsverplichtingen; of (d) onafhankelijk is ontwikkeld zonder gebruik van of verwijzing naar de Vertrouwelijke Informatie.

4. **Wettelijk Verplichte Bekendmakingen**. De Ontvangende Partij mag Vertrouwelijke Informatie bekendmaken voor zover dit wettelijk, door regelgeving of een toezichthoudende instantie, een dagvaarding of een gerechtelijk bevel wordt vereist, mits zij (voor zover wettelijk toegestaan) de Verstrekkende Partij redelijk vooraf op de hoogte stelt van de vereiste bekendmaking en, op kosten van de Verstrekkende Partij, redelijkerwijs meewerkt aan de inspanningen van de Verstrekkende Partij om een vertrouwelijke behandeling van de Vertrouwelijke Informatie te verkrijgen.

5. **Looptijd en Beëindiging**. Deze MNDA gaat in op {{EFFECTIVE_DATE}} en eindigt aan het einde van {{MNDA_TERM}}. Elke partij kan deze MNDA om welke reden dan ook, of zonder reden, beëindigen door middel van schriftelijke kennisgeving aan de andere partij. De verplichtingen van de Ontvangende Partij met betrekking tot Vertrouwelijke Informatie blijven van kracht gedurende {{TERM_OF_CONFIDENTIALITY}}, ondanks het verstrijken of de beëindiging van deze MNDA.

6. **Teruggave of Vernietiging van Vertrouwelijke Informatie**. Na het verstrijken of de beëindiging van deze MNDA, of op eerder verzoek van de Verstrekkende Partij, zal de Ontvangende Partij: (a) het gebruik van Vertrouwelijke Informatie staken; (b) onmiddellijk na een schriftelijk verzoek van de Verstrekkende Partij alle Vertrouwelijke Informatie in haar bezit of onder haar zeggenschap vernietigen of aan de Verstrekkende Partij teruggeven; en (c) op verzoek van de Verstrekkende Partij schriftelijk bevestigen dat zij aan deze verplichtingen heeft voldaan. Als uitzondering op onderdeel (b) mag de Ontvangende Partij Vertrouwelijke Informatie bewaren in overeenstemming met haar gebruikelijke back-up- of archiveringsbeleid, of zoals wettelijk vereist, met dien verstande dat de voorwaarden van deze MNDA op de bewaarde Vertrouwelijke Informatie van toepassing blijven.

7. **Eigendomsrechten**. De Verstrekkende Partij behoudt al haar intellectuele-eigendomsrechten en overige rechten op haar Vertrouwelijke Informatie, en de bekendmaking daarvan aan de Ontvangende Partij verleent geen enkele licentie onder die rechten.

8. **Vrijwaring**. ALLE VERTROUWELIJKE INFORMATIE WORDT VERSTREKT “IN DE STAAT WAARIN DEZE ZICH BEVINDT”, MET ALLE GEBREKEN EN ZONDER ENIGE GARANTIE, MET INBEGRIP VAN DE IMPLICIETE GARANTIES VAN EIGENDOM, VERKOOPBAARHEID EN GESCHIKTHEID VOOR EEN BEPAALD DOEL.

9. **Toepasselijk Recht en Bevoegde Rechter**. Deze MNDA en alle daarmee verband houdende aangelegenheden worden beheerst door en uitgelegd in overeenstemming met het recht van {{GOVERNING_LAW}}, ongeacht de daarin vervatte regels van conflictenrecht. Elk geschil, elke vordering of procedure met betrekking tot deze MNDA moet worden aangebracht bij de bevoegde rechter in {{JURISDICTION}}. Elke partij onderwerpt zich onherroepelijk aan de exclusieve bevoegdheid van die rechter in {{JURISDICTION}} in een dergelijk geschil, een dergelijke vordering of procedure.

10. **Voorlopige Voorziening**. Een schending van deze MNDA kan onherstelbare schade veroorzaken waarvoor een schadevergoeding in geld een ontoereikend rechtsmiddel vormt. Bij schending van deze MNDA heeft de Verstrekkende Partij, naast haar overige rechtsmiddelen, het recht om passende voorlopige voorzieningen te vragen, waaronder een verbod.

11. **Algemene Bepalingen**. Geen van beide partijen is op grond van deze MNDA verplicht om Vertrouwelijke Informatie aan de andere partij bekend te maken of een voorgestelde transactie voort te zetten. Geen van beide partijen mag deze MNDA overdragen zonder voorafgaande schriftelijke toestemming van de andere partij, met dien verstande dat elke partij deze MNDA mag overdragen in verband met een fusie, reorganisatie, overname of andere overdracht van al haar activa of stemgerechtigde effecten, of nagenoeg al haar activa of stemgerechtigde effecten. Elke overdracht in strijd met deze bepaling is nietig. Deze MNDA is bindend voor en komt ten goede aan de toegestane rechtsopvolgers en cessionarissen van elke partij. Afstand van recht moet schriftelijk worden gedaan en worden ondertekend door de bevoegde vertegenwoordiger van de partij die afstand doet, en kan niet worden afgeleid uit gedrag. Indien een bepaling van deze MNDA niet-afdwingbaar wordt geacht, wordt deze beperkt tot het minimum dat nodig is opdat de rest van deze MNDA van kracht blijft. Deze MNDA (met inbegrip van het Voorblad) vormt de volledige overeenkomst tussen de partijen met betrekking tot het onderwerp ervan en vervangt alle eerdere en gelijktijdige afspraken, overeenkomsten, verklaringen en garanties, schriftelijk of mondeling, met betrekking tot dat onderwerp. Deze MNDA kan uitsluitend worden gewijzigd, aangepast, waarvan afstand wordt gedaan, of aangevuld door middel van een door beide partijen ondertekende schriftelijke overeenkomst. Kennisgevingen, verzoeken en goedkeuringen uit hoofde van deze MNDA moeten schriftelijk worden verzonden naar de e-mail- of postadressen op het Voorblad en worden geacht te zijn afgeleverd bij ontvangst. Deze MNDA kan in meerdere exemplaren worden ondertekend, met inbegrip van elektronische kopieën, die elk als origineel gelden en die samen één en dezelfde overeenkomst vormen.

Wederzijdse Geheimhoudingsovereenkomst van Common Paper, [Versie 1.0](https://commonpaper.com/standards/mutual-nda/1.0/), vrij te gebruiken onder de licentie [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
`;

function pluralYears(n: number): string {
  return `${n} jaar`;
}

/** Zinsnede ingevoegd in "... en eindigt aan het einde van {{MNDA_TERM}}." */
function describeMndaTerm(years: number): string {
  return `${pluralYears(years)} vanaf de Ingangsdatum`;
}

/** Zinsnede ingevoegd in "... blijven van kracht gedurende {{TERM_OF_CONFIDENTIALITY}}, ..." */
function describeConfidentiality(years: ConfidentialityYears): string {
  if (years === CONFIDENTIALITY_INDEFINITE) {
    return "een onbepaalde periode na het verstrijken of de beëindiging van deze MNDA";
  }
  return `${pluralYears(years)} na het verstrijken of de beëindiging van deze MNDA`;
}

export const nl: TemplateModule = {
  STANDARD_TERMS_TEMPLATE,
  describeMndaTerm,
  describeConfidentiality,
};
