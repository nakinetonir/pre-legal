import type { CsaTemplateModule } from "./types";

/** Dutch adaptation of the CSA Standard Terms - see en.ts for the source note. */
const STANDARD_TERMS_TEMPLATE = `1. **Dienst**. Gedurende de Abonnementsperiode en onder voorbehoud van de voorwaarden van deze Overeenkomst mag de Klant toegang krijgen tot en gebruikmaken van de Clouddienst en eventueel inbegrepen Software en Documentatie, uitsluitend voor zijn interne bedrijfsdoeleinden. De Klant is verantwoordelijk voor alle acties op de accounts van zijn Gebruikers en voor de naleving van deze Overeenkomst door hen. De Klant mag de Aanbieder Feedback geven, die de Aanbieder vrijelijk mag gebruiken, en de Aanbieder mag geaggregeerde Gebruiksgegevens verzamelen en analyseren om zijn producten en diensten te onderhouden, verbeteren en promoten, met inbegrip van het ontwikkelen of verbeteren van kunstmatige-intelligentie- of machine-learningmodellen, zonder de Klant of zijn Gebruikers te identificeren.

2. **Beperkingen en Opschorting**. Tenzij uitdrukkelijk toegestaan door deze Overeenkomst, zal de Klant het Product niet reverse-engineeren, doorverkopen of in sublicentie geven, eigendomsvermeldingen verwijderen, of het gebruiken om een concurrerend product te ontwikkelen of in strijd met toepasselijke wetgeving (en dit ook aan niemand anders toestaan). Indien de Klant langer dan 30 dagen een onbetwist openstaand saldo heeft of deze Overeenkomst wezenlijk schendt, mag de Aanbieder de toegang van de Klant opschorten, waarbij hij, indien praktisch mogelijk, vooraf tracht te informeren, en de toegang herstellen zodra het onderliggende probleem is opgelost.

3. **Betaling en Belastingen**. {{PAYMENT_PROCESS}}. De Klant is verantwoordelijk voor alle rechten, belastingen en heffingen die van toepassing zijn op de Vergoedingen, met uitzondering van de inkomstenbelasting van de Aanbieder. Indien de Klant te goeder trouw een geschil heeft over een factuur, moet hij de Aanbieder hiervan op de hoogte stellen vóór de vervaldatum en alle onbetwiste bedragen tijdig betalen; partijen werken te goeder trouw samen om het geschil op te lossen.

4. **Duur en Beëindiging**. Deze Overeenkomst gaat in op {{EFFECTIVE_DATE}} en loopt door voor {{SUBSCRIPTION_PERIOD}}. Elke partij mag onmiddellijk beëindigen indien de andere partij een wezenlijke tekortkoming niet binnen 30 dagen na kennisgeving herstelt, of insolvent wordt. Bij afloop of beëindiging: verliest de Klant elk recht om het Product te gebruiken; verwijdert de Aanbieder Klantinhoud binnen 60 dagen na verzoek; retourneert of vernietigt elke partij de Vertrouwelijke Informatie van de andere partij; en stuurt de Aanbieder een eindfactuur voor Vergoedingen die vóór beëindiging zijn opgebouwd.

5. **Verklaringen en Garanties**. Elke partij verklaart dat zij bevoegd is deze Overeenkomst aan te gaan en toepasselijke wetgeving zal naleven bij de uitvoering ervan. De Aanbieder garandeert bovendien dat hij de algemene functionaliteit van de Clouddienst tijdens de Abonnementsperiode niet wezenlijk zal verminderen. Schendt de Aanbieder deze garantie, dan bestaat het enige verhaal van de Klant erin dat de Aanbieder de functionaliteit binnen 45 dagen na kennisgeving herstelt of, bij gebreke daarvan, dat de Klant het betrokken abonnement beëindigt en een evenredige terugbetaling van vooruitbetaalde Vergoedingen ontvangt.

6. **Uitsluiting van Garanties**. Behoudens de garanties in Artikel 5 (Verklaringen en Garanties) wordt het Product geleverd **"ZOALS HET IS", en sluiten Aanbieder en Klant elk alle overige garanties en voorwaarden uit, uitdrukkelijk of impliciet, met inbegrip van de impliciete garanties van verkoopbaarheid, geschiktheid voor een bepaald doel en niet-inbreuk, voor zover maximaal toegestaan door toepasselijke wetgeving**.

7. **Beperking van Aansprakelijkheid**. **Behoudens schending van Artikel 9 (Vertrouwelijkheid) of de vrijwaringsverplichtingen van een partij op grond van Artikel 8 (Vrijwaring), zal de totale cumulatieve aansprakelijkheid van elke partij voor alle vorderingen die voortvloeien uit of verband houden met deze Overeenkomst niet meer bedragen dan {{GENERAL_CAP_AMOUNT}}, en is geen van beide partijen onder enige omstandigheid aansprakelijk jegens de andere voor gederfde winst of voor gevolgschade, bijzondere, indirecte, voorbeeldige, punitieve of incidentele schade, zelfs indien zij vooraf op de mogelijkheid van dergelijke schade is gewezen.** Deze beperkingen gelden voor alle aansprakelijkheid, ongeacht of deze voortvloeit uit onrechtmatige daad, overeenkomst of anderszins, tenzij verboden door toepasselijke wetgeving.

8. **Vrijwaring**. De Aanbieder zal de Klant verdedigen en vrijwaren tegen vorderingen van derden die stellen dat het Product hun intellectuele-eigendomsrechten schendt, en de Klant zal de Aanbieder verdedigen en vrijwaren tegen vorderingen van derden die voortvloeien uit misbruik van het Product of de Klantinhoud, in elk geval met inbegrip van redelijke advocaatkosten. De gevrijwaarde partij moet de vrijwarende partij onverwijld op de hoogte stellen van de vordering, haar de exclusieve controle over verdediging en schikking geven, en redelijkerwijs meewerken op kosten van de vrijwarende partij.

9. **Vertrouwelijkheid**. Behalve voor zover nodig voor de uitvoering van deze Overeenkomst, zal een partij die Vertrouwelijke Informatie van de andere ontvangt deze niet gebruiken of openbaar maken, en deze beschermen met minstens dezelfde zorg die zij toepast op haar eigen soortgelijke informatie. Deze verplichtingen gelden niet voor informatie die openbaar is of wordt, reeds zonder beperking bekend was, of onafhankelijk is ontwikkeld zonder gebruik van de Vertrouwelijke Informatie, en een partij mag Vertrouwelijke Informatie openbaar maken voor zover wettelijk vereist, na redelijke voorafgaande kennisgeving waar wettelijk toegestaan.

10. **Voorbehoud van Rechten**. Behoudens de in deze Overeenkomst verleende beperkte rechten, behoudt de Aanbieder alle rechten, aanspraken en belangen in het Product, en behoudt de Klant alle rechten, aanspraken en belangen in zijn Klantinhoud.

11. **Toepasselijk Recht en Gekozen Rechtbanken**. Deze Overeenkomst en alle daarmee verband houdende aangelegenheden worden beheerst door en uitgelegd in overeenstemming met het recht van {{GOVERNING_LAW}}, ongeacht de daarin vervatte conflictregels. Elke gerechtelijke procedure met betrekking tot deze Overeenkomst moet worden aangebracht bij de rechtbanken van {{JURISDICTION}}, waaraan elke partij zich onherroepelijk en exclusief onderwerpt. Een schending van Artikel 9 (Vertrouwelijkheid) of van de intellectuele-eigendomsrechten van een partij kan onherstelbare schade veroorzaken, zodat de niet-schendende partij naast haar overige rechtsmiddelen om een voorlopige voorziening kan verzoeken.

12. **Algemene Bepalingen**. Deze Overeenkomst vormt de volledige overeenkomst tussen partijen met betrekking tot het onderwerp ervan en vervangt alle eerdere besprekingen. Elke wijziging, afstand van recht of aanvulling moet schriftelijk zijn en door beide partijen zijn ondertekend, en indien een bepaling onafdwingbaar wordt geacht, blijft de rest van de Overeenkomst van kracht. Geen van beide partijen mag deze Overeenkomst overdragen zonder voorafgaande schriftelijke toestemming van de andere partij, behalve in verband met een fusie, reorganisatie of verkoop van nagenoeg al haar activa. Partijen zijn onafhankelijke contractanten, en geen van beide is aansprakelijk voor vertraging veroorzaakt door een geval van Overmacht, wat de Klant echter niet ontslaat van de verplichting reeds opgebouwde Vergoedingen te betalen. Deze Overeenkomst kan in meerdere exemplaren worden ondertekend, ook elektronisch, waarbij elk exemplaar als origineel geldt.

Aangepast van de Common Paper Cloud Service Agreement [Standard Terms Version 2.1](https://commonpaper.com/standards/cloud-service-agreement/2.1/), vrij te gebruiken onder [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
`;

function pluralYears(n: number): string {
  return `${n} jaar`;
}

function describeSubscriptionPeriod(years: number): string {
  return (
    `${pluralYears(years)} vanaf de Ingangsdatum, met automatische verlenging voor aanvullende ` +
    `periodes van ${pluralYears(years)}, tenzij een van de partijen niet-verlenging meldt uiterlijk ` +
    `30 dagen voor het einde van de dan lopende periode`
  );
}

export const nl: CsaTemplateModule = {
  STANDARD_TERMS_TEMPLATE,
  describeSubscriptionPeriod,
};
