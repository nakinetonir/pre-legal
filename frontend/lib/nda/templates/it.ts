import { CONFIDENTIALITY_INDEFINITE, type ConfidentialityYears } from "../durations";
import type { TemplateModule } from "./types";

/**
 * Italian translation of the Standard Terms body of the Common Paper Mutual
 * NDA v1.0 (AG-91). The `{{TOKEN}}` placeholders are substituted by
 * fillStandardTerms() with the values from the form; they must be kept
 * verbatim and in the same relative order as the English source.
 *
 * Source: https://commonpaper.com/standards/mutual-nda/1.0/ (CC BY 4.0)
 */
const STANDARD_TERMS_TEMPLATE = `1. **Introduzione**. Il presente Accordo di Riservatezza Reciproco (che incorpora i presenti Termini Standard e il Frontespizio (come definito di seguito)) (“**MNDA**”) consente a ciascuna parte (“**Parte Divulgante**”) di divulgare o mettere a disposizione informazioni relative alla {{PURPOSE}} che (1) la Parte Divulgante identifichi nei confronti della parte ricevente (“**Parte Ricevente**”) come “riservate”, “di proprietà” o simili, oppure (2) debbano ragionevolmente essere considerate riservate o di proprietà in ragione della loro natura e delle circostanze della loro divulgazione (“**Informazioni Riservate**”). Le Informazioni Riservate di ciascuna parte comprendono anche l'esistenza e lo stato delle trattative tra le parti e le informazioni contenute nel Frontespizio. Le Informazioni Riservate comprendono informazioni tecniche o commerciali, progetti o roadmap di prodotto, requisiti, prezzi, documentazione relativa a sicurezza e conformità, tecnologia, invenzioni e know-how. Per utilizzare il presente MNDA, le parti devono compilare e sottoscrivere un frontespizio che incorpori i presenti Termini Standard (“**Frontespizio**”). Ciascuna parte è identificata nel Frontespizio e i termini con iniziale maiuscola hanno il significato loro attribuito nel presente documento o nel Frontespizio.

2. **Utilizzo e Protezione delle Informazioni Riservate**. La Parte Ricevente dovrà: (a) utilizzare le Informazioni Riservate esclusivamente per la {{PURPOSE}}; (b) non divulgare le Informazioni Riservate a terzi senza la previa autorizzazione scritta della Parte Divulgante, fermo restando che la Parte Ricevente potrà divulgare le Informazioni Riservate ai propri dipendenti, agenti, consulenti, appaltatori e altri rappresentanti che abbiano una ragionevole necessità di conoscerle per la {{PURPOSE}}, purché tali rappresentanti siano vincolati da obblighi di riservatezza non meno protettivi per la Parte Divulgante rispetto ai termini applicabili del presente MNDA, e la Parte Ricevente rimanga responsabile del loro rispetto; e (c) proteggere le Informazioni Riservate utilizzando quantomeno le stesse protezioni che la Parte Ricevente utilizza per le proprie informazioni analoghe, e comunque non inferiori a uno standard di diligenza ragionevole.

3. **Eccezioni**. Gli obblighi della Parte Ricevente ai sensi del presente MNDA non si applicano alle informazioni che la stessa sia in grado di dimostrare: (a) essere o divenire di pubblico dominio senza colpa della Parte Ricevente; (b) essere già lecitamente conosciute o possedute prima della ricezione dalla Parte Divulgante, senza vincoli di riservatezza; (c) essere state lecitamente ottenute da un terzo senza vincoli di riservatezza; oppure (d) essere state sviluppate autonomamente senza utilizzare né fare riferimento alle Informazioni Riservate.

4. **Divulgazioni Richieste dalla Legge**. La Parte Ricevente potrà divulgare Informazioni Riservate nella misura richiesta da leggi, normative o autorità regolamentari, citazioni o provvedimenti giudiziari, a condizione che (nella misura legalmente consentita) fornisca alla Parte Divulgante un ragionevole preavviso della divulgazione richiesta e collabori ragionevolmente, a spese della Parte Divulgante, agli sforzi di quest'ultima volti a ottenere un trattamento riservato delle Informazioni Riservate.

5. **Durata e Risoluzione**. Il presente MNDA decorre dalla {{EFFECTIVE_DATE}} e scade al termine della {{MNDA_TERM}}. Ciascuna parte potrà risolvere il presente MNDA per qualsiasi motivo o senza motivo, mediante comunicazione scritta all'altra parte. Gli obblighi della Parte Ricevente relativi alle Informazioni Riservate rimarranno in vigore per la {{TERM_OF_CONFIDENTIALITY}}, indipendentemente dalla scadenza o risoluzione del presente MNDA.

6. **Restituzione o Distruzione delle Informazioni Riservate**. Alla scadenza o risoluzione del presente MNDA, oppure su precedente richiesta della Parte Divulgante, la Parte Ricevente dovrà: (a) cessare l'utilizzo delle Informazioni Riservate; (b) tempestivamente, dopo la richiesta scritta della Parte Divulgante, distruggere tutte le Informazioni Riservate in proprio possesso o controllo, oppure restituirle alla Parte Divulgante; e (c) se richiesto dalla Parte Divulgante, confermare per iscritto l'osservanza di tali obblighi. In deroga alla lettera (b), la Parte Ricevente potrà conservare le Informazioni Riservate in conformità alle proprie politiche standard di backup o di conservazione dei documenti, ovvero come richiesto dalla legge, fermo restando che i termini del presente MNDA continueranno ad applicarsi alle Informazioni Riservate conservate.

7. **Diritti di Proprietà**. La Parte Divulgante conserva la titolarità di tutti i propri diritti di proprietà intellettuale e degli altri diritti relativi alle proprie Informazioni Riservate, e la loro divulgazione alla Parte Ricevente non concede alcuna licenza su tali diritti.

8. **Esclusione di Garanzie**. TUTTE LE INFORMAZIONI RISERVATE SONO FORNITE “COSÌ COME SONO”, CON TUTTI I LORO DIFETTI E SENZA GARANZIE, INCLUSE LE GARANZIE IMPLICITE DI TITOLARITÀ, COMMERCIABILITÀ E IDONEITÀ A UNO SCOPO PARTICOLARE.

9. **Legge Applicabile e Foro Competente**. Il presente MNDA e tutte le questioni ad esso relative sono disciplinati e interpretati in conformità alle leggi di {{GOVERNING_LAW}}, senza riguardo alle relative norme sui conflitti di legge. Qualsiasi controversia, azione o procedimento legale relativo al presente MNDA dovrà essere promosso dinanzi ai tribunali di {{JURISDICTION}}. Ciascuna parte si sottopone irrevocabilmente alla giurisdizione esclusiva di tali tribunali di {{JURISDICTION}} per qualsiasi controversia, azione o procedimento di tale natura.

10. **Tutela Cautelare**. Una violazione del presente MNDA può causare un danno irreparabile per il quale il risarcimento pecuniario costituirebbe un rimedio insufficiente. In caso di violazione del presente MNDA, la Parte Divulgante avrà diritto a richiedere l'opportuna tutela cautelare, inclusa un'ingiunzione, in aggiunta agli altri rimedi disponibili.

11. **Disposizioni Generali**. Nessuna delle parti è tenuta, ai sensi del presente MNDA, a divulgare Informazioni Riservate all'altra parte né a proseguire con qualsiasi operazione proposta. Nessuna delle parti potrà cedere il presente MNDA senza il previo consenso scritto dell'altra parte, fermo restando che ciascuna parte potrà cederlo nell'ambito di una fusione, riorganizzazione, acquisizione o altro trasferimento della totalità o sostanzialmente della totalità dei propri beni o titoli con diritto di voto. Qualsiasi cessione effettuata in violazione della presente clausola sarà nulla. Il presente MNDA vincolerà e andrà a beneficio dei successori e aventi causa autorizzati di ciascuna parte. Le rinunce dovranno essere sottoscritte dal rappresentante autorizzato della parte rinunciante e non potranno essere desunte dalla condotta. Qualora una disposizione del presente MNDA fosse dichiarata inapplicabile, essa sarà limitata nella misura minima necessaria affinché il resto del MNDA rimanga efficace. Il presente MNDA (compreso il Frontespizio) costituisce l'intero accordo tra le parti in relazione al suo oggetto e sostituisce ogni precedente o contestuale intesa, accordo, dichiarazione e garanzia, scritta od orale, relativa a tale oggetto. Il presente MNDA potrà essere modificato, alterato, derogato o integrato esclusivamente mediante accordo scritto sottoscritto da entrambe le parti. Le comunicazioni, richieste e approvazioni previste dal presente MNDA dovranno essere inviate per iscritto agli indirizzi email o postali indicati nel Frontespizio e si considereranno consegnate al momento della ricezione. Il presente MNDA potrà essere sottoscritto in più esemplari, incluse copie elettroniche, ciascuno dei quali sarà considerato un originale e che insieme costituiranno un unico accordo.

Accordo di Riservatezza Reciproco Common Paper, [Versione 1.0](https://commonpaper.com/standards/mutual-nda/1.0/), liberamente utilizzabile con licenza [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
`;

function pluralYears(n: number): string {
  return `${n} ${n === 1 ? "anno" : "anni"}`;
}

/** Frase inserita in "... e scade al termine della {{MNDA_TERM}}." */
function describeMndaTerm(years: number): string {
  return `${pluralYears(years)} dalla Data di Efficacia`;
}

/** Frase inserita in "... rimarranno in vigore per la {{TERM_OF_CONFIDENTIALITY}}, ..." */
function describeConfidentiality(years: ConfidentialityYears): string {
  if (years === CONFIDENTIALITY_INDEFINITE) {
    return "un periodo indeterminato successivo alla scadenza o risoluzione del presente MNDA";
  }
  return `${pluralYears(years)} successivi alla scadenza o risoluzione del presente MNDA`;
}

export const it: TemplateModule = {
  STANDARD_TERMS_TEMPLATE,
  describeMndaTerm,
  describeConfidentiality,
};
