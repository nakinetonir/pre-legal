import type { PilotTemplateModule } from "./types";

/** Italian adaptation of the Pilot Agreement Standard Terms - see en.ts for the source note. */
const STANDARD_TERMS_TEMPLATE = `1. **Accesso Pilota**. Durante il Periodo Pilota e fatti salvi i termini del presente Accordo, il Cliente potrà accedere e utilizzare il Prodotto, e qualsiasi Software incluso, esclusivamente per {{EVALUATION_PURPOSE}}. Il Cliente è responsabile di tutte le azioni compiute sugli account dei propri Utenti e del rispetto del presente Accordo da parte di questi ultimi. Il Cliente può fornire Feedback al Fornitore, che questi potrà utilizzare liberamente, e il Fornitore può raccogliere e analizzare Dati di Utilizzo aggregati per mantenere, migliorare e promuovere i propri prodotti e servizi. Salvo quanto espressamente consentito dal presente Accordo, il Cliente non effettuerà reverse engineering, rivendita o sublicenza del Prodotto, non rimuoverà avvisi di proprietà e non lo utilizzerà per sviluppare un prodotto concorrente. Salvo questa licenza limitata, il Fornitore conserva ogni diritto, titolo e interesse sul Prodotto, e il Cliente conserva ogni diritto, titolo e interesse sui propri Contenuti.

2. **Durata e Risoluzione**. Il presente Accordo decorre dal {{EFFECTIVE_DATE}} e, salvo risoluzione anticipata, prosegue per {{PILOT_PERIOD}}. Ciascuna parte può risolvere immediatamente se l'altra non sana una violazione sostanziale entro 30 giorni dalla notifica, diviene insolvente, o con preavviso di 30 giorni per qualsiasi motivo. Alla scadenza o risoluzione: il Cliente cesserà di utilizzare il Prodotto e, se applicabile, disinstallerà qualsiasi Software; il Fornitore eliminerà il Contenuto del Cliente entro 60 giorni dalla richiesta; e ciascuna parte restituirà o distruggerà le Informazioni Riservate dell'altra in suo possesso.

3. **Dichiarazioni**. Ciascuna parte dichiara all'altra di avere il potere legale di stipulare il presente Accordo e di essere debitamente costituita e in regola ai sensi della normativa applicabile della propria giurisdizione di origine.

4. **Esclusione di Garanzie**. Il Fornitore non garantisce che il Prodotto sarà sempre privo di interruzioni o errori. **Il Prodotto è fornito su base "COSÌ COM'È" e "COME DISPONIBILE", e il Fornitore esclude ogni garanzia o condizione, espressa o implicita, incluse le garanzie implicite di commerciabilità, idoneità a uno scopo particolare e non violazione, nella misura massima consentita dalla normativa applicabile.**

5. **Limitazione di Responsabilità**. **Salvo in caso di violazione della Sezione 6 (Riservatezza), la responsabilità complessiva cumulativa di ciascuna parte per tutte le pretese derivanti dal presente Accordo non supererà {{GENERAL_CAP_AMOUNT}}, e in nessun caso una parte sarà responsabile verso l'altra per mancati profitti né per danni consequenziali, speciali, indiretti, esemplari, punitivi o incidentali, anche qualora fosse stata informata della possibilità di tali danni.** Tali limitazioni si applicano a ogni responsabilità, contrattuale, extracontrattuale o di altra natura, salvo nei limiti vietati dalla normativa applicabile.

6. **Riservatezza**. Salvo quanto necessario per l'esecuzione del presente Accordo, la parte che riceve Informazioni Riservate dell'altra non le utilizzerà né le divulgherà, e le proteggerà con almeno la stessa cura riservata alle proprie informazioni analoghe. Tali obblighi non si applicano alle informazioni che siano o divengano pubbliche, già note senza restrizioni, o sviluppate autonomamente senza riferimento alle Informazioni Riservate, e una parte può divulgare Informazioni Riservate nella misura richiesta dalla legge, previa ragionevole comunicazione ove legalmente consentito.

7. **Legge Applicabile e Foro Competente**. Il presente Accordo e tutte le questioni ad esso relative sono disciplinati e interpretati secondo le leggi di {{GOVERNING_LAW}}, senza riguardo alle relative norme di conflitto di leggi. Qualsiasi controversia relativa al presente Accordo dovrà essere promossa dinanzi ai tribunali di {{JURISDICTION}}, alla cui giurisdizione esclusiva ciascuna parte si sottopone irrevocabilmente. Una violazione della Sezione 6 (Riservatezza) può causare un danno irreparabile, per cui la parte non inadempiente potrà richiedere provvedimenti cautelari in aggiunta agli altri rimedi disponibili.

8. **Disposizioni Generali**. Il presente Accordo costituisce l'intero accordo tra le parti in merito al suo oggetto e sostituisce ogni discussione precedente. Qualsiasi modifica, rinuncia o integrazione deve essere scritta e firmata da entrambe le parti, e se una disposizione risulta inapplicabile, il resto dell'Accordo rimane efficace. Nessuna parte può cedere il presente Accordo senza il previo consenso scritto dell'altra, salvo in relazione a fusione, riorganizzazione o cessione della quasi totalità dei propri beni. Le parti sono contraenti indipendenti, e nessuna è responsabile per un ritardo causato da un Evento di Forza Maggiore. Il presente Accordo può essere firmato in più copie, anche elettronicamente, ciascuna delle quali sarà considerata un originale.

Adattato dal Common Paper Pilot Agreement [Standard Terms Version 1.1](https://commonpaper.com/standards/pilot-agreement/1.1), liberamente utilizzabile ai sensi della licenza [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
`;

function pluralMonths(n: number): string {
  return `${n} mes${n === 1 ? "e" : "i"}`;
}

function describePilotPeriod(months: number): string {
  return `${pluralMonths(months)} dalla Data di Efficacia`;
}

export const it: PilotTemplateModule = {
  STANDARD_TERMS_TEMPLATE,
  describePilotPeriod,
};
