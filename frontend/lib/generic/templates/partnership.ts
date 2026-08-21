import type { GenericTemplateModule } from "./types";

/**
 * Standard Terms body for a Partnership Agreement, adapted and condensed
 * from templates/Partnership-Agreement.md. Deal-specific Variables outside
 * this app's shared generic field set (Obligations, Fees, Brand
 * Guidelines, liability caps...) are left as bracketed placeholders
 * instead of being asked as fields - only Effective Date, Governing Law,
 * and Chosen Courts are substituted.
 *
 * Source: https://commonpaper.com/standards/partnership-agreement/1.0
 * (CC BY 4.0)
 */
const STANDARD_TERMS_TEMPLATE = `1. **Cooperation**
    1. **Obligations.** Each party will perform its [Obligations] as detailed in the Cover Page.
    2. **Feedback.** Each party may, but is not required to, give Feedback to the other party, which the receiving party may use freely without restriction.
2. **Payment & Taxes**
    1. If the [Obligations] include payment of Fees from one party to the other: Fees are in U.S. Dollars unless the Cover Page specifies otherwise, exclusive of taxes, and non-refundable except for prorated refunds; the receiving party will bill according to the [Payment Process] and be paid according to the [Payment Schedule]; and the paying party is responsible for all applicable taxes other than the other party's income taxes.
3. **Trademark License**
    1. **Trademark License.** Licensor grants Licensee a non-exclusive, non-transferrable, non-sublicensable, revocable, royalty-free license in the [Territory] to use Licensor's Brand Elements solely as necessary to perform its [Obligations], in accordance with any [Brand Guidelines].
    2. **Reservation of Rights.** Licensor is the sole owner of all right, title, and interest in the Brand Elements; all goodwill from Licensee's use inures to Licensor's benefit.
    3. **Restrictions on Licensee.** Licensee will not alter the Brand Elements, use them in a way that implies unauthorized endorsement, or use them in any context that could harm Licensor's reputation, without Licensor's prior written permission, and will cease all use upon written notice.
    4. **Samples and Approvals.** Licensor may inspect and approve all uses of the Brand Elements at any time.
4. **Privacy**
    1. If the parties have a [DPA], each party will comply with its obligations in the [DPA], which controls in the event of any conflict with this Agreement.
5. **Escalation Procedure**
    1. Each party will give the other written notice of a dispute before seeking legal relief, and knowledgeable representatives from each party will meet in good faith to try to resolve it within 30 days.
6. **Term & Termination**
    1. **Term.** This Agreement starts on the {{EFFECTIVE_DATE}} and continues until the [End Date], unless earlier terminated.
    2. **Termination.** Either party may terminate immediately for an uncured material breach (30 days notice, or 5 days for a breach of the trademark restrictions), an incurable material breach, or insolvency.
    3. **Force Majeure.** Either party may terminate immediately on notice if a Force Majeure Event prevents either party from performing its [Obligations] for 30 or more consecutive days, though this does not excuse a party's obligation to pay Fees.
    4. **Effect of Termination.** Upon any expiration or termination: Licensee's trademark license immediately terminates and it must cease all use of the Brand Elements; each Recipient will return or destroy Discloser's Confidential Information; and the receiving party will submit a final bill for outstanding Fees or issue a refund for unearned prepaid Fees, as applicable.
7. **Representations & Warranties**
    1. Each party represents that it has the authority to enter into this Agreement, is duly organized and in good standing, will comply with Applicable Laws (including for any Personal Data it handles), warrants that its Brand Elements do not infringe third-party rights, and will comply with its [Additional Warranties].
8. **Disclaimer of Warranties**
    1. Except for the warranties in Section 7 (Representations & Warranties), Company and Partner each disclaim all other warranties, whether express or implied, including the implied warranties of merchantability, fitness for a particular purpose, and title, to the maximum extent permitted by Applicable Laws.
9. **Limitation of Liability**
    1. **Liability Caps.** **Except as provided in Section 9.3, each party's total cumulative liability for all claims will not be more than the [General Cap Amount]. If there are [Increased Claims], liability for those claims will not be more than the [Increased Cap Amount].**
    2. **Damages Waiver.** Except as provided in Section 9.3, under no circumstances will either party be liable to the other for lost profits or revenues, or for consequential, special, indirect, exemplary, punitive, or incidental damages relating to this Agreement.
    3. **Exceptions.** The liability caps do not apply to [Increased Claims] or [Unlimited Claims]; the damages waiver does not apply to [Increased Claims] or a breach of Section 11 (Confidentiality).
10. **Indemnification**
    1. **Protection by Company.** Company will indemnify, defend, and hold harmless Partner from all [Company Covered Claims] made by third parties, including reasonable attorneys' fees.
    2. **Protection by Partner.** Partner will indemnify, defend, and hold harmless Company from all [Partner Covered Claims] made by third parties, including reasonable attorneys' fees.
    3. **Procedure.** The indemnifying party's obligations are contingent on the protected party promptly notifying it, providing reasonable assistance, and giving it sole control of the defense and settlement.
11. **Confidentiality**
    1. **Non-Use and Non-Disclosure.** Unless otherwise authorized, Recipient will only use Discloser's Confidential Information to fulfill its obligations under this Agreement and will not disclose it to anyone else, protecting it with at least a reasonable standard of care.
    2. **Exclusions.** Confidential Information does not include information that was already known, is or becomes public, was rightfully received from a third party, or was independently developed without reference to it.
    3. **Required and Permitted Disclosures.** Recipient may disclose Confidential Information as required by Applicable Laws after giving reasonable notice where legally permitted, or to representatives with a need to know who are bound by confidentiality obligations at least as protective as this Section 11.
12. **General Terms**
    1. **Entire Agreement.** This Agreement is the only agreement between the parties about its subject and supersedes all prior discussions.
    2. **Modifications, Severability, and Waiver.** Any waiver, modification, or change must be in writing and signed by both parties; invalid provisions are severed without affecting the rest of the Agreement.
    3. **Governing Law and Chosen Courts.** The {{GOVERNING_LAW}} governs all disputes about this Agreement, and any suit must be brought in the {{JURISDICTION}}, to whose exclusive jurisdiction each party irrevocably submits.
    4. **Injunctive Relief.** A breach of Section 11 (Confidentiality) or of a party's intellectual property rights may cause irreparable harm for which the non-breaching party may seek injunctive relief in addition to its other remedies.
    5. **Assignment.** Neither party may assign any rights or obligations under this Agreement without the other party's prior written consent.
    6. **Notices.** Notices must be in writing and sent to the [Notice Address].
    7. **Independent Contractors.** The parties are independent contractors, not agents, partners, or joint venturers.
    8. **Force Majeure.** Neither party is liable for a delay caused by a Force Majeure Event, though this does not excuse a party's obligation to pay Fees.
    9. **Anti-Bribery.** Neither party will take any action that would violate anti-bribery laws such as the U.S. Foreign Corrupt Practices Act or the UK Bribery Act 2010.
    10. **Signature.** This Agreement may be signed in counterparts, including electronically, each deemed an original.

Adapted from the Common Paper Partnership Agreement [Standard Terms Version 1.0](https://commonpaper.com/standards/partnership-agreement/1.0), free to use under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
`;

export const partnership: GenericTemplateModule = { STANDARD_TERMS_TEMPLATE };
