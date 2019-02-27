import * as React from "react";
import Section from "./SectionComponent";
import Title from "./TitleComponent";

export default (): JSX.Element => {
  return (
    <React.Fragment>
      <Title text="Terms" />
      <Section>
        The website http://demo.iov.one  (hereinafter: the “Website”) is owned and operated by the company IOV
        SAS, 55 Rue La Boetie, 75008, Paris, France (hereinafter "IOV").
      </Section>
      <Title text="User License" />
      <Section>
        The Website, its contents, design, trademarks and software are the sole property of IOV and/or its
        licensors and are protected by intellectual property laws in France and in foreign countries.
        Permission is granted to temporarily download one copy of the materials (information or software) on
        the Website for personal, non-commercial transitory viewing only. This is the grant of a license, not
        a transfer of title, and, subject to mandatory legal provisions, you may not: • modify or copy the
        materials; • use the materials for any commercial purpose, or for any public display (commercial or
        non-commercial); • attempt to decompile or reverse engineer any software contained on the Website; •
        remove any copyright or other proprietary information from the materials; or • transfer the materials
        to another person or "mirror" the materials on any other server. This license shall automatically
        terminate if you violate any of these restrictions and may be terminated by IOV at any time. Upon
        terminating your viewing of these materials or upon the termination of this license, you must destroy
        any downloaded materials in your possession whether in electronic or printed format.
      </Section>
      <Title text="Member account" />
      <Section>
        Once you have registered on the Website, you will receive a private access code to access to a secured
        platform. You must ensure that any information given to IOV in connection with your IOV account will
        always be accurate, correct, and up to date, and must promptly update it in the event changes occur.
        You are solely responsible to IOV for the use of your account and must not disclose your private
        password to a third-party. You must notify IOV immediately if you become aware of any unauthorized use
        of your account. IOV will not be liable for any loss or liability incurred as a result of an
        unauthorized person using your account. IOV may disable you Member account or password, whether chosen
        by you or allocated by us, at any time, if in our reasonable opinion you have failed to comply with
        any of the provisions of these Terms.
      </Section>
      <Title text="Disclaimer" />
      <Section>
        The Website and its contents are provided on an ”as is” basis. IOV makes no warranties, expressed or
        implied, and hereby disclaims and negates all other warranties including, without limitation, implied
        warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of
        intellectual property or other violation of rights. Further, IOV does not warrant or make any
        representations concerning the accuracy, likely results, or reliability of the use of the its Website
        or otherwise relating to its content or on any sites linked to this site.
      </Section>
      <Title text="Limitations" />
      <Section>
        In no event shall IOV or its subcontractors be liable for any damages (including, without limitation,
        damages for loss of data or profit, or due to business interruption) arising out of the use or
        inability to use the Website such as payments sent to wrong IOV addresses and accidental deletion of
        wallets, corrupted files and security problems., even if IOV or an IOV authorized representative has
        been notified orally or in writing of the possibility of such damage. The foregoing disclaimer of
        certain damages and limitation of liability will apply to the maximum extent permitted by applicable
        law. The laws of some states or jurisdictions do not allow the exclusion or limitation of certain
        damages, so some or all of the exclusions and limitations set forth above may not apply to you.
      </Section>
      <Title text="Accuracy of content" />
      <Section>
        The contents appearing on the Website could include technical, typographical, or photographic errors.
        IOV does not warrant that any of the content on its website are accurate, complete or current. IOV may
        make changes to the contents contained on its website at any time without notice. However IOV does not
        make any commitment to update the contents.
      </Section>
      <Title text="Links" />
      <Section>
        IOV has not reviewed all of the sites linked to its website and is not responsible for the contents of
        any such linked site. The inclusion of any link does not imply endorsement by IOV of the site or
        association with their operators or promoters. Use of any such linked website is at the user's own
        risk.
      </Section>
      <Title text="Modifications" />
      <Section>
        IOV reserves the right to update regularly these Terms, at its sole discretion. We invite you to
        regularly verify these Terms to take notice of any modifications we make, as they are binding on you.
        Your continued use of the Website after any modifications, shall constitute your consent to such
        changes. If you do not agree to such changes, you have no right to obtain information or access to the
        Website and must immediately cease use of it
      </Section>
      <Title text="Governing Law" />
      <Section>
        These Terms and your use of the Website, as well as all matters arising out or in relation to them
        (including non-contractual disputes or claims and their interpretation), shall be governed by French
        law, to the exclusion of the rules on conflicts of laws. Any claim or dispute regarding these Terms or
        in relation to them shall (including for noncontractual disputes or claims and their interpretation)
        be subject to the exclusive jurisdiction of Paris competent courts, France
      </Section>
      <Title text="Contacting us" />
      <Section>For any request, please contact us at contact@iov.one</Section>
    </React.Fragment>
  );
};
