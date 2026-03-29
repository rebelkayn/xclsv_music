export const metadata = {
  title: "Privacy Policy — XCLSV",
};

export default function PrivacyPage() {
  return (
      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="font-display text-4xl text-text-primary mb-2">Privacy Policy</h1>
        <p className="text-text-secondary text-sm mb-4">Effective Date: March 29, 2026</p>
        <p className="text-text-secondary text-xs mb-12">This Privacy Policy describes how XCLSV Inc. (&ldquo;XCLSV,&rdquo; &ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, discloses, retains, and protects personal information in connection with the XCLSV platform, website, applications, and related services (collectively, the &ldquo;Service&rdquo;). By accessing or using the Service, you acknowledge that you have read and understood this Privacy Policy and consent to the collection and use of your information as described herein.</p>

        <div className="space-y-10 text-text-secondary text-sm leading-relaxed">

          <section>
            <h2 className="font-display text-lg text-text-primary mb-4">1. Scope and Applicability</h2>
            <p>This Privacy Policy applies to all Users of the Service, including Buyers (Collectors), Artists, and visitors. It covers personal information collected through the XCLSV website, web application, mobile applications, APIs, email communications, and any other interactions with the Service. This Policy does not apply to third-party websites, applications, or services that may be linked to or integrated with the Service, each of which is governed by its own privacy policy.</p>
            <p className="mt-3">For the purposes of applicable data protection laws, XCLSV Inc. is the data controller responsible for the processing of your personal information. Our registered address and contact information are provided in Section 18.</p>
          </section>

          <section>
            <h2 className="font-display text-lg text-text-primary mb-4">2. Categories of Personal Information Collected</h2>

            <h3 className="text-text-primary text-sm font-medium mt-6 mb-3">2.1 Information You Provide Directly</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-text-primary">Account Registration Data:</strong> Full name, email address, and password (stored exclusively in irreversibly hashed form using bcrypt with per-user salt). Artists additionally provide stage name, genre classification, biographical information, commission pricing, and profile imagery.</li>
              <li><strong className="text-text-primary">Commission Data:</strong> Creative briefs submitted in connection with Commission requests, including vision statements, occasion descriptions, musical preferences, and any other information provided in the brief.</li>
              <li><strong className="text-text-primary">Financial and Transaction Data:</strong> Payment card numbers, billing addresses, and related financial information are collected and processed exclusively by our PCI DSS-compliant third-party payment processor(s). XCLSV does not receive, access, transmit, or store full payment card numbers, CVV/CVC codes, or complete bank account numbers on its servers at any time.</li>
              <li><strong className="text-text-primary">Artist Inquiry Data:</strong> If you submit an artist interest registration form, we collect your name, email address, genre, social media handles (e.g., Instagram), streaming platform links (e.g., Spotify), and any message you choose to provide.</li>
              <li><strong className="text-text-primary">Communications:</strong> Messages, feedback, support requests, and any other correspondence you direct to us through the Platform or via email.</li>
              <li><strong className="text-text-primary">Identity Verification:</strong> Where required for high-value transactions, anti-fraud, or regulatory compliance purposes, we may request additional identity documentation.</li>
            </ul>

            <h3 className="text-text-primary text-sm font-medium mt-6 mb-3">2.2 Information Collected Automatically</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-text-primary">Usage and Interaction Data:</strong> Pages and features accessed, Commission history, listening activity and duration, clickstream data, timestamps of access, referring and exit URLs, and interaction patterns.</li>
              <li><strong className="text-text-primary">Device and Technical Data:</strong> Browser type and version, operating system, device type and model, unique device identifiers, screen resolution, language and locale preferences, and time zone settings.</li>
              <li><strong className="text-text-primary">Network and Geolocation Data:</strong> Internet Protocol (IP) address, approximate geographic location derived from IP address (city and region level only — we do not collect precise GPS coordinates), internet service provider, and network connection type.</li>
              <li><strong className="text-text-primary">Cookies and Similar Technologies:</strong> We deploy cookies, local storage objects, pixel tags, web beacons, and similar technologies as described in Section 10.</li>
              <li><strong className="text-text-primary">Log Data:</strong> Server logs that automatically record information about each request made to the Service, including request timestamps, HTTP methods, response codes, and data transfer volumes.</li>
            </ul>

            <h3 className="text-text-primary text-sm font-medium mt-6 mb-3">2.3 Information from Third Parties</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-text-primary">Payment Processors:</strong> Transaction confirmation, payment status, and dispute information from our payment processor(s).</li>
              <li><strong className="text-text-primary">Analytics Providers:</strong> Aggregated and de-identified usage data from analytics services that help us understand Platform performance and User behavior.</li>
              <li><strong className="text-text-primary">Fraud Prevention Services:</strong> Risk scores, device fingerprints, and fraud indicators from third-party fraud detection services used to protect the integrity of Platform transactions.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg text-text-primary mb-4">3. Legal Bases for Processing (EEA/UK Users)</h2>
            <p>If you are located in the European Economic Area (&ldquo;EEA&rdquo;) or the United Kingdom (&ldquo;UK&rdquo;), our processing of your personal data is based on the following legal grounds under the General Data Protection Regulation (&ldquo;GDPR&rdquo;) and UK GDPR:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong className="text-text-primary">Performance of Contract (Art. 6(1)(b)):</strong> Processing necessary for the performance of our contract with you, including account management, Commission facilitation, payment processing, and delivery of the Service.</li>
              <li><strong className="text-text-primary">Legitimate Interests (Art. 6(1)(f)):</strong> Processing necessary for our legitimate business interests, including fraud detection and prevention, Platform security, service improvement and optimization, enforcement of our Terms, and direct marketing to existing customers (subject to your right to opt out). We have conducted balancing assessments to ensure these interests do not override your fundamental rights.</li>
              <li><strong className="text-text-primary">Consent (Art. 6(1)(a)):</strong> Where we rely on your consent, including for certain cookie deployments and marketing communications to non-customers. You may withdraw consent at any time without affecting the lawfulness of processing conducted prior to withdrawal.</li>
              <li><strong className="text-text-primary">Legal Obligation (Art. 6(1)(c)):</strong> Processing necessary to comply with applicable laws, including tax reporting, anti-money laundering regulations, and responses to lawful government requests.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg text-text-primary mb-4">4. Purposes of Processing</h2>
            <p>We process personal information for the following purposes:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong className="text-text-primary">Service Delivery:</strong> Account creation and authentication, Commission processing and facilitation, payment transactions, audio delivery and streaming, and collection management.</li>
              <li><strong className="text-text-primary">Transaction Processing:</strong> Processing Deposits and final payments, disbursing Artist payments, generating transaction records, invoices, and tax documentation.</li>
              <li><strong className="text-text-primary">Communications:</strong> Commission status notifications, delivery alerts, payment confirmations, account security notices, and material service announcements. These transactional communications are necessary for the provision of the Service and are not subject to marketing opt-out preferences.</li>
              <li><strong className="text-text-primary">Platform Improvement:</strong> Analyzing usage patterns, conducting A/B testing, debugging technical issues, developing new features, and improving the overall User experience.</li>
              <li><strong className="text-text-primary">Safety and Security:</strong> Detecting, investigating, and preventing fraud, unauthorized access, illegal activity, and violations of our Terms. This includes monitoring for unauthorized distribution of Commission audio and enforcing digital rights protections.</li>
              <li><strong className="text-text-primary">Legal and Regulatory Compliance:</strong> Complying with applicable tax, financial reporting, anti-money laundering, and other regulatory requirements. Responding to lawful subpoenas, court orders, and government requests.</li>
              <li><strong className="text-text-primary">Dispute Resolution:</strong> Managing and resolving disputes between Buyers and Artists, processing refund requests, and administering arbitration proceedings.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg text-text-primary mb-4">5. Disclosure of Personal Information</h2>
            <p>WE DO NOT SELL YOUR PERSONAL INFORMATION. We do not rent, trade, or otherwise make personal information available to third parties for their direct marketing purposes. We may disclose your personal information in the following limited circumstances:</p>

            <h3 className="text-text-primary text-sm font-medium mt-6 mb-3">5.1 Commission Counterparties</h3>
            <p>When a Commission is initiated, the Artist receives the Buyer&rsquo;s name, creative brief, and occasion information as necessary to fulfill the Commission. Artists do not receive Buyer email addresses, payment details, mailing addresses, or other personal information unless specifically authorized by the Buyer or required for Commission fulfillment.</p>

            <h3 className="text-text-primary text-sm font-medium mt-6 mb-3">5.2 Service Providers and Processors</h3>
            <p>We engage third-party service providers who process personal information on our behalf to support the Service, including:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Payment processors (e.g., Stripe, Inc.) for transaction processing;</li>
              <li>Cloud infrastructure and hosting providers for data storage and Platform operation;</li>
              <li>Email delivery services for transactional and marketing communications;</li>
              <li>Analytics providers for usage analysis and Platform optimization;</li>
              <li>Fraud prevention and identity verification services; and</li>
              <li>Customer support tools and services.</li>
            </ul>
            <p className="mt-3">All service providers are bound by data processing agreements that restrict their use of personal information to the services performed on our behalf and require them to implement appropriate security measures.</p>

            <h3 className="text-text-primary text-sm font-medium mt-6 mb-3">5.3 Legal Requirements and Protection of Rights</h3>
            <p>We may disclose personal information if we believe in good faith that such disclosure is necessary to: (a) comply with applicable law, regulation, legal process, or governmental request; (b) enforce our Terms of Service or other agreements; (c) protect the rights, property, or safety of the Company, our Users, or the public; (d) detect, prevent, or address fraud, security, or technical issues; or (e) respond to an emergency involving danger of death or serious physical injury.</p>

            <h3 className="text-text-primary text-sm font-medium mt-6 mb-3">5.4 Business Transfers</h3>
            <p>In connection with, or during negotiations of, any merger, acquisition, sale of assets, financing, reorganization, bankruptcy, receivership, dissolution, or similar transaction, your personal information may be disclosed, transferred, or assigned as part of the Company&rsquo;s business assets. We will use reasonable efforts to notify you of any such transfer and of any choices you may have regarding your information.</p>

            <h3 className="text-text-primary text-sm font-medium mt-6 mb-3">5.5 With Your Consent</h3>
            <p>We may disclose your personal information for other purposes with your express consent.</p>
          </section>

          <section>
            <h2 className="font-display text-lg text-text-primary mb-4">6. Data Retention</h2>
            <p>We retain personal information only for as long as reasonably necessary to fulfill the purposes for which it was collected and to comply with our legal obligations. Our specific retention periods are as follows:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong className="text-text-primary">Account Data:</strong> Retained for the duration of your active account and for a period of thirty (30) days following account deletion to allow for account recovery, after which it is permanently deleted or irreversibly anonymized.</li>
              <li><strong className="text-text-primary">Commission and Transaction Records:</strong> Retained for a minimum of seven (7) years following the completion of the transaction to comply with applicable tax, financial reporting, anti-money laundering, and legal record-keeping requirements.</li>
              <li><strong className="text-text-primary">Audio Files:</strong> Commission audio files are retained on our servers for the duration of the Buyer&rsquo;s Listening License. Upon account deletion, audio files are not automatically deleted, as the Artist retains intellectual property rights in the work. Disposition of audio files upon account termination is governed by our Terms of Service.</li>
              <li><strong className="text-text-primary">Payment Records:</strong> Retained for a minimum of seven (7) years in accordance with IRS record-keeping requirements (26 C.F.R. &sect; 1.6001-1) and applicable state regulations.</li>
              <li><strong className="text-text-primary">Server and Access Logs:</strong> Automatically purged after ninety (90) days.</li>
              <li><strong className="text-text-primary">Artist Inquiry Submissions:</strong> Retained for twelve (12) months, after which they are deleted unless the inquiry results in an active Artist relationship.</li>
              <li><strong className="text-text-primary">Support Communications:</strong> Retained for three (3) years following resolution of the inquiry.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg text-text-primary mb-4">7. Data Security</h2>
            <p>We implement administrative, technical, and physical security measures designed to protect personal information against unauthorized access, alteration, disclosure, or destruction. These measures include, but are not limited to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Encryption of data in transit using Transport Layer Security (TLS 1.2 or higher) and encryption of sensitive data at rest using AES-256 or equivalent encryption standards;</li>
              <li>Password hashing using bcrypt with unique per-user cryptographic salts, rendering stored passwords computationally infeasible to reverse;</li>
              <li>Strict role-based access controls (RBAC) limiting access to personal information to authorized personnel on a need-to-know basis;</li>
              <li>Regular security assessments, penetration testing, and vulnerability scanning;</li>
              <li>Secure, access-controlled cloud infrastructure with SOC 2 Type II certified hosting providers;</li>
              <li>Automated intrusion detection and monitoring systems; and</li>
              <li>Incident response procedures for the timely identification, containment, and notification of security breaches.</li>
            </ul>
            <p className="mt-3">Notwithstanding the foregoing, no method of electronic transmission or storage is completely secure. While we strive to use commercially reasonable means to protect your personal information, we cannot guarantee absolute security. In the event of a data breach affecting your personal information, we will notify you and the relevant supervisory authorities in accordance with applicable law.</p>
          </section>

          <section>
            <h2 className="font-display text-lg text-text-primary mb-4">8. Your Rights and Choices</h2>
            <p>Subject to applicable law and certain exceptions, you may have the following rights with respect to your personal information:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong className="text-text-primary">Right of Access:</strong> Request confirmation of whether we process your personal information and obtain a copy of such information.</li>
              <li><strong className="text-text-primary">Right to Rectification:</strong> Request correction of inaccurate or incomplete personal information.</li>
              <li><strong className="text-text-primary">Right to Erasure (&ldquo;Right to be Forgotten&rdquo;):</strong> Request deletion of your personal information, subject to legal and contractual retention obligations and the rights of third parties (including Artists who retain intellectual property rights in Commissions).</li>
              <li><strong className="text-text-primary">Right to Data Portability:</strong> Request a copy of your personal information in a structured, commonly used, and machine-readable format.</li>
              <li><strong className="text-text-primary">Right to Restrict Processing:</strong> Request that we limit the processing of your personal information in certain circumstances, such as when you contest the accuracy of the data.</li>
              <li><strong className="text-text-primary">Right to Object:</strong> Object to processing of your personal information based on our legitimate interests. We will cease processing unless we demonstrate compelling legitimate grounds that override your interests.</li>
              <li><strong className="text-text-primary">Right to Withdraw Consent:</strong> Where processing is based on consent, withdraw your consent at any time. Withdrawal does not affect the lawfulness of processing conducted prior to withdrawal.</li>
              <li><strong className="text-text-primary">Right to Opt Out of Marketing:</strong> Opt out of marketing communications at any time by clicking the &ldquo;unsubscribe&rdquo; link or contacting us. This does not affect transactional communications necessary for the Service.</li>
            </ul>
            <p className="mt-3">To exercise any of these rights, submit a verifiable request to privacy@xclsv.com. We will respond within thirty (30) days (or such shorter period as required by applicable law). We may request additional information to verify your identity before processing your request. We will not discriminate against you for exercising any of these rights.</p>
          </section>

          <section>
            <h2 className="font-display text-lg text-text-primary mb-4">9. Audio Streaming, Digital Rights Management, and Content Protection</h2>
            <p>Commission audio files are delivered to Buyers exclusively through the XCLSV Platform using encrypted, access-controlled streaming. We implement the following technical and administrative protections to safeguard the intellectual property rights of Artists and the exclusivity of the Buyer&rsquo;s experience:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Audio files are streamed using authenticated, time-limited signed URLs and are not directly downloadable;</li>
              <li>Each streaming session is cryptographically tied to the Buyer&rsquo;s authenticated session;</li>
              <li>We deploy audio fingerprinting and watermarking technologies to enable detection and attribution of unauthorized copies appearing on external platforms or services;</li>
              <li>We monitor for and take action against unauthorized distribution, reproduction, or sharing of Commission audio, including issuing takedown notices under applicable copyright laws; and</li>
              <li>We may implement additional digital rights management (DRM) technologies as reasonably necessary to protect content.</li>
            </ul>
            <p className="mt-3">By using the Service, you acknowledge and agree that these content protection measures are necessary to maintain the exclusivity and value of Commissions and to protect the rights of Artists and Buyers.</p>
          </section>

          <section>
            <h2 className="font-display text-lg text-text-primary mb-4">10. Cookies, Tracking Technologies, and Do Not Track</h2>
            <h3 className="text-text-primary text-sm font-medium mt-4 mb-2">10.1 Types of Cookies and Technologies</h3>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong className="text-text-primary">Strictly Necessary Cookies:</strong> Essential for authentication, session management, security (including CSRF protection), and core Platform functionality. These cookies cannot be disabled without impairing the Service.</li>
              <li><strong className="text-text-primary">Functional Cookies:</strong> Remember your preferences and settings, such as language, theme, and playback volume, to enhance your experience.</li>
              <li><strong className="text-text-primary">Analytics Cookies:</strong> Collect de-identified, aggregated data about how Users interact with the Platform, including page views, feature usage, and error rates. We use privacy-respecting analytics tools and do not use analytics data for advertising purposes.</li>
            </ul>
            <h3 className="text-text-primary text-sm font-medium mt-4 mb-2">10.2 What We Do Not Do</h3>
            <p>We do not deploy advertising or retargeting cookies. We do not sell cookie data or share it with ad networks. We do not engage in cross-site behavioral tracking. We do not build advertising profiles based on your browsing activity.</p>
            <h3 className="text-text-primary text-sm font-medium mt-4 mb-2">10.3 Do Not Track Signals</h3>
            <p>Certain web browsers transmit &ldquo;Do Not Track&rdquo; (&ldquo;DNT&rdquo;) signals. As there is no universally accepted standard for interpreting DNT signals, the Service does not currently respond to DNT signals. However, our practices already minimize tracking as described in this Section.</p>
            <h3 className="text-text-primary text-sm font-medium mt-4 mb-2">10.4 Managing Cookies</h3>
            <p>You may control and manage cookies through your browser settings. Please note that disabling certain cookies may impair the functionality of the Service.</p>
          </section>

          <section>
            <h2 className="font-display text-lg text-text-primary mb-4">11. Children&rsquo;s Privacy</h2>
            <p>The Service is not directed to, and we do not knowingly collect personal information from, individuals under the age of eighteen (18). We do not knowingly solicit data from or market to children. If we become aware that we have collected personal information from an individual under 18, we will take prompt steps to delete such information. If you believe that a minor has provided us with personal information, please contact us at privacy@xclsv.com, and we will investigate and take appropriate action.</p>
          </section>

          <section>
            <h2 className="font-display text-lg text-text-primary mb-4">12. International Data Transfers</h2>
            <p>Your personal information may be transferred to, stored in, and processed in the United States and other countries that may have data protection laws different from those in your country of residence. By using the Service, you acknowledge and consent to such transfers. Where required by applicable law, we implement appropriate safeguards for cross-border transfers, including:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Standard Contractual Clauses (SCCs) approved by the European Commission for transfers of personal data from the EEA;</li>
              <li>The UK International Data Transfer Agreement or UK Addendum to the EU SCCs for transfers from the UK; and</li>
              <li>Such other transfer mechanisms as may be approved by the relevant data protection authority.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg text-text-primary mb-4">13. California Privacy Rights (CCPA/CPRA)</h2>
            <p>If you are a California resident, you have additional rights under the California Consumer Privacy Act, as amended by the California Privacy Rights Act (collectively, &ldquo;CCPA&rdquo;):</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong className="text-text-primary">Right to Know:</strong> You may request that we disclose the categories and specific pieces of personal information we have collected, the sources of collection, the business or commercial purposes for collection, and the categories of third parties with whom we share personal information.</li>
              <li><strong className="text-text-primary">Right to Delete:</strong> You may request the deletion of personal information we have collected, subject to certain exceptions permitted by the CCPA.</li>
              <li><strong className="text-text-primary">Right to Correct:</strong> You may request the correction of inaccurate personal information.</li>
              <li><strong className="text-text-primary">Right to Opt Out of Sale or Sharing:</strong> XCLSV does not sell personal information as defined by the CCPA, and does not share personal information for cross-context behavioral advertising purposes.</li>
              <li><strong className="text-text-primary">Right to Limit Use of Sensitive Personal Information:</strong> To the extent we process sensitive personal information (as defined by the CCPA), we do so only for purposes permitted under the CCPA without the need for an opt-out.</li>
              <li><strong className="text-text-primary">Right to Non-Discrimination:</strong> We will not discriminate against you for exercising any of your CCPA rights.</li>
            </ul>
            <p className="mt-3">To submit a verifiable consumer request, contact us at privacy@xclsv.com. You may designate an authorized agent to make a request on your behalf, subject to identity verification requirements. We will respond to verifiable consumer requests within forty-five (45) days as required by the CCPA.</p>
            <p className="mt-3">In the preceding twelve (12) months, we have collected the following categories of personal information as enumerated in Cal. Civ. Code &sect; 1798.140(v): identifiers, commercial information, internet or other electronic network activity information, and inferences drawn from the foregoing.</p>
          </section>

          <section>
            <h2 className="font-display text-lg text-text-primary mb-4">14. European Privacy Rights (GDPR / UK GDPR)</h2>
            <p>If you are located in the EEA or UK, you have the rights set forth in Section 8 above, plus the following additional protections:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong className="text-text-primary">Data Protection Officer:</strong> You may contact our data protection team at privacy@xclsv.com for any inquiries regarding the processing of your personal data.</li>
              <li><strong className="text-text-primary">Supervisory Authority:</strong> You have the right to lodge a complaint with your local supervisory authority if you believe that the processing of your personal data violates applicable data protection law. A list of EEA supervisory authorities is available at <span className="text-text-primary">https://edpb.europa.eu</span>.</li>
              <li><strong className="text-text-primary">Automated Decision-Making:</strong> We do not engage in solely automated decision-making (including profiling) that produces legal or similarly significant effects on individuals, except as necessary for the performance of our contract with you or with your explicit consent.</li>
              <li><strong className="text-text-primary">Data Protection Impact Assessments:</strong> We conduct data protection impact assessments for processing activities that are likely to result in a high risk to the rights and freedoms of natural persons, in accordance with Article 35 of the GDPR.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg text-text-primary mb-4">15. Other U.S. State Privacy Laws</h2>
            <p>Residents of Virginia (VCDPA), Colorado (CPA), Connecticut (CTDPA), Utah (UCPA), and other states with comprehensive privacy legislation may have additional rights, including the right to access, correct, delete, and obtain a portable copy of their personal data, as well as the right to opt out of targeted advertising, sale of personal data, and profiling in furtherance of decisions producing legal or similarly significant effects. XCLSV does not engage in the sale of personal data or targeted advertising as defined by these statutes. To exercise your rights, contact us at privacy@xclsv.com. If your request is denied, you may appeal by contacting us at legal@xclsv.com.</p>
          </section>

          <section>
            <h2 className="font-display text-lg text-text-primary mb-4">16. Third-Party Links and Integrations</h2>
            <p>The Service may contain links to third-party websites, services, or applications that are not operated or controlled by the Company, including payment processors, social media platforms, and streaming services. This Privacy Policy does not apply to any third-party services. We are not responsible for the privacy practices, content, or security of any third party. We encourage you to review the privacy policies of any third-party services before providing personal information.</p>
          </section>

          <section>
            <h2 className="font-display text-lg text-text-primary mb-4">17. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time to reflect changes in our practices, the Service, or applicable law. We will provide notice of material changes by posting the revised Policy on the Platform with an updated &ldquo;Effective Date&rdquo; and, where required by applicable law, by sending notice to the email address associated with your account at least thirty (30) days before the changes take effect. Your continued use of the Service after the revised Policy becomes effective constitutes your acceptance of the updated terms. If you do not agree to the revised Policy, you must cease use of the Service and close your account.</p>
          </section>

          <section>
            <h2 className="font-display text-lg text-text-primary mb-4">18. Contact Information</h2>
            <p>For questions, concerns, data subject requests, or complaints regarding this Privacy Policy or our data practices, contact:</p>
            <div className="mt-3 space-y-1">
              <p className="text-text-primary">XCLSV Inc.</p>
              <p>Privacy and Data Protection</p>
              <p>Email: privacy@xclsv.com</p>
              <p>Legal Inquiries: legal@xclsv.com</p>
            </div>
            <p className="mt-4">We will acknowledge receipt of your inquiry within two (2) business days and provide a substantive response within thirty (30) days (or such shorter period as required by applicable law).</p>
          </section>

        </div>
      </main>
  );
}
