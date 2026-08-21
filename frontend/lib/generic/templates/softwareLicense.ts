import type { GenericTemplateModule } from "./types";

/**
 * Standard Terms body for a Software License Agreement, adapted and
 * condensed from templates/Software-License-Agreement.md. Deal-specific
 * Variables outside this app's shared generic field set (Subscription
 * Period, License Limits, liability caps...) are left as bracketed
 * placeholders instead of being asked as fields - only Effective Date,
 * Governing Law, and Chosen Courts are substituted.
 *
 * Source: https://commonpaper.com/standards/software-license-agreement/1.1
 * (CC BY 4.0)
 */
const STANDARD_TERMS_TEMPLATE = `1. **Software**
    1. **License.** During the [Subscription Period] and subject to the terms of this Agreement, Provider grants Customer a limited, non-exclusive, non-sublicensable, non-transferable license to install and use the Software on systems owned or controlled by Customer for the [Permitted Uses].
    2. **User Accounts.** If Customer's Users create an account in connection with use of the Software, Customer is responsible for all actions on Users' accounts and for their compliance with this Agreement.
    3. **Feedback and Usage Data.** Customer may, but is not required to, give Provider Feedback, which Provider may use freely without restriction. Provider may collect and analyze aggregated Usage Data to maintain, improve, and promote its products and services without identifying Customer or Users.
    4. **Machine Learning.** Usage Data may be used, once aggregated and reasonably de-identified, to develop, train, or enhance artificial intelligence or machine learning models that are part of Provider's products and services.
    5. **Open Source Software.** If the Software contains Open Source Software, Provider will use reasonable efforts to deliver any required notices or source code, and the terms of the applicable open source license will control over this Agreement for that component.
    6. **Updates.** During the [Subscription Period], Provider will provide Updates to Customer at no additional charge, and Customer will install them as soon as practicable after receipt.
    7. **Reservation of Rights.** Provider retains all right, title, and interest in and to the Product, whether developed before or after the {{EFFECTIVE_DATE}}.
2. **Restrictions & Obligations**
    1. **Restrictions on Customer.** Except as expressly permitted by this Agreement, Customer will not (and will not allow anyone else to) reverse engineer the Product, resell or sublicense it, remove proprietary notices, circumvent its protection mechanisms, publish performance evaluations of it without Provider's approval, use it to build a competing product, or use it in violation of Applicable Laws or the [License Limits].
    2. **Suspension.** If Customer has an outstanding undisputed balance for more than 30 days or materially breaches this Agreement, Provider may suspend Customer's access, trying to give notice beforehand when practical, and will reinstate access once the issue is resolved.
3. **Payment & Taxes**
    1. **Fees.** Unless the Order Form specifies otherwise, all Fees are in U.S. Dollars, exclusive of taxes, and non-refundable except for prorated refunds allowed under specific termination rights.
    2. **Invoicing and Payment.** Provider will invoice or automatically charge Customer for Fees according to the [Payment Process], and Customer is responsible for all applicable taxes other than Provider's income taxes.
    3. **Payment Dispute.** If Customer has a good-faith dispute about an invoice, it must notify Provider before payment is due and pay all undisputed amounts on time; the parties will work together in good faith to resolve the dispute.
4. **Term & Termination**
    1. **Order Form and Agreement.** For each Order Form, the Agreement starts on the [Order Date], continues through the [Subscription Period], and automatically renews for additional [Subscription Periods] unless either party gives notice of non-renewal before the [Non-Renewal Notice Date]. These Framework Terms start on the {{EFFECTIVE_DATE}} and continue for the longer of one year or until all Order Forms have ended.
    2. **Termination.** Either party may terminate the Framework Terms or an Order Form immediately for an uncured material breach (30 days notice), an incurable material breach, or insolvency.
    3. **Effect of Termination.** Upon expiration or termination: Customer loses all rights to use the Product and must follow the [Deletion Procedure] to remove the Software; each party will return or destroy the other's Confidential Information; and Provider will issue a final invoice for Fees accrued before termination.
5. **Representations & Warranties**
    1. **Mutual.** Each party represents that it has the authority to enter into this Agreement, is duly organized and in good standing, will comply with Applicable Laws, and will comply with the [Additional Warranties].
    2. **Provider Warranty.** Provider warrants that, for the [Warranty Period], the Software will substantially conform to the specifications in the Documentation when used according to the Agreement.
    3. **Warranty Exclusions.** This warranty does not cover issues from unauthorized modification, misuse, Customer's failure to install Updates, or Customer's material breach.
    4. **Provider Warranty Remedy.** If Provider breaches this warranty, it will repair, replace, or functionally substitute the Software - Customer's exclusive remedy for this warranty.
6. **Disclaimer of Warranties**
    1. Except for the warranties in Section 5 (Representations & Warranties), Provider and Customer each **disclaim all other warranties and conditions, whether express or implied, including the implied warranties of merchantability, fitness for a particular purpose, title, and non-infringement**, to the maximum extent permitted by Applicable Laws.
7. **Limitation of Liability**
    1. **Liability Caps.** **Except as provided in Section 7.4 (Exceptions), each party's total cumulative liability for all claims arising out of or relating to this Agreement will not be more than the [General Cap Amount]. If there are [Increased Claims], each party's total cumulative liability for those claims will not be more than the [Increased Cap Amount].**
    2. **Damages Waiver.** **Except as provided in Section 7.4, under no circumstances will either party be liable to the other for lost profits or revenues, or for consequential, special, indirect, exemplary, punitive, or incidental damages, even if informed of the possibility of such damages in advance.**
    3. **Applicability.** These limitations and waivers apply to all liability, whether in tort, contract, or otherwise.
    4. **Exceptions.** The liability cap does not apply to [Increased Claims] or [Unlimited Claims]; the damages waiver does not apply to [Increased Claims], a breach of Section 9 (Confidentiality), or Customer's breach of the license or restrictions sections.
8. **Indemnification**
    1. **Protection by Provider.** Provider will indemnify, defend, and hold harmless Customer from all [Provider Covered Claims] made by third parties, including reasonable attorneys' fees.
    2. **Protection by Customer.** Customer will indemnify, defend, and hold harmless Provider from all [Customer Covered Claims] made by third parties, including reasonable attorneys' fees.
    3. **Procedure.** The indemnifying party's obligations are contingent on the protected party promptly notifying it of the claim, providing reasonable assistance, and giving it sole control of the defense and settlement.
    4. **Changes to Product.** If needed to resolve a [Provider Covered Claim], Provider may secure Customer's right to continue using the Product, replace or modify the affected component, or terminate the affected Order Form with a pro-rated refund.
9. **Confidentiality**
    1. **Non-Use and Non-Disclosure.** Except as needed to perform this Agreement, a party receiving the other's Confidential Information will not use or disclose it, protecting it with at least a reasonable standard of care.
    2. **Exclusions.** Confidential Information does not include information that was already known, is or becomes public, was rightfully received from a third party, or was independently developed without reference to it.
    3. **Required and Permitted Disclosures.** A party may disclose Confidential Information as required by law after giving reasonable notice where legally permitted, or to representatives with a need to know who are bound by confidentiality obligations at least as protective as this Section 9.
10. **General Terms**
    1. **Entire Agreement.** This Agreement is the only agreement between the parties about its subject and supersedes all prior discussions.
    2. **Modifications, Severability, and Waiver.** Any waiver, modification, or change must be in writing and signed by both parties; invalid provisions are severed without affecting the rest of the Agreement.
    3. **Governing Law and Chosen Courts.** The {{GOVERNING_LAW}} governs all disputes about this Agreement, and any suit must be brought in the {{JURISDICTION}}, to whose exclusive jurisdiction each party irrevocably submits.
    4. **Injunctive Relief.** A breach of Section 9 (Confidentiality) or of a party's intellectual property rights may cause irreparable harm for which the non-breaching party may seek injunctive relief in addition to its other remedies.
    5. **Assignment.** Neither party may assign this Agreement without the other's prior written consent, except in connection with a merger, reorganization, or sale of substantially all assets.
    6. **Beta Products.** A Beta Product is provided "AS IS" and the Provider Warranty in Section 5.2 does not apply to it.
    7. **Notices.** Notices must be in writing and sent to the [Notice Address].
    8. **Independent Contractors.** The parties are independent contractors, not agents, partners, or joint venturers.
    9. **Export Controls and Anti-Bribery.** Each party will comply with applicable export control, sanctions, and anti-bribery laws.
    10. **Signature.** This Agreement may be signed in counterparts, including electronically, each deemed an original.

Adapted from the Common Paper Software License Agreement [Standard Terms Version 1.1](https://commonpaper.com/standards/software-license-agreement/1.1), free to use under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
`;

export const softwareLicense: GenericTemplateModule = { STANDARD_TERMS_TEMPLATE };
