import type { PilotTemplateModule } from "./types";

/** French adaptation of the Pilot Agreement Standard Terms - see en.ts for the source note. */
const STANDARD_TERMS_TEMPLATE = `1. **Accès Pilote**. Pendant la Période Pilote et sous réserve des termes du présent Contrat, le Client peut accéder au Produit, ainsi qu'à tout Logiciel inclus, et l'utiliser uniquement pour {{EVALUATION_PURPOSE}}. Le Client est responsable de toutes les actions effectuées sur les comptes de ses Utilisateurs et du respect du présent Contrat par ces derniers. Le Client peut fournir des Retours au Fournisseur, que celui-ci peut utiliser librement, et le Fournisseur peut collecter et analyser des Données d'Utilisation agrégées afin de maintenir, améliorer et promouvoir ses produits et services. Sauf autorisation expresse du présent Contrat, le Client ne procédera pas à une ingénierie inverse, une revente ou une sous-licence du Produit, ne supprimera aucune mention de propriété, et ne l'utilisera pas pour développer un produit concurrent. Sauf pour cette licence limitée, le Fournisseur conserve tout droit, titre et intérêt sur le Produit, et le Client conserve tout droit, titre et intérêt sur son Contenu.

2. **Durée et Résiliation**. Le présent Contrat prend effet le {{EFFECTIVE_DATE}} et, sauf résiliation anticipée, se poursuit pendant {{PILOT_PERIOD}}. Chaque partie peut résilier immédiatement si l'autre partie ne remédie pas à une violation substantielle dans les 30 jours suivant la notification, devient insolvable, ou moyennant un préavis de 30 jours, pour quelque raison que ce soit. À l'expiration ou à la résiliation : le Client cessera d'utiliser le Produit et, le cas échéant, désinstallera tout Logiciel ; le Fournisseur supprimera le Contenu du Client dans les 60 jours suivant la demande ; et chaque partie restituera ou détruira les Informations Confidentielles de l'autre en sa possession.

3. **Déclarations**. Chaque partie déclare à l'autre qu'elle a le pouvoir légal de conclure le présent Contrat et qu'elle est dûment organisée et en règle conformément à la réglementation applicable de sa juridiction d'origine.

4. **Exclusion de Garanties**. Le Fournisseur ne garantit pas que le Produit sera toujours exempt d'interruptions ou d'erreurs. **Le Produit est fourni « EN L'ÉTAT » et « SELON DISPONIBILITÉ », et le Fournisseur exclut toute garantie ou condition, expresse ou implicite, y compris les garanties implicites de qualité marchande, d'adéquation à un usage particulier et de non-contrefaçon, dans toute la mesure permise par la réglementation applicable.**

5. **Limitation de Responsabilité**. **Sauf en cas de violation de la Section 6 (Confidentialité), la responsabilité cumulée totale de chaque partie pour toutes les réclamations découlant du présent Contrat n'excédera pas {{GENERAL_CAP_AMOUNT}}, et en aucun cas une partie ne sera responsable envers l'autre de la perte de profits ni de dommages consécutifs, spéciaux, indirects, exemplaires, punitifs ou accessoires, même si elle a été informée de la possibilité de tels dommages.** Ces limitations s'appliquent à toute responsabilité, qu'elle soit délictuelle, contractuelle ou autre, sauf dans la mesure interdite par la réglementation applicable.

6. **Confidentialité**. Sauf si cela est nécessaire à l'exécution du présent Contrat, une partie recevant les Informations Confidentielles de l'autre ne les utilisera ni ne les divulguera, et les protégera avec au moins le même soin qu'elle applique à ses propres informations similaires. Ces obligations ne s'appliquent pas aux informations qui sont ou deviennent publiques, qui étaient déjà connues sans restriction, ou qui sont développées indépendamment sans référence aux Informations Confidentielles, et une partie peut divulguer des Informations Confidentielles dans la mesure exigée par la loi après en avoir raisonnablement informé l'autre partie lorsque la loi le permet.

7. **Droit Applicable et Tribunaux Compétents**. Le présent Contrat et toutes les questions qui s'y rapportent sont régis et interprétés conformément aux lois de {{GOVERNING_LAW}}, sans égard à ses règles de conflit de lois. Toute action judiciaire relative au présent Contrat doit être portée devant les tribunaux de {{JURISDICTION}}, auxquels chaque partie se soumet irrévocablement et exclusivement. Une violation de la Section 6 (Confidentialité) peut causer un préjudice irréparable, de sorte que la partie non fautive peut demander des mesures injonctives en plus de ses autres recours.

8. **Dispositions Générales**. Le présent Contrat constitue l'intégralité de l'accord entre les parties sur son objet et remplace toute discussion antérieure. Toute modification, renonciation ou avenant doit être écrit et signé par les deux parties, et si une disposition est jugée inapplicable, le reste du Contrat demeure en vigueur. Aucune partie ne peut céder le présent Contrat sans le consentement écrit préalable de l'autre, sauf dans le cadre d'une fusion, réorganisation ou vente de la quasi-totalité de ses actifs. Les parties sont des contractants indépendants, et aucune n'est responsable d'un retard causé par un Cas de Force Majeure. Le présent Contrat peut être signé en plusieurs exemplaires, y compris électroniquement, chacun étant considéré comme un original.

Adapté du Common Paper Pilot Agreement [Standard Terms Version 1.1](https://commonpaper.com/standards/pilot-agreement/1.1), libre d'utilisation sous licence [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
`;

function pluralMonths(n: number): string {
  return `${n} mois`;
}

function describePilotPeriod(months: number): string {
  return `${pluralMonths(months)} à compter de la Date d'Entrée en Vigueur`;
}

export const fr: PilotTemplateModule = {
  STANDARD_TERMS_TEMPLATE,
  describePilotPeriod,
};
