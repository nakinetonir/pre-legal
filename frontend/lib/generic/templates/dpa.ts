import type { GenericTemplateModule } from "./types";

/**
 * Standard Terms body for a Data Processing Agreement, adapted and
 * condensed from templates/DPA.md. This DPA supplements a base Agreement
 * and has no Effective Date, Governing Law, or Chosen Courts of its own;
 * all deal-specific Variables (Categories of Personal Data, Approved
 * Subprocessors, Governing Member State...) are left as bracketed
 * placeholders instead of being asked as fields.
 *
 * Source: https://github.com/CommonPaper/DPA (CC BY 4.0)
 */
const STANDARD_TERMS_TEMPLATE = `1. **Processor and Subprocessor Relationships**
    1. **Provider as Processor.** Where Customer is a Controller of the Customer Personal Data, Provider will be deemed a Processor Processing Personal Data on behalf of Customer.
    2. **Provider as Subprocessor.** Where Customer is a Processor of the Customer Personal Data, Provider will be deemed a Subprocessor of the Customer Personal Data.
2. **Processing**
    1. **Processing Details.** The Cover Page describes the subject matter, nature, purpose, and duration of this Processing, as well as the [Categories of Personal Data] collected and [Categories of Data Subjects].
    2. **Processing Instructions.** Customer instructs Provider to Process Customer Personal Data to provide and maintain the Service, as further specified through Customer's use of the Service, and as documented in the [Agreement] or in other written instructions acknowledged by Provider. Provider will abide by these instructions unless prohibited by Applicable Laws, and will immediately inform Customer if it is unable to follow them.
    3. **Processing by Provider.** Provider will only Process Customer Personal Data in accordance with this DPA, including the details on the Cover Page.
    4. **Customer Processing.** Where Customer is a Processor and Provider is a Subprocessor, Customer will comply with all Applicable Laws and Subprocessor requirements that apply to its own Processing.
    5. **Consent to Processing.** Customer has complied with and will continue to comply with all Applicable Data Protection Laws concerning its provision of Customer Personal Data to Provider.
    6. **Subprocessors.** Provider will not hand over Customer Personal Data to a Subprocessor unless Customer has approved it via the current list of [Approved Subprocessors], and will give at least 10 business days' notice of any change, which Customer may object to within 30 days. Provider will have a written agreement with each Subprocessor imposing data protection obligations at least as protective as this DPA, and remains fully liable for its Subprocessors' acts and omissions.
3. **Restricted Transfers**
    1. **Authorization.** Customer agrees that Provider may transfer Customer Personal Data outside the EEA, the United Kingdom, or other relevant territory as necessary to provide the Service, implementing appropriate safeguards where no adequacy decision applies.
    2. **Ex-EEA Transfers.** Where the GDPR protects a transfer from Customer within the EEA to Provider outside the EEA without an adequacy decision, the parties are deemed to have signed the EEA Standard Contractual Clauses ("EEA SCCs"), governed by the laws of the [Governing Member State], with disputes resolved in its courts.
    3. **Ex-UK Transfers.** Where the UK GDPR protects a transfer from Customer within the United Kingdom to Provider outside it without an adequacy decision, the parties are deemed to have signed the UK Addendum to the EEA SCCs.
    4. **Other International Transfers.** For transfers governed by Swiss law, references to the GDPR in the EEA SCCs are, to the extent legally required, read as referring to the Swiss Federal Data Protection Act instead.
4. **Security Incident Response**
    1. Upon becoming aware of any Security Incident, Provider will notify Customer without undue delay (no later than 72 hours), provide timely information as it becomes known, and promptly take reasonable steps to contain and investigate it. Notification is not an acknowledgment of fault or liability.
5. **Audit & Reports**
    1. **Audit Rights.** Provider will give Customer information reasonably necessary to demonstrate its compliance with this DPA and will allow for audits, subject to reasonable restrictions to protect its intellectual property, confidentiality, and other legal obligations. Provider will maintain compliance records for 3 years after this DPA ends.
    2. **Security Reports.** Provider is regularly audited against the standards defined in the [Security Policy] by independent third-party auditors, and will share a confidential summary report with Customer upon written request.
    3. **Security Due Diligence.** Provider will respond to reasonable, written information-security due-diligence requests directed to the [Provider Security Contact], made no more than once a year.
6. **Coordination & Cooperation**
    1. **Response to Inquiries.** If Provider receives any inquiry or request from anyone else about the Processing of Customer Personal Data, it will notify Customer and will not respond without Customer's prior consent unless prohibited by Applicable Law, and will reasonably assist Customer with data subject requests and related legal responses at Customer's expense.
    2. **DPIAs and DTIAs.** If required by Applicable Data Protection Laws, Provider will reasonably assist Customer with data protection or data transfer impact assessments and related consultations.
7. **Deletion of Customer Personal Data**
    1. **Deletion by Customer.** Provider will enable Customer to delete Customer Personal Data consistent with the functionality of the Services, and will comply with such a deletion instruction as soon as reasonably practicable except where further storage is required by Applicable Law.
    2. **Deletion at DPA Expiration.** After this DPA expires, Provider will return or delete Customer Personal Data at Customer's instruction unless further storage is required or authorized by Applicable Law, and will provide a certification of deletion under the EEA SCCs or UK Addendum only if Customer asks for one.
8. **Limitation of Liability**
    1. **Liability Caps and Damages Waiver.** **To the maximum extent permitted under Applicable Data Protection Laws, each party's total cumulative liability arising out of or related to this DPA is subject to the waivers, exclusions, and limitations of liability stated in the [Agreement].**
    2. **Related-Party Claims.** **Any claims made against Provider or its Affiliates arising out of this DPA may only be brought by the Customer entity that is a party to the [Agreement].**
    3. **Exceptions.** This DPA does not limit any liability to an individual for their data protection rights, nor any liability between the parties for violations of the EEA SCCs or UK Addendum.
9. **Conflicts Between Documents**
    1. This DPA forms part of and supplements the [Agreement]. If there is any inconsistency, the following controls in order: (1) the EEA SCCs or UK Addendum, (2) this DPA, and then (3) the [Agreement].
10. **Term of Agreement**
    1. This DPA starts when the parties agree to a Cover Page for it and sign or accept the [Agreement], and continues until the [Agreement] expires or is terminated - though each party remains subject to its data protection obligations until Customer stops transferring, and Provider stops Processing, Customer Personal Data.
11. **Definitions**
    1. **"Controller"** has the meaning given in the Applicable Data Protection Laws for the company that determines the purpose and extent of Processing Personal Data.
    2. **"Customer Personal Data"** means Personal Data that Customer uploads or provides to Provider as part of the Service and that is governed by this DPA.
    3. **"Processing"** or **"Process"** has the meaning given in the Applicable Data Protection Laws for any use of, or operation performed on, Personal Data.
    4. **"Processor"** has the meaning given in the Applicable Data Protection Laws for the company that Processes Personal Data on behalf of the Controller.
    5. **"Security Incident"** means a Personal Data Breach as defined in Article 4 of the GDPR.
    6. **"Subprocessor"** has the meaning given in the Applicable Data Protection Laws for a company that, with the Controller's approval, assists the Processor in Processing Personal Data on its behalf.

Adapted from the Common Paper Data Processing Agreement Standard Terms, free to use under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Source: [github.com/CommonPaper/DPA](https://github.com/CommonPaper/DPA).
`;

export const dpa: GenericTemplateModule = { STANDARD_TERMS_TEMPLATE };
