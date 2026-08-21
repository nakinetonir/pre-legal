import type { GenericTemplateModule } from "./types";

/**
 * Standard Terms body for a Business Associate Agreement, adapted and
 * condensed from templates/BAA.md. The source defines its own "BAA
 * Effective Date" Variable - treated as this app's {{EFFECTIVE_DATE}}
 * concept since it plays the same role. There is no Governing Law or
 * Chosen Courts Variable in the source (a BAA follows the base
 * Agreement's), so those are left as bracketed placeholders like the
 * other deal-specific Variables (Limitations, Breach Notification
 * Period...).
 *
 * Source: https://commonpaper.com/standards/business-associate-agreement/1.0
 * (CC BY 4.0)
 */
const STANDARD_TERMS_TEMPLATE = `1. **Business Associate Obligations**
    1. **Obligations and Restrictions.** Provider may not use or disclose PHI other than as described in this BAA, as permitted under the Privacy Rule, or as otherwise required by applicable law.
    2. **Permitted Uses and Disclosures.** Except as otherwise permitted or required in this BAA, Provider may only use or disclose PHI as reasonably necessary to provide the Services or as otherwise required by applicable law.
    3. **Privacy and Information Security Program.** Provider will maintain a privacy and information security program, including training its workforce, implementing policies meeting current PHI protection standards, and appointing Privacy and Security Officials as required under HIPAA.
    4. **Safeguards.** Provider will implement appropriate administrative, physical, and technical safeguards to protect PHI, and will comply with its obligations under the Security Rule.
    5. **Assessments.** Provider will conduct regular assessments of its compliance with the Privacy Rule and Security Rule, sharing a summary with Company upon reasonable request.
    6. **Mitigation of Risks.** Provider will mitigate, to the extent practicable, any harmful effect known to it of a use or disclosure of PHI, and promptly communicate any actions taken.
    7. **Subcontractors.** Except as restricted by applicable [Limitations], Provider may disclose PHI to a Subcontractor only under a written agreement requiring protections substantially similar to this BAA, and will conduct appropriate due diligence on all Subcontractors.
    8. **Books and Records to HHS.** Upon request, Provider will make its PHI-related books and records available to the Secretary of HHS to determine the parties' HIPAA compliance.
    9. **Audit of Books and Records.** Upon reasonable request, Provider will make its BAA-compliance records available to Company, except information that would interfere with Provider's confidentiality, proprietary rights, or legal obligations.
    10. **Individual Requests.** Provider will reasonably support Company in completing individuals' HIPAA rights requests (such as access, amendment, or accounting of disclosures) within ten business days, and will not respond directly to individuals except as directed by Company or required by law.
    11. **Compliance with Covered Entity's Obligations.** To the extent Provider carries out Company's obligations under the Privacy Rule, it will comply with the Privacy Rule requirements that apply to Company in performing them.
2. **Company Obligations**
    1. **Notice of Privacy Practices.** Upon request, Company will provide Provider with its current notice of privacy practices and notify Provider of any limitations affecting Provider's use or disclosure of PHI.
    2. **Notice of Changes.** Company will notify Provider in a timely manner of any changes to how it uses or discloses PHI that affect Provider's use or disclosure of PHI under the BAA.
    3. **Notice of Restrictions.** Company will notify Provider in a timely manner of any restrictions agreed with an individual that affect Provider's use or disclosure of PHI under the BAA.
    4. **Compliance with Laws.** Company will only use and disclose PHI to Provider in accordance with HIPAA and applicable law.
3. **Data Rights & Restrictions**
    1. Except as restricted by applicable [Limitations], Provider is permitted to use and disclose PHI outside of the United States to provide the Services, de-identify PHI, and aggregate PHI for its own purposes.
4. **Breach Notification**
    1. **Breach Reporting.** Provider will report to Company within the [Breach Notification Period] each impermissible use or disclosure of PHI it becomes aware of, including breaches of unsecured PHI and any Security Incident involving PHI, and each party will comply with its own notification obligations under HIPAA.
    2. **Unsuccessful Attempts.** Periodic unsuccessful attempts at unauthorized access, use, or disclosure of PHI, or general interference with Provider's operations, are deemed sufficient notice under this section.
    3. **Security Incident Reimbursement.** Provider will reimburse Company for costs reasonably associated with a Security Incident caused by Provider or one of its Subcontractors.
    4. **Confidentiality.** Provider will not disclose information related to a Security Incident except as required by applicable law.
5. **Term & Termination**
    1. **Term.** This BAA starts on the {{EFFECTIVE_DATE}} and continues until the later of all obligations being met or the [Agreement] ending or expiring.
    2. **Termination.** Either party may terminate this BAA if the other fails to cure a material breach within 30 days after notice; a material breach of the BAA is deemed a material breach of the [Agreement].
    3. **Effect of Termination.** Upon expiration or termination, or earlier if directed by Company, Provider will return or destroy, at Company's discretion and instruction, all PHI it maintains in any form. Provider may not retain copies of PHI unless directed to by Company, except where return or destruction is infeasible, in which case it must continue to comply with this BAA for as long as it retains the PHI.
6. **Definitions**
    1. **"Breach"**, **"Business Associate"**, **"Covered Entity"**, **"Designated Record Set"**, **"Privacy and Security Officials"**, **"Protected Health Information"** or **"PHI"**, and **"Security Incident"** each have the meaning given under HIPAA.
    2. **"HHS"** means the U.S. Department of Health and Human Services.
    3. **"HIPAA"** means the Health Insurance Portability and Accountability Act of 1996 and its rules and regulations, as amended.
    4. **"Privacy Rule"** means the federal privacy regulations issued under HIPAA, codified at 45 CFR Parts 160 and 164 (Subparts A & E).
    5. **"Security Rule"** means the federal security regulations issued under HIPAA, codified at 45 CFR Parts 160 and 164 (Subparts A & C).
    6. **"Services"** means the products and services provided by Provider under the [Agreement].
    7. **"Subcontractor"** means a third party to whom Provider provides PHI under this BAA.

Adapted from the Common Paper Business Associate Agreement [Standard Terms Version 1.0](https://commonpaper.com/standards/business-associate-agreement/1.0), free to use under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
`;

export const baa: GenericTemplateModule = { STANDARD_TERMS_TEMPLATE };
