import type { PilotTemplateModule } from "./types";

/**
 * Standard Terms body of a Pilot Agreement, adapted and condensed from
 * templates/Pilot-Agreement.md (Common Paper Pilot Agreement Standard
 * Terms v1.1). Cover Page Variables outside this app's reduced field set
 * (a separate Order Form, Notice Address as its own field...) are resolved
 * to fixed, reasonable Standard Terms language instead of being asked as
 * fields.
 *
 * Source: https://commonpaper.com/standards/pilot-agreement/1.1 (CC BY 4.0)
 */
const STANDARD_TERMS_TEMPLATE = `1. **Pilot Access**. During the Pilot Period and subject to the terms of this Agreement, Customer may access and use the Product, and any included Software, solely for {{EVALUATION_PURPOSE}}. Customer is responsible for all actions on its Users' accounts and for Users' compliance with this Agreement. Customer may give Provider Feedback, which Provider may use freely, and Provider may collect and analyze aggregated Usage Data to maintain, improve, and promote its products and services. Except as expressly permitted by this Agreement, Customer will not reverse engineer, resell, or sublicense the Product, remove proprietary notices, or use the Product to build a competing product. Except for this limited license, Provider retains all right, title, and interest in the Product, and Customer retains all right, title, and interest in its Customer Content.

2. **Term & Termination**. This Agreement commences on {{EFFECTIVE_DATE}} and, unless terminated earlier, continues through {{PILOT_PERIOD}}. Either party may terminate immediately if the other party fails to cure a material breach within 30 days of notice, becomes insolvent, or, for any or no reason, upon 30 days' notice to the other party. Upon expiration or termination: Customer will stop using the Product and, if applicable, uninstall any Software; Provider will delete Customer Content within 60 days of request; and each party will return or destroy the other's Confidential Information in its possession.

3. **Representations**. Each party represents to the other that it has the legal power and authority to enter into this Agreement and is duly organized, validly existing, and in good standing under the Applicable Laws of its jurisdiction of origin.

4. **Disclaimer of Warranties**. Provider makes no guarantee that the Product will be uninterrupted or error-free. **The Product is provided on an "AS IS" and "AS AVAILABLE" basis, and Provider disclaims all warranties and conditions, whether express or implied, including the implied warranties of merchantability, fitness for a particular purpose, and non-infringement, to the maximum extent permitted by Applicable Laws.**

5. **Limitation of Liability**. **Except for a breach of Section 6 (Confidentiality), each party's total cumulative liability for all claims arising out of or relating to this Agreement will not exceed {{GENERAL_CAP_AMOUNT}}, and under no circumstances will either party be liable to the other for lost profits or for consequential, special, indirect, exemplary, punitive, or incidental damages, even if informed of the possibility of such damages in advance.** These limitations apply to all liability, whether in tort, contract, or otherwise, except to the extent prohibited by Applicable Laws.

6. **Confidentiality**. Except as needed to perform this Agreement, a party receiving the other's Confidential Information will not use or disclose it, and will protect it using at least the same care it uses for its own similar information. These obligations do not apply to information that is or becomes public, was already known without restriction, or is independently developed without reference to the Confidential Information, and a party may disclose Confidential Information to the extent required by law after giving reasonable notice where legally permitted.

7. **Governing Law and Chosen Courts**. This Agreement and all matters relating to it are governed by, and construed in accordance with, the laws of {{GOVERNING_LAW}}, without regard to its conflict of laws provisions. Any legal suit, action, or proceeding relating to this Agreement must be brought in the courts of {{JURISDICTION}}, and each party irrevocably submits to their exclusive jurisdiction. A breach of Section 6 (Confidentiality) may cause irreparable harm for which the non-breaching party may seek injunctive relief in addition to its other remedies.

8. **General Terms**. This Agreement is the entire agreement between the parties about its subject matter and supersedes all prior discussions. Any modification, waiver, or amendment must be in writing and signed by both parties, and if any provision is held unenforceable the rest of the Agreement remains in effect. Neither party may assign this Agreement without the other's prior written consent, except in connection with a merger, reorganization, or sale of substantially all its assets. The parties are independent contractors, and neither party is liable for a delay caused by a Force Majeure Event. This Agreement may be signed in counterparts, including electronically, each of which is deemed an original.

Adapted from the Common Paper Pilot Agreement [Standard Terms Version 1.1](https://commonpaper.com/standards/pilot-agreement/1.1), free to use under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
`;

function pluralMonths(n: number): string {
  return `${n} month${n === 1 ? "" : "s"}`;
}

function describePilotPeriod(months: number): string {
  return `${pluralMonths(months)} from the Effective Date`;
}

export const en: PilotTemplateModule = {
  STANDARD_TERMS_TEMPLATE,
  describePilotPeriod,
};
