import type { GenericTemplateModule } from "./types";

/**
 * Standard Terms body for a Professional Services Agreement, adapted from
 * templates/PSA.md. Deal-specific Variables outside this app's shared
 * generic field set (Deliverables, Fees, Insurance Minimums, liability
 * caps...) are left as bracketed placeholders instead of being asked as
 * fields - only Effective Date, Governing Law, and Chosen Courts are
 * substituted.
 *
 * Source: https://github.com/CommonPaper/PSA (CC BY 4.0)
 */
const STANDARD_TERMS_TEMPLATE = `1. **Services**
    1. **Providing Services.** Customer or its Affiliates may enter SOWs with Provider. Provider will perform the Services as detailed in an applicable SOW. Each SOW together with the Key Terms and Standard Terms will constitute a separate agreement. Provider will comply with [Customer Policies], if any.
    2. **Cooperation.** Customer will reasonably cooperate with Provider to allow the performance of Services. Provider is not responsible for an inability to perform the Services caused by Customer's failure to cooperate as reasonably requested. Provider will provide its own equipment and tools to perform the Services.
    3. **Change Orders.** Provider or Customer may amend any SOW by entering a Change Order. A Change Order will not be binding until Provider and Customer agree on it in writing.
    4. **Acceptance.** If [Deliverables] are subject to this section per the SOW, Customer will be deemed to have approved a [Deliverable] if Customer does not reject it within the [Rejection Period]. If Customer rejects a [Deliverable], Provider will correct the issue and resubmit it within the [Resubmission Period].
    5. **Subcontractors.** Provider may use Subcontractors to perform the Services only with Customer's prior permission, except that Provider may use its Affiliates without permission. Provider remains responsible for its Subcontractors' acts, omissions, compliance, and payment.
    6. **Customer Obligations.** Customer will comply with [Customer Obligations], if any.
2. **Intellectual Property**
    1. **Deliverables.** Except for Pre-Existing Materials and Third-Party Materials, Provider assigns all right, title, and interest in the [Deliverables] (if any) to Customer at the [Time of Assignment].
    2. **Customer Materials.** Provider may copy, display, modify, and use Customer Materials only as needed to provide the Services. Customer is responsible for the accuracy and content of Customer Materials.
    3. **Pre-Existing Materials.** To the extent Provider incorporates Pre-Existing Materials into [Deliverables], Provider grants Customer a non-exclusive, non-transferrable, perpetual, irrevocable, worldwide license to use them only as necessary to use the [Deliverables] according to this Agreement.
    4. **Third-Party Materials.** Provider may incorporate Third-Party Materials into [Deliverables] only if allowed in the SOW and authorized by Customer in writing. Each party is responsible for obtaining all rights necessary for the Third-Party Materials it procures.
    5. **Feedback and Usage Data.** Customer may, but is not required to, give Provider Feedback, which Provider may use freely without restriction. Provider may collect and analyze aggregated Usage Data to maintain, improve, and enhance its products and services without identifying Customer.
    6. **Reservation of Rights.** Except for the limited rights described in this Section 2, neither party transfers any rights in any of their products, data, or any other intellectual property.
3. **Privacy & Security**
    1. **Personal Data.** If the parties have a [DPA], each party will comply with its obligations in the [DPA], and the terms of the [DPA] will control in the event of any conflict with this Agreement.
    2. **Security.** Provider will comply with the [Security Policy], if any.
4. **Payment & Taxes**
    1. **Fees and Invoices.** Unless a different currency is specified in the SOW, all [Fees] are in U.S. Dollars and are exclusive of taxes and non-refundable except as permitted for termination rights. Provider will send invoices for [Fees] as described in the SOW.
    2. **Payment.** Customer will pay Provider the [Fees] and taxes in each invoice within the [Payment Period].
    3. **Taxes.** Customer is responsible for all duties, taxes, and levies that apply to [Fees], other than Provider's income taxes.
    4. **Payment Dispute.** If Customer has a good-faith disagreement about an invoice, it must notify Provider during the [Payment Period] and pay all undisputed amounts on time; the parties will work together to resolve the dispute within 15 days.
5. **Term & Termination**
    1. **Term.** This Agreement will start on the {{EFFECTIVE_DATE}} and continue until 12 months have elapsed since the end of the latest [SOW Term] end date.
    2. **Termination.** Either party may terminate this Agreement or an SOW immediately for an uncured material breach (30 days notice), an incurable material breach, insolvency, or a Force Majeure Event preventing Services for 30 or more consecutive days; either party may also terminate this Agreement for any or no reason if there are no active SOWs.
    3. **Effect of Termination.** Upon any expiration or termination: Provider will no longer have to provide the Services; each Recipient will return or destroy Discloser's Confidential Information; and, except where Customer terminates for Provider's uncured breach, Provider will submit a final invoice for outstanding [Fees] and, except where Provider terminates for Customer's uncured breach, issue a refund for unearned prepaid [Fees].
    4. **Survival.** Sections on Deliverables, Pre-Existing Materials, Feedback and Usage Data, Reservation of Rights, Payment & Taxes (for amounts accrued), Effect of Termination, Survival, Representations & Warranties, Disclaimer of Warranties, Limitation of Liability, Indemnification, Insurance (for the time period specified), Confidentiality, General Terms, and Definitions survive expiration or termination.
6. **Representations & Warranties**
    1. **Mutual.** Each party represents and warrants that: (a) it has the legal power and authority to enter into this Agreement; (b) it is duly organized, validly existing, and in good standing under the Applicable Laws of its jurisdiction of origin; (c) it will comply with all Applicable Laws in performing this Agreement; and (d) it will comply with the [Additional Warranties].
    2. **From Customer.** Customer represents and warrants that Provider's use of Customer Materials and Customer-procured Third-Party Materials does not infringe anyone else's rights, and that it has all rights necessary to provide them.
    3. **From Provider.** Provider represents and warrants that it will perform the Services in a timely, competent, and professional manner; that the [Deliverables] (if any) do not infringe anyone else's rights and will conform to the SOW; and that it has all rights necessary to perform the Services and convey the [Deliverables].
    4. **Warranty Remedy.** If Provider breaches the warranty that Deliverables conform to the SOW, Customer must give notice within 45 days of discovering the issue. Provider will reperform the Services within 45 days; if it cannot resolve the issue, Customer may terminate the affected SOW and receive a prorated refund of prepaid [Fees] for the remainder of the [SOW Term]. This is Customer's exclusive remedy for that warranty.
7. **Disclaimer of Warranties**
    1. Except for the warranties in Section 6 (Representations & Warranties), Provider and Customer each **disclaim all other warranties, whether express or implied, including the implied warranties of merchantability, fitness for a particular purpose, title, and non-infringement**. These disclaimers apply to the maximum extent permitted by Applicable Laws.
8. **Limitation of Liability**
    1. **Liability Caps.** **If there are [Increased Claims], each party's total cumulative liability for the [Increased Claims] will not be more than the [Increased Cap Amount]. Each party's total cumulative liability for all other claims will not be more than the [General Cap Amount].**
    2. **Damages Waiver.** **Under no circumstances will either party be liable to the other for lost profits or revenues, or for consequential, special, indirect, exemplary, punitive, or incidental damages relating to this Agreement, even if informed of the possibility of such damages in advance.**
    3. **Exceptions.** The liability caps do not apply to any [Unlimited Claims]. The damages waiver does not apply to any [Increased Claims] or a breach of Section 11 (Confidentiality).
9. **Indemnification**
    1. **Protection by Provider.** Provider will indemnify, defend, and hold harmless Customer from all [Provider Covered Claims] made by third parties, including reasonable attorneys' fees.
    2. **Protection by Customer.** Customer will indemnify, defend, and hold harmless Provider from all [Customer Covered Claims] made by third parties, including reasonable attorneys' fees.
    3. **Procedure.** The indemnifying party's obligations are contingent on the protected party promptly notifying it of the claim, providing reasonable assistance, and giving it sole control of the defense and settlement.
    4. **Exclusive Remedy.** This Section 9 (Indemnification) describes each protected party's exclusive remedy and each indemnifying party's entire liability for a Covered Claim.
10. **Insurance**
    1. During the term of the Agreement and for six months after, each party will carry commercial insurance policies meeting the relevant [Insurance Minimums] required in the SOW, if any, and will provide a certificate of insurance upon request.
11. **Confidentiality**
    1. **Non-Use and Non-Disclosure.** Unless otherwise authorized, Recipient will only use Discloser's Confidential Information to fulfill its obligations under this Agreement and will not disclose it to anyone else, protecting it with at least a reasonable standard of care.
    2. **Exclusions.** Confidential Information does not include information that was already known, is or becomes public, was rightfully received from a third party, or was independently developed without reference to it.
    3. **Required Disclosures.** Recipient may disclose Confidential Information to the extent required by Applicable Laws, giving Discloser reasonable advance notice where legally permitted.
    4. **Permitted Disclosures.** Recipient may disclose Confidential Information to representatives with a need to know, bound by confidentiality obligations at least as protective as this Section 11.
12. **General Terms**
    1. **Entire Agreement.** This Agreement is the only agreement between the parties about its subject and supersedes all prior discussions.
    2. **Modifications, Severability, and Waiver.** Any waiver, modification, or change must be in writing and signed by both parties; invalid provisions are severed without affecting the rest of the Agreement.
    3. **Governing Law and Chosen Courts.** The {{GOVERNING_LAW}} governs all disputes about this Agreement, and any suit must be brought in the {{JURISDICTION}}, to whose exclusive jurisdiction each party irrevocably submits.
    4. **Injunctive Relief.** A breach of Section 11 (Confidentiality) or of a party's intellectual property rights may cause irreparable harm for which the non-breaching party may seek injunctive relief in addition to its other remedies.
    5. **Assignment.** Neither party may assign this Agreement without the other's prior written consent, except in connection with a merger, reorganization, or sale of substantially all assets.
    6. **Notices.** Notices must be in writing and sent to the [Notice Address].
    7. **Independent Contractors.** The parties are independent contractors, not agents, partners, or joint venturers.
    8. **Force Majeure.** Neither party is liable for a delay caused by a Force Majeure Event, though this does not excuse Customer's obligation to pay [Fees].
    9. **Signature.** This Agreement may be signed in counterparts, including electronically, each deemed an original.

Adapted from the Common Paper Professional Services Agreement Standard Terms, free to use under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Source: [github.com/CommonPaper/PSA](https://github.com/CommonPaper/PSA).
`;

export const psa: GenericTemplateModule = { STANDARD_TERMS_TEMPLATE };
