import type { CsaTemplateModule } from "./types";

/** Italian adaptation of the CSA Standard Terms - see en.ts for the source note. */
const STANDARD_TERMS_TEMPLATE = `1. **Servizio**. Durante il Periodo di Abbonamento e fatti salvi i termini del presente Accordo, il Cliente potrà accedere e utilizzare il Servizio Cloud e qualsiasi Software e Documentazione inclusi, esclusivamente per le proprie finalità aziendali interne. Il Cliente è responsabile di tutte le azioni compiute sugli account dei propri Utenti e del rispetto del presente Accordo da parte di questi ultimi. Il Cliente può fornire Feedback al Fornitore, che questi potrà utilizzare liberamente, e il Fornitore può raccogliere e analizzare Dati di Utilizzo aggregati per mantenere, migliorare e promuovere i propri prodotti e servizi, incluso lo sviluppo o il miglioramento di modelli di intelligenza artificiale o apprendimento automatico, senza identificare il Cliente o i suoi Utenti.

2. **Restrizioni e Sospensione**. Salvo quanto espressamente consentito dal presente Accordo, il Cliente non effettuerà (né consentirà a terzi di effettuare) reverse engineering del Prodotto, non lo rivenderà né lo sublicenzierà, non rimuoverà avvisi di proprietà e non lo utilizzerà per sviluppare un prodotto concorrente o in violazione della normativa applicabile. Se il Cliente presenta un saldo non contestato scaduto da oltre 30 giorni o viola sostanzialmente il presente Accordo, il Fornitore potrà sospendere il suo accesso, cercando di darne preavviso quando possibile, e lo ripristinerà una volta risolto il problema.

3. **Pagamento e Imposte**. {{PAYMENT_PROCESS}}. Il Cliente è responsabile di tutti i tributi, imposte e oneri applicabili alle Tariffe, ad eccezione delle imposte sul reddito del Fornitore. In caso di contestazione in buona fede di una fattura, il Cliente deve notificarlo al Fornitore prima della scadenza del pagamento e versare puntualmente gli importi non contestati; le parti collaboreranno in buona fede per risolvere la controversia.

4. **Durata e Risoluzione**. Il presente Accordo decorre dal {{EFFECTIVE_DATE}} e prosegue per {{SUBSCRIPTION_PERIOD}}. Ciascuna parte può risolvere immediatamente se l'altra non sana una violazione sostanziale entro 30 giorni dalla notifica, o diviene insolvente. Alla scadenza o risoluzione: il Cliente perde ogni diritto di utilizzare il Prodotto; il Fornitore elimina i Contenuti del Cliente entro 60 giorni dalla richiesta; ciascuna parte restituisce o distrugge le Informazioni Riservate dell'altra; e il Fornitore emette fattura finale per le Tariffe maturate prima della risoluzione.

5. **Dichiarazioni e Garanzie**. Ciascuna parte dichiara di avere il potere di stipulare il presente Accordo e di rispettare la normativa applicabile nella sua esecuzione. Il Fornitore garantisce inoltre che non ridurrà sostanzialmente la funzionalità generale del Servizio Cloud durante il Periodo di Abbonamento. Se il Fornitore viola tale garanzia, l'unico rimedio del Cliente sarà che il Fornitore ripristini la funzionalità entro 45 giorni dalla notifica o, in mancanza, che il Cliente risolva l'abbonamento interessato e riceva un rimborso proporzionale delle Tariffe prepagate.

6. **Esclusione di Garanzie**. Fatte salve le garanzie di cui alla Sezione 5 (Dichiarazioni e Garanzie), il Prodotto è fornito **"COSÌ COM'È", e il Fornitore e il Cliente escludono ciascuno ogni altra garanzia o condizione, espressa o implicita, incluse le garanzie implicite di commerciabilità, idoneità a uno scopo particolare e non violazione, nella misura massima consentita dalla normativa applicabile**.

7. **Limitazione di Responsabilità**. **Salvo in caso di violazione della Sezione 9 (Riservatezza) o degli obblighi di manleva di una parte ai sensi della Sezione 8 (Manleva), la responsabilità complessiva cumulativa di ciascuna parte per tutte le pretese derivanti dal presente Accordo non supererà {{GENERAL_CAP_AMOUNT}}, e in nessun caso una parte sarà responsabile verso l'altra per mancati profitti né per danni consequenziali, speciali, indiretti, esemplari, punitivi o incidentali, anche qualora fosse stata informata della possibilità di tali danni.** Tali limitazioni si applicano a ogni responsabilità, contrattuale, extracontrattuale o di altra natura, salvo nei limiti vietati dalla normativa applicabile.

8. **Manleva**. Il Fornitore difenderà e terrà indenne il Cliente da pretese di terzi secondo cui il Prodotto violerebbe i loro diritti di proprietà intellettuale, e il Cliente difenderà e terrà indenne il Fornitore da pretese di terzi derivanti da un uso improprio del Prodotto o dei Contenuti del Cliente, comprese in ciascun caso le ragionevoli spese legali. La parte manlevata deve notificare tempestivamente alla parte manlevante la pretesa, concederle il controllo esclusivo della difesa e della transazione, e collaborare ragionevolmente a spese della parte manlevante.

9. **Riservatezza**. Salvo quanto necessario per l'esecuzione del presente Accordo, la parte che riceve Informazioni Riservate dell'altra non le utilizzerà né le divulgherà, e le proteggerà con almeno la stessa cura riservata alle proprie informazioni analoghe. Tali obblighi non si applicano alle informazioni che siano o divengano pubbliche, già note senza restrizioni, o sviluppate autonomamente senza riferimento alle Informazioni Riservate, e una parte può divulgare Informazioni Riservate nella misura richiesta dalla legge, previa ragionevole comunicazione ove legalmente consentito.

10. **Riserva di Diritti**. Fatti salvi i diritti limitati concessi dal presente Accordo, il Fornitore conserva ogni diritto, titolo e interesse sul Prodotto, e il Cliente conserva ogni diritto, titolo e interesse sui propri Contenuti.

11. **Legge Applicabile e Foro Competente**. Il presente Accordo e tutte le questioni ad esso relative sono disciplinati e interpretati secondo le leggi di {{GOVERNING_LAW}}, senza riguardo alle relative norme di conflitto di leggi. Qualsiasi controversia relativa al presente Accordo dovrà essere promossa dinanzi ai tribunali di {{JURISDICTION}}, alla cui giurisdizione esclusiva ciascuna parte si sottopone irrevocabilmente. Una violazione della Sezione 9 (Riservatezza) o dei diritti di proprietà intellettuale di una parte può causare un danno irreparabile, per cui la parte non inadempiente potrà richiedere provvedimenti cautelari in aggiunta agli altri rimedi disponibili.

12. **Disposizioni Generali**. Il presente Accordo costituisce l'intero accordo tra le parti in merito al suo oggetto e sostituisce ogni discussione precedente. Qualsiasi modifica, rinuncia o integrazione deve essere scritta e firmata da entrambe le parti, e se una disposizione risulta inapplicabile, il resto dell'Accordo rimane efficace. Nessuna parte può cedere il presente Accordo senza il previo consenso scritto dell'altra, salvo in relazione a fusione, riorganizzazione o cessione della quasi totalità dei propri beni. Le parti sono contraenti indipendenti, e nessuna è responsabile per un ritardo causato da un Evento di Forza Maggiore, il che tuttavia non esonera il Cliente dall'obbligo di pagare le Tariffe già maturate. Il presente Accordo può essere firmato in più copie, anche elettronicamente, ciascuna delle quali sarà considerata un originale.

Adattato dal Common Paper Cloud Service Agreement [Standard Terms Version 2.1](https://commonpaper.com/standards/cloud-service-agreement/2.1/), liberamente utilizzabile ai sensi della licenza [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
`;

function pluralYears(n: number): string {
  return `${n} ${n === 1 ? "anno" : "anni"}`;
}

function describeSubscriptionPeriod(years: number): string {
  return (
    `${pluralYears(years)} dalla Data di Efficacia, con rinnovo automatico per ulteriori periodi di ` +
    `${pluralYears(years)} salvo disdetta comunicata da una delle parti almeno 30 giorni prima della ` +
    `fine del periodo in corso`
  );
}

export const it: CsaTemplateModule = {
  STANDARD_TERMS_TEMPLATE,
  describeSubscriptionPeriod,
};
