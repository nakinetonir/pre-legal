import { CONFIDENTIALITY_INDEFINITE, type ConfidentialityYears } from "../durations";
import type { TemplateModule } from "./types";

/**
 * French translation of the Standard Terms body of the Common Paper Mutual
 * NDA v1.0 (AG-87). The `{{TOKEN}}` placeholders are substituted by
 * fillStandardTerms() with the values from the form; they must be kept
 * verbatim and in the same relative order as the English source.
 *
 * Source: https://commonpaper.com/standards/mutual-nda/1.0/ (CC BY 4.0)
 */
const STANDARD_TERMS_TEMPLATE = `1. **Introduction**. Le présent Accord de Confidentialité Mutuel (qui intègre les présents Termes Standards et la Page de Garde (définie ci-après)) (« **MNDA** ») permet à chaque partie (« **Partie Divulgatrice** ») de divulguer ou de mettre à disposition des informations en lien avec la {{PURPOSE}} que (1) la Partie Divulgatrice identifie auprès de la partie destinataire (« **Partie Réceptrice** ») comme « confidentielle », « propriétaire » ou équivalent, ou (2) qui devrait raisonnablement être comprise comme confidentielle ou propriétaire compte tenu de sa nature et des circonstances de sa divulgation (« **Information Confidentielle** »). L'Information Confidentielle de chaque partie inclut également l'existence et l'état des discussions entre les parties ainsi que les informations figurant sur la Page de Garde. L'Information Confidentielle comprend les informations techniques ou commerciales, les conceptions ou feuilles de route de produits, les exigences, les prix, la documentation relative à la sécurité et à la conformité, la technologie, les inventions et le savoir-faire. Pour utiliser le présent MNDA, les parties doivent compléter et signer une page de garde intégrant les présents Termes Standards (« **Page de Garde** »). Chaque partie est identifiée sur la Page de Garde et les termes en majuscules ont le sens qui leur est donné dans le présent document ou sur la Page de Garde.

2. **Utilisation et Protection de l'Information Confidentielle**. La Partie Réceptrice doit : (a) utiliser l'Information Confidentielle uniquement pour la {{PURPOSE}} ; (b) ne pas divulguer l'Information Confidentielle à des tiers sans l'accord écrit préalable de la Partie Divulgatrice, sauf que la Partie Réceptrice peut divulguer l'Information Confidentielle à ses employés, agents, conseils, prestataires et autres représentants ayant un besoin raisonnable d'en connaître pour la {{PURPOSE}}, à condition que ces représentants soient liés par des obligations de confidentialité au moins aussi protectrices pour la Partie Divulgatrice que les termes applicables du présent MNDA, la Partie Réceptrice demeurant responsable du respect de ces obligations ; et (c) protéger l'Information Confidentielle en utilisant au moins les mêmes protections que celles qu'elle applique à ses propres informations similaires, sans que cela ne soit inférieur à un standard de diligence raisonnable.

3. **Exceptions**. Les obligations de la Partie Réceptrice au titre du présent MNDA ne s'appliquent pas aux informations dont elle peut démontrer qu'elles : (a) sont ou deviennent publiquement disponibles sans faute de la Partie Réceptrice ; (b) étaient légitimement connues ou en sa possession avant leur réception de la Partie Divulgatrice, sans restriction de confidentialité ; (c) ont été obtenues légitimement d'un tiers sans restriction de confidentialité ; ou (d) ont été développées de façon indépendante sans utiliser ni se référer à l'Information Confidentielle.

4. **Divulgations Requises par la Loi**. La Partie Réceptrice peut divulguer l'Information Confidentielle dans la mesure exigée par la loi, un règlement, une autorité réglementaire, une citation à comparaître ou une décision de justice, à condition (dans la mesure légalement permise) de fournir à la Partie Divulgatrice un préavis raisonnable de la divulgation requise et de coopérer raisonnablement, aux frais de la Partie Divulgatrice, aux efforts de cette dernière pour obtenir un traitement confidentiel de l'Information Confidentielle.

5. **Durée et Résiliation**. Le présent MNDA prend effet à la {{EFFECTIVE_DATE}} et expire au terme de la {{MNDA_TERM}}. Chaque partie peut résilier le présent MNDA pour quelque motif que ce soit ou sans motif, moyennant notification écrite à l'autre partie. Les obligations de la Partie Réceptrice relatives à l'Information Confidentielle subsisteront pendant la {{TERM_OF_CONFIDENTIALITY}}, nonobstant toute expiration ou résiliation du présent MNDA.

6. **Restitution ou Destruction de l'Information Confidentielle**. À l'expiration ou à la résiliation du présent MNDA, ou sur demande préalable de la Partie Divulgatrice, la Partie Réceptrice devra : (a) cesser d'utiliser l'Information Confidentielle ; (b) promptement après la demande écrite de la Partie Divulgatrice, détruire toute l'Information Confidentielle en sa possession ou sous son contrôle, ou la restituer à la Partie Divulgatrice ; et (c) si la Partie Divulgatrice le demande, confirmer par écrit le respect de ces obligations. Par exception au point (b), la Partie Réceptrice peut conserver l'Information Confidentielle conformément à ses politiques habituelles de sauvegarde ou de conservation des documents, ou si la loi l'exige, les termes du présent MNDA continuant alors à s'appliquer à l'Information Confidentielle conservée.

7. **Droits de Propriété**. La Partie Divulgatrice conserve l'intégralité de ses droits de propriété intellectuelle et autres droits sur son Information Confidentielle, et sa divulgation à la Partie Réceptrice n'accorde aucune licence sur ces droits.

8. **Exclusion de Garantie**. TOUTE INFORMATION CONFIDENTIELLE EST FOURNIE « EN L'ÉTAT », AVEC TOUS SES DÉFAUTS ET SANS GARANTIE, Y COMPRIS LES GARANTIES IMPLICITES DE TITRE, DE QUALITÉ MARCHANDE ET D'ADÉQUATION À UN USAGE PARTICULIER.

9. **Droit Applicable et Juridiction**. Le présent MNDA et toutes les questions qui s'y rapportent sont régis et interprétés conformément aux lois de {{GOVERNING_LAW}}, sans égard aux principes de conflits de lois. Tout litige, action ou procédure judiciaire relatif au présent MNDA devra être engagé devant les tribunaux de {{JURISDICTION}}. Chaque partie se soumet irrévocablement à la compétence exclusive de ces tribunaux de {{JURISDICTION}} pour tout litige, action ou procédure de cette nature.

10. **Réparation en Nature**. Une violation du présent MNDA peut causer un préjudice irréparable pour lequel des dommages-intérêts constitueraient un recours insuffisant. En cas de violation du présent MNDA, la Partie Divulgatrice a le droit de solliciter les mesures équitables appropriées, y compris une injonction, en sus de ses autres recours.

11. **Dispositions Générales**. Aucune partie n'est tenue, au titre du présent MNDA, de divulguer à l'autre partie une quelconque Information Confidentielle ni de poursuivre une quelconque opération envisagée. Aucune partie ne peut céder le présent MNDA sans le consentement écrit préalable de l'autre partie, sauf que chaque partie peut céder le présent MNDA dans le cadre d'une fusion, d'une réorganisation, d'une acquisition ou d'un autre transfert de la totalité ou de la quasi-totalité de ses actifs ou de ses titres avec droit de vote. Toute cession en violation de la présente clause sera nulle et non avenue. Le présent MNDA lie et bénéficie aux successeurs et ayants droit autorisés de chaque partie. Les renonciations doivent être signées par le représentant autorisé de la partie qui y renonce et ne peuvent être déduites d'un comportement. Si une disposition du présent MNDA est jugée inapplicable, elle sera limitée dans la stricte mesure nécessaire afin que le reste du MNDA demeure en vigueur. Le présent MNDA (y compris la Page de Garde) constitue l'intégralité de l'accord entre les parties quant à son objet, et prévaut sur tous les accords, engagements, déclarations et garanties antérieurs ou contemporains, écrits ou oraux, relatifs à cet objet. Le présent MNDA ne peut être modifié, altéré, faire l'objet d'une renonciation ou être complété que par un accord écrit signé par les deux parties. Les notifications, demandes et approbations au titre du présent MNDA doivent être envoyées par écrit aux adresses électroniques ou postales figurant sur la Page de Garde et sont réputées délivrées dès réception. Le présent MNDA peut être signé en plusieurs exemplaires, y compris des copies électroniques, chacun étant réputé original et l'ensemble constituant un seul et même accord.

Accord de Confidentialité Mutuel Common Paper, [Version 1.0](https://commonpaper.com/standards/mutual-nda/1.0/), libre d'utilisation sous licence [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
`;

function pluralYears(n: number): string {
  return `${n} an${n === 1 ? "" : "s"}`;
}

/** Phrase insérée dans « ... et expire au terme de la {{MNDA_TERM}}. » */
function describeMndaTerm(years: number): string {
  return `${pluralYears(years)} à compter de la Date d'entrée en vigueur`;
}

/** Phrase insérée dans « ... subsisteront pendant la {{TERM_OF_CONFIDENTIALITY}}, ... » */
function describeConfidentiality(years: ConfidentialityYears): string {
  if (years === CONFIDENTIALITY_INDEFINITE) {
    return "une durée indéterminée suivant l'expiration ou la résiliation du présent MNDA";
  }
  return `${pluralYears(years)} suivant l'expiration ou la résiliation du présent MNDA`;
}

export const fr: TemplateModule = {
  STANDARD_TERMS_TEMPLATE,
  describeMndaTerm,
  describeConfidentiality,
};
