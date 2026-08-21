import type { CsaTemplateModule } from "./types";

/**
 * Standard Terms body of a Cloud Service Agreement, adapted and condensed
 * from templates/CSA.md (Common Paper Cloud Service Agreement Standard
 * Terms v2.1). Cover Page Variables outside this app's reduced field set
 * (Increased Claims, Additional Warranties, a linked DPA, Use Limitations,
 * separate Order Date/Non-Renewal Notice Date...) are resolved to fixed,
 * reasonable Standard Terms language instead of being asked as fields.
 *
 * Source: https://commonpaper.com/standards/cloud-service-agreement/2.1/
 * (CC BY 4.0)
 */
const STANDARD_TERMS_TEMPLATE = `1. **Service**. During the Subscription Period and subject to the terms of this Agreement, Customer may access and use the Cloud Service and any included Software and Documentation solely for its internal business purposes. Customer is responsible for all actions on its Users' accounts and for Users' compliance with this Agreement. Customer may give Provider Feedback, which Provider may use freely, and Provider may collect and analyze aggregated Usage Data to maintain, improve, and promote its products and services, including to develop or enhance artificial intelligence or machine learning models, without identifying Customer or its Users.

2. **Restrictions & Suspension**. Except as expressly permitted by this Agreement, Customer will not (and will not allow anyone else to) reverse engineer the Product, resell or sublicense access to it, remove proprietary notices, or use it to build a competing product or in violation of Applicable Laws. If Customer has an outstanding undisputed balance for more than 30 days or materially breaches this Agreement, Provider may suspend Customer's access, trying to give notice beforehand when practical, and will reinstate access once the issue is resolved.

3. **Payment & Taxes**. {{PAYMENT_PROCESS}}. Customer is responsible for all duties, taxes, and levies that apply to the Fees, other than Provider's income taxes. If Customer has a good-faith dispute about an invoice, it must notify Provider before payment is due and pay all undisputed amounts on time; the parties will work together in good faith to resolve the dispute.

4. **Term & Termination**. This Agreement commences on {{EFFECTIVE_DATE}} and continues for {{SUBSCRIPTION_PERIOD}}. Either party may terminate immediately if the other party fails to cure a material breach within 30 days of notice, or becomes insolvent. Upon expiration or termination: Customer loses all rights to use the Product; Provider will delete Customer Content within 60 days of request; each party will return or destroy the other's Confidential Information; and Provider will issue a final invoice for Fees accrued before termination.

5. **Representations & Warranties**. Each party represents that it has the authority to enter into this Agreement and will comply with Applicable Laws in performing it. Provider additionally warrants that it will not materially reduce the general functionality of the Cloud Service during the Subscription Period. If Provider breaches this warranty, Customer's exclusive remedy is for Provider to restore functionality within 45 days of notice or, failing that, for Customer to terminate the affected subscription and receive a prorated refund of prepaid Fees.

6. **Disclaimer of Warranties**. Except for the warranties in Section 5 (Representations & Warranties), the Product is provided **"AS IS", and Provider and Customer each disclaim all other warranties and conditions, whether express or implied, including the implied warranties of merchantability, fitness for a particular purpose, and non-infringement, to the maximum extent permitted by Applicable Laws**.

7. **Limitation of Liability**. **Except for a breach of Section 9 (Confidentiality) or a party's indemnification obligations under Section 8 (Indemnification), each party's total cumulative liability for all claims arising out of or relating to this Agreement will not exceed {{GENERAL_CAP_AMOUNT}}, and under no circumstances will either party be liable to the other for lost profits or for consequential, special, indirect, exemplary, punitive, or incidental damages, even if informed of the possibility of such damages in advance.** These limitations apply to all liability, whether in tort, contract, or otherwise, except to the extent prohibited by Applicable Laws.

8. **Indemnification**. Provider will defend and indemnify Customer against third-party claims that the Product infringes their intellectual property rights, and Customer will defend and indemnify Provider against third-party claims arising from Customer's misuse of the Product or Customer Content, in each case including reasonable attorneys' fees. The indemnified party must promptly notify the indemnifying party of the claim, give it sole control of the defense and settlement, and reasonably cooperate at the indemnifying party's expense.

9. **Confidentiality**. Except as needed to perform this Agreement, a party receiving the other's Confidential Information will not use or disclose it, and will protect it using at least the same care it uses for its own similar information. These obligations do not apply to information that is or becomes public, was already known without restriction, or is independently developed without reference to the Confidential Information, and a party may disclose Confidential Information to the extent required by law after giving reasonable notice where legally permitted.

10. **Reservation of Rights**. Except for the limited rights granted in this Agreement, Provider retains all right, title, and interest in and to the Product, and Customer retains all right, title, and interest in and to its Customer Content.

11. **Governing Law and Chosen Courts**. This Agreement and all matters relating to it are governed by, and construed in accordance with, the laws of {{GOVERNING_LAW}}, without regard to its conflict of laws provisions. Any legal suit, action, or proceeding relating to this Agreement must be brought in the courts of {{JURISDICTION}}, and each party irrevocably submits to their exclusive jurisdiction. A breach of Section 9 (Confidentiality) or of a party's intellectual property rights may cause irreparable harm for which the non-breaching party may seek injunctive relief in addition to its other remedies.

12. **General Terms**. This Agreement is the entire agreement between the parties about its subject matter and supersedes all prior discussions. Any modification, waiver, or amendment must be in writing and signed by both parties, and if any provision is held unenforceable the rest of the Agreement remains in effect. Neither party may assign this Agreement without the other's prior written consent, except in connection with a merger, reorganization, or sale of substantially all its assets. The parties are independent contractors, and neither party is liable for a delay caused by a Force Majeure Event, though this does not excuse Customer's obligation to pay Fees already accrued. This Agreement may be signed in counterparts, including electronically, each of which is deemed an original.

Adapted from the Common Paper Cloud Service Agreement [Standard Terms Version 2.1](https://commonpaper.com/standards/cloud-service-agreement/2.1/), free to use under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
`;

function pluralYears(n: number): string {
  return `${n} year${n === 1 ? "" : "s"}`;
}

function describeSubscriptionPeriod(years: number): string {
  return (
    `${pluralYears(years)} from the Effective Date, and will automatically renew for ` +
    `additional ${pluralYears(years)} periods unless either party gives notice of ` +
    `non-renewal at least 30 days before the end of the then-current period`
  );
}

export const en: CsaTemplateModule = {
  STANDARD_TERMS_TEMPLATE,
  describeSubscriptionPeriod,
};
