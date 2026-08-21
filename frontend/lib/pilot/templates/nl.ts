import type { PilotTemplateModule } from "./types";

/** Dutch adaptation of the Pilot Agreement Standard Terms - see en.ts for the source note. */
const STANDARD_TERMS_TEMPLATE = `1. **Pilottoegang**. Gedurende de Pilotperiode en onder voorbehoud van de voorwaarden van deze Overeenkomst mag de Klant toegang krijgen tot en gebruikmaken van het Product, en eventueel inbegrepen Software, uitsluitend voor {{EVALUATION_PURPOSE}}. De Klant is verantwoordelijk voor alle acties op de accounts van zijn Gebruikers en voor de naleving van deze Overeenkomst door hen. De Klant mag de Aanbieder Feedback geven, die de Aanbieder vrijelijk mag gebruiken, en de Aanbieder mag geaggregeerde Gebruiksgegevens verzamelen en analyseren om zijn producten en diensten te onderhouden, verbeteren en promoten. Tenzij uitdrukkelijk toegestaan door deze Overeenkomst, zal de Klant het Product niet reverse-engineeren, doorverkopen of in sublicentie geven, eigendomsvermeldingen verwijderen, of het gebruiken om een concurrerend product te ontwikkelen. Behalve voor deze beperkte licentie, behoudt de Aanbieder alle rechten, aanspraken en belangen in het Product, en behoudt de Klant alle rechten, aanspraken en belangen in zijn Klantinhoud.

2. **Duur en Beëindiging**. Deze Overeenkomst gaat in op {{EFFECTIVE_DATE}} en loopt, tenzij eerder beëindigd, door voor {{PILOT_PERIOD}}. Elke partij mag onmiddellijk beëindigen indien de andere partij een wezenlijke tekortkoming niet binnen 30 dagen na kennisgeving herstelt, insolvent wordt, of om welke reden dan ook met 30 dagen opzegtermijn. Bij afloop of beëindiging: staakt de Klant het gebruik van het Product en verwijdert, indien van toepassing, alle Software; verwijdert de Aanbieder Klantinhoud binnen 60 dagen na verzoek; en retourneert of vernietigt elke partij de Vertrouwelijke Informatie van de andere partij die zij in bezit heeft.

3. **Verklaringen**. Elke partij verklaart aan de andere dat zij wettelijk bevoegd is deze Overeenkomst aan te gaan en naar behoren is opgericht en in goede juridische staat verkeert onder het toepasselijke recht van haar land van oorsprong.

4. **Uitsluiting van Garanties**. De Aanbieder garandeert niet dat het Product altijd vrij van onderbrekingen of fouten zal zijn. **Het Product wordt geleverd op "ZOALS HET IS"- en "ZOALS BESCHIKBAAR"-basis, en de Aanbieder sluit alle garanties en voorwaarden uit, uitdrukkelijk of impliciet, met inbegrip van de impliciete garanties van verkoopbaarheid, geschiktheid voor een bepaald doel en niet-inbreuk, voor zover maximaal toegestaan door toepasselijke wetgeving.**

5. **Beperking van Aansprakelijkheid**. **Behoudens schending van Artikel 6 (Vertrouwelijkheid), zal de totale cumulatieve aansprakelijkheid van elke partij voor alle vorderingen die voortvloeien uit of verband houden met deze Overeenkomst niet meer bedragen dan {{GENERAL_CAP_AMOUNT}}, en is geen van beide partijen onder enige omstandigheid aansprakelijk jegens de andere voor gederfde winst of voor gevolgschade, bijzondere, indirecte, voorbeeldige, punitieve of incidentele schade, zelfs indien zij vooraf op de mogelijkheid van dergelijke schade is gewezen.** Deze beperkingen gelden voor alle aansprakelijkheid, ongeacht of deze voortvloeit uit onrechtmatige daad, overeenkomst of anderszins, tenzij verboden door toepasselijke wetgeving.

6. **Vertrouwelijkheid**. Behalve voor zover nodig voor de uitvoering van deze Overeenkomst, zal een partij die Vertrouwelijke Informatie van de andere ontvangt deze niet gebruiken of openbaar maken, en deze beschermen met minstens dezelfde zorg die zij toepast op haar eigen soortgelijke informatie. Deze verplichtingen gelden niet voor informatie die openbaar is of wordt, reeds zonder beperking bekend was, of onafhankelijk is ontwikkeld zonder gebruik van de Vertrouwelijke Informatie, en een partij mag Vertrouwelijke Informatie openbaar maken voor zover wettelijk vereist, na redelijke voorafgaande kennisgeving waar wettelijk toegestaan.

7. **Toepasselijk Recht en Gekozen Rechtbanken**. Deze Overeenkomst en alle daarmee verband houdende aangelegenheden worden beheerst door en uitgelegd in overeenstemming met het recht van {{GOVERNING_LAW}}, ongeacht de daarin vervatte conflictregels. Elke gerechtelijke procedure met betrekking tot deze Overeenkomst moet worden aangebracht bij de rechtbanken van {{JURISDICTION}}, waaraan elke partij zich onherroepelijk en exclusief onderwerpt. Een schending van Artikel 6 (Vertrouwelijkheid) kan onherstelbare schade veroorzaken, zodat de niet-schendende partij naast haar overige rechtsmiddelen om een voorlopige voorziening kan verzoeken.

8. **Algemene Bepalingen**. Deze Overeenkomst vormt de volledige overeenkomst tussen partijen met betrekking tot het onderwerp ervan en vervangt alle eerdere besprekingen. Elke wijziging, afstand van recht of aanvulling moet schriftelijk zijn en door beide partijen zijn ondertekend, en indien een bepaling onafdwingbaar wordt geacht, blijft de rest van de Overeenkomst van kracht. Geen van beide partijen mag deze Overeenkomst overdragen zonder voorafgaande schriftelijke toestemming van de andere partij, behalve in verband met een fusie, reorganisatie of verkoop van nagenoeg al haar activa. Partijen zijn onafhankelijke contractanten, en geen van beide is aansprakelijk voor vertraging veroorzaakt door een geval van Overmacht. Deze Overeenkomst kan in meerdere exemplaren worden ondertekend, ook elektronisch, waarbij elk exemplaar als origineel geldt.

Aangepast van de Common Paper Pilot Agreement [Standard Terms Version 1.1](https://commonpaper.com/standards/pilot-agreement/1.1), vrij te gebruiken onder [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
`;

function pluralMonths(n: number): string {
  return `${n} maand${n === 1 ? "" : "en"}`;
}

function describePilotPeriod(months: number): string {
  return `${pluralMonths(months)} vanaf de Ingangsdatum`;
}

export const nl: PilotTemplateModule = {
  STANDARD_TERMS_TEMPLATE,
  describePilotPeriod,
};
