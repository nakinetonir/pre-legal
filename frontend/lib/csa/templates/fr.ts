import type { CsaTemplateModule } from "./types";

/** French adaptation of the CSA Standard Terms - see en.ts for the source note. */
const STANDARD_TERMS_TEMPLATE = `1. **Service**. Pendant la Période d'Abonnement et sous réserve des termes du présent Contrat, le Client peut accéder au Service Cloud et à tout Logiciel et Documentation inclus, et les utiliser, uniquement à des fins commerciales internes. Le Client est responsable de toutes les actions effectuées sur les comptes de ses Utilisateurs et du respect du présent Contrat par ces derniers. Le Client peut fournir des Retours au Fournisseur, que celui-ci peut utiliser librement, et le Fournisseur peut collecter et analyser des Données d'Utilisation agrégées afin de maintenir, améliorer et promouvoir ses produits et services, y compris pour développer ou améliorer des modèles d'intelligence artificielle ou d'apprentissage automatique, sans identifier le Client ni ses Utilisateurs.

2. **Restrictions et Suspension**. Sauf autorisation expresse du présent Contrat, le Client ne procédera pas (et n'autorisera personne à procéder) à une ingénierie inverse du Produit, ne le revendra ni ne le sous-licenciera, ne supprimera aucune mention de propriété, et ne l'utilisera pas pour développer un produit concurrent ou en violation de la réglementation applicable. Si le Client a un solde impayé non contesté depuis plus de 30 jours ou viole substantiellement le présent Contrat, le Fournisseur peut suspendre son accès, en essayant de le notifier au préalable lorsque cela est possible, et rétablira l'accès une fois le problème résolu.

3. **Paiement et Taxes**. {{PAYMENT_PROCESS}}. Le Client est responsable de tous les droits, taxes et prélèvements applicables aux Frais, à l'exception des impôts sur le revenu du Fournisseur. Si le Client conteste de bonne foi une facture, il doit en informer le Fournisseur avant l'échéance du paiement et régler les montants non contestés dans les délais ; les parties collaboreront de bonne foi pour résoudre le litige.

4. **Durée et Résiliation**. Le présent Contrat prend effet le {{EFFECTIVE_DATE}} et se poursuit pendant {{SUBSCRIPTION_PERIOD}}. Chaque partie peut résilier immédiatement si l'autre partie ne remédie pas à une violation substantielle dans les 30 jours suivant la notification, ou devient insolvable. À l'expiration ou à la résiliation : le Client perd tout droit d'utiliser le Produit ; le Fournisseur supprime le Contenu du Client dans les 60 jours suivant la demande ; chaque partie restitue ou détruit les Informations Confidentielles de l'autre ; et le Fournisseur émet une facture finale pour les Frais dus avant la résiliation.

5. **Déclarations et Garanties**. Chaque partie déclare qu'elle a le pouvoir de conclure le présent Contrat et qu'elle respectera la réglementation applicable dans son exécution. Le Fournisseur garantit en outre qu'il ne réduira pas substantiellement les fonctionnalités générales du Service Cloud pendant la Période d'Abonnement. Si le Fournisseur viole cette garantie, le seul recours du Client sera que le Fournisseur restaure les fonctionnalités dans les 45 jours suivant la notification ou, à défaut, que le Client résilie l'abonnement concerné et reçoive un remboursement proportionnel des Frais prépayés.

6. **Exclusion de Garanties**. Sauf pour les garanties de la Section 5 (Déclarations et Garanties), le Produit est fourni **« EN L'ÉTAT », et le Fournisseur et le Client excluent chacun toute autre garantie ou condition, expresse ou implicite, y compris les garanties implicites de qualité marchande, d'adéquation à un usage particulier et de non-contrefaçon, dans toute la mesure permise par la réglementation applicable**.

7. **Limitation de Responsabilité**. **Sauf en cas de violation de la Section 9 (Confidentialité) ou des obligations d'indemnisation d'une partie au titre de la Section 8 (Indemnisation), la responsabilité cumulée totale de chaque partie pour toutes les réclamations découlant du présent Contrat n'excédera pas {{GENERAL_CAP_AMOUNT}}, et en aucun cas une partie ne sera responsable envers l'autre de la perte de profits ni de dommages consécutifs, spéciaux, indirects, exemplaires, punitifs ou accessoires, même si elle a été informée de la possibilité de tels dommages.** Ces limitations s'appliquent à toute responsabilité, qu'elle soit délictuelle, contractuelle ou autre, sauf dans la mesure interdite par la réglementation applicable.

8. **Indemnisation**. Le Fournisseur défendra et indemnisera le Client contre les réclamations de tiers alléguant que le Produit viole leurs droits de propriété intellectuelle, et le Client défendra et indemnisera le Fournisseur contre les réclamations de tiers découlant d'une utilisation abusive du Produit ou du Contenu du Client, y compris dans chaque cas les honoraires raisonnables d'avocats. La partie indemnisée doit notifier rapidement la partie indemnisatrice de la réclamation, lui accorder le contrôle exclusif de la défense et du règlement, et coopérer raisonnablement aux frais de la partie indemnisatrice.

9. **Confidentialité**. Sauf si cela est nécessaire à l'exécution du présent Contrat, une partie recevant les Informations Confidentielles de l'autre ne les utilisera ni ne les divulguera, et les protégera avec au moins le même soin qu'elle applique à ses propres informations similaires. Ces obligations ne s'appliquent pas aux informations qui sont ou deviennent publiques, qui étaient déjà connues sans restriction, ou qui sont développées indépendamment sans référence aux Informations Confidentielles, et une partie peut divulguer des Informations Confidentielles dans la mesure exigée par la loi après en avoir raisonnablement informé l'autre partie lorsque la loi le permet.

10. **Réserve de Droits**. Sauf pour les droits limités accordés dans le présent Contrat, le Fournisseur conserve tout droit, titre et intérêt sur le Produit, et le Client conserve tout droit, titre et intérêt sur son Contenu.

11. **Droit Applicable et Tribunaux Compétents**. Le présent Contrat et toutes les questions qui s'y rapportent sont régis et interprétés conformément aux lois de {{GOVERNING_LAW}}, sans égard à ses règles de conflit de lois. Toute action judiciaire relative au présent Contrat doit être portée devant les tribunaux de {{JURISDICTION}}, auxquels chaque partie se soumet irrévocablement et exclusivement. Une violation de la Section 9 (Confidentialité) ou des droits de propriété intellectuelle d'une partie peut causer un préjudice irréparable, de sorte que la partie non fautive peut demander des mesures injonctives en plus de ses autres recours.

12. **Dispositions Générales**. Le présent Contrat constitue l'intégralité de l'accord entre les parties sur son objet et remplace toute discussion antérieure. Toute modification, renonciation ou avenant doit être écrit et signé par les deux parties, et si une disposition est jugée inapplicable, le reste du Contrat demeure en vigueur. Aucune partie ne peut céder le présent Contrat sans le consentement écrit préalable de l'autre, sauf dans le cadre d'une fusion, réorganisation ou vente de la quasi-totalité de ses actifs. Les parties sont des contractants indépendants, et aucune n'est responsable d'un retard causé par un Cas de Force Majeure, ce qui n'exonère toutefois pas le Client de son obligation de payer les Frais déjà dus. Le présent Contrat peut être signé en plusieurs exemplaires, y compris électroniquement, chacun étant considéré comme un original.

Adapté du Common Paper Cloud Service Agreement [Standard Terms Version 2.1](https://commonpaper.com/standards/cloud-service-agreement/2.1/), libre d'utilisation sous licence [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
`;

function pluralYears(n: number): string {
  return `${n} an${n === 1 ? "" : "s"}`;
}

function describeSubscriptionPeriod(years: number): string {
  return (
    `${pluralYears(years)} à compter de la Date d'Entrée en Vigueur, se renouvelant ` +
    `automatiquement pour des périodes supplémentaires de ${pluralYears(years)} sauf notification ` +
    `de non-renouvellement par l'une des parties au moins 30 jours avant la fin de la période en cours`
  );
}

export const fr: CsaTemplateModule = {
  STANDARD_TERMS_TEMPLATE,
  describeSubscriptionPeriod,
};
