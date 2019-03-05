import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Link from "~/components/layout/Link";
import Typography from "~/components/layout/Typography";
import Section from "./SectionComponent";
import SectionParagraph from "./SectionParagraph";
import Title from "./TitleComponent";

const styles = createStyles({
  updateDate: {
    alignSelf: "left",
  },
});

/**
 * Workaround to avoid "Comment location overlaps with node location" error
 * https://github.com/prettier/prettier/issues/2347
 */

const addLinkTo = (link: string) => <Link to={link}>{link}</Link>;

const PolicyLayout = ({ classes }: WithStyles<typeof styles>): JSX.Element => {
  return (
    <React.Fragment>
      <Title variant="h5">IOV Privacy Policy</Title>
      <Typography variant="body2" color="secondary" className={classes.updateDate}>
        Updated on [-] November 2018
      </Typography>
      <Section>
        <SectionParagraph>
          IOV SAS, a French company, the provider our website, {addLinkTo("http://demo.iov.one")}, and other
          sites we own and operate (the “Websites”) is committed to protecting your privacy online. Please
          read the following to learn what information we collect from you (the “User” or the “End User”) and
          how we use that information. If you have any questions about our privacy policy, please email us.
        </SectionParagraph>
        <Block margin="md" />
        <SectionParagraph>
          BY ACCESSING OR USING OUR WEBSITES, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTAND, AND AGREE TO BE
          BOUND TO ALL THE TERMS OF THIS PRIVACY POLICY. IF YOU DO NOT AGREE TO THESE TERMS, EXIT THIS PAGE
          AND DO NOT ACCESS OR USE THE WEBSITES.
        </SectionParagraph>
      </Section>
      <Title>Types of Information Collected</Title>
      <Section>
        <SectionParagraph>We process the following personal information about you:</SectionParagraph>
        <SectionParagraph>Information that you provide to us</SectionParagraph>
        <SectionParagraph>
          IOV processes every information that you choose to provide to us as well as the following data:
        </SectionParagraph>
        <Block padding="sm" margin="sm">
          <SectionParagraph>- Your first name, name and gender;</SectionParagraph>
          <SectionParagraph>- Citizenship;</SectionParagraph>
          <SectionParagraph>- Mailing address, email, phone number;</SectionParagraph>
          <SectionParagraph>- Name of your company, position;</SectionParagraph>
          <SectionParagraph>- Email;</SectionParagraph>
          <SectionParagraph>- IP address;</SectionParagraph>
          <SectionParagraph>
            - Every information necessary for the provision our services pursuant to a contract (payment
            information, services history…);
          </SectionParagraph>
          <SectionParagraph>- Login and access codes;</SectionParagraph>
          <SectionParagraph>- Social media profile;</SectionParagraph>
          <SectionParagraph>- Your preferences about commercial solicitation.</SectionParagraph>
        </Block>
        <SectionParagraph>Your personal information is collected when:</SectionParagraph>
        <Block padding="sm" margin="sm">
          <SectionParagraph>- You register on our Websites;</SectionParagraph>
          <SectionParagraph>- You subscribe to our newsletter;</SectionParagraph>
          <SectionParagraph>- You contact us;</SectionParagraph>
          <SectionParagraph>- You open a wallet;</SectionParagraph>
          <SectionParagraph>- You interact with our company.</SectionParagraph>
        </Block>
      </Section>
      <Title>Use of your personal information</Title>
      <Section>
        <SectionParagraph>
          IOV will only process your personal data for the following purposes:
        </SectionParagraph>
        <Block padding="sm" margin="sm">
          <SectionParagraph>- To visit our Website;</SectionParagraph>
          <SectionParagraph>- To activate your account;</SectionParagraph>
          <SectionParagraph>
            - To provide our services and execute our contractual obligations;
          </SectionParagraph>
          <SectionParagraph>
            - To ensure communication on our services and customize our offers;
          </SectionParagraph>
          <SectionParagraph>- To provide our newsletter;</SectionParagraph>
          <SectionParagraph>
            - To understand and answer your expectations, comments and suggestions;
          </SectionParagraph>
          <SectionParagraph>
            - To analyze and predict your preferences so that we can offer you tailored services or that may
            interest you;
          </SectionParagraph>
          <SectionParagraph>- To send you marketing communications;</SectionParagraph>
          <SectionParagraph>- Conduct surveys, analysis and statistics;</SectionParagraph>
          <SectionParagraph>- Inform you on the improvement of our services;</SectionParagraph>
          <SectionParagraph>- To comply with our regulatory requirements;</SectionParagraph>
          <SectionParagraph>- If any, to process your claims.</SectionParagraph>
        </Block>
        <SectionParagraph>
          Also, we may aggregate and/or anonymize your data so that it will no longer be considered as
          personal data. We do so to generate other data for our use, which we may use and disclose for any
          purpose (including in particular, for statistics, services analyses, provision of new services….
        </SectionParagraph>
      </Section>
      <Title>What is our legal basis to use or process your personal information?</Title>
      <Section>
        <SectionParagraph>
          Your personal information is only processed by IOV when we have a legal basis to do so and in
          particular:
        </SectionParagraph>
        <Block padding="sm" margin="sm">
          <SectionParagraph>
            - to perform our obligations in accordance with any contract that we may have with you (for
            instance, to register on our Websites, answer your queries, provide our services….);
          </SectionParagraph>
          <SectionParagraph>
            - in case of consent (by navigating on our Websites, clicking on a ticking box…). You may withdraw
            your consent at any time;
          </SectionParagraph>
          <SectionParagraph>
            - it is in our legitimate interest or a third party's legitimate interest to use personal
            information in such a way to ensure that we provide our services in the best way that we can;
          </SectionParagraph>
          <SectionParagraph>
            - it is our legal obligation to use your personal information to comply with any legal obligations
            imposed upon us.
          </SectionParagraph>
        </Block>
      </Section>
      <Title>Release of personal Information</Title>
      <Section>
        <SectionParagraph>
          Our commercial partners and companies (the “Third-Party Service Providers”) who work with us for
          management of our Websites, performance of our contracts with you, hosting of your data and
          provision of our business operations exclusively process your personal data within the scope of the
          missions entrusted to them. These Third-Party Service Providers may contact you directly using the
          personal data that you provided us or that we obtained lawfully from third parties. We strictly
          require from our Third-Party Service Providers that they process your personal in data in compliance
          with personal data applicable regulation and to implement appropriate measure to ensure security and
          confidentiality of your personal information.
        </SectionParagraph>
        <SectionParagraph>
          We may also release your information when we believe release is appropriate to comply with the law,
          protect ours rights, or if all or part of our assets is transferred to another company.
        </SectionParagraph>
        <SectionParagraph>
          Lastly, aggregated data, meaning non-identifiable data can be transferred to third parties for
          marketing, advertising or any other purpose.
        </SectionParagraph>
      </Section>
      <Title>Location of your personal information</Title>
      <Section>
        <SectionParagraph>
          IOV may transfer your personal information outside of the European Economic Area (EEA) to its
          subsidiaries and to external suppliers based outside of the EEA. The EEA comprises those countries
          that are in the European Union (EU) and some other countries that are considered to have adequate
          laws to ensure personal information is protected.
        </SectionParagraph>
        <SectionParagraph>
          When transferring your personal information outside of the EEA, IOV will (and will ensure that
          service providers acting on our behalf agree to) protect it from improper use or disclosure and
          ensure the same levels of protection are in place as are applied within the EEA.
        </SectionParagraph>
        <SectionParagraph>
          You hereby consent to the transfer of your personal data outside the European Union.
        </SectionParagraph>
      </Section>
      <Title>Updating and Correcting Information</Title>
      <Section>
        <SectionParagraph>
          When transferring your personal information outside of the EEA, IOV will (and will ensure that
          service providers acting on our behalf agree to) protect it from improper use or disclosure and
          ensure the same levels of protection are in place as are applied within the EEA.
        </SectionParagraph>
        <Block padding="sm" margin="sm">
          <SectionParagraph>
            - <strong>Access to your information</strong> – You have the right to request a copy of your personal information that we hold.
          </SectionParagraph>
          <SectionParagraph>
            - <strong>Correcting your information</strong> – IOV ensures to make sure that your personal information is accurate, complete and up to
            date. At any time, you may ask us to correct your personal information.
          </SectionParagraph>
          <SectionParagraph>
            - <strong>Deletion of your information</strong> – You have the right to ask us to delete personal information about you where i) You
            consider that we no longer require the information for the purposes for which it was obtained or
            ii) our use of your personal information is contrary to law or our other legal obligations.
          </SectionParagraph>
          <SectionParagraph>
            - <strong>Oppose or restrict how we may use your information</strong> – You may ask us to restrict how we use your personal information or oppose to such process.
            In this case, we may only use the relevant personal information with your consent, for legal
            claims or where there are other public interest grounds.
          </SectionParagraph>
          <SectionParagraph>
            - <strong>Opt-out to the reception of newsletters.</strong> You may at any time decide to opt-out to the reception of our newsletters.
          </SectionParagraph>
          <SectionParagraph>
            - <strong>Right to data portability</strong> – You have the right, in certain circumstances, to obtain personal information you have
            provided us with (in a structured, commonly used and machine-readable format) and to reuse it
            elsewhere or to ask us to transfer this to a third party of your choice (please note that this
            right is limited to the data you provided to us).
          </SectionParagraph>
        </Block>
        <SectionParagraph>
          These requests must be addressed by written request to IOV,&nbsp;
          <Link to="mailto:privacy@iov.one">privacy@iov.one</Link>
        </SectionParagraph>
        <SectionParagraph>
          If our answer is not satisfactory within the time limit set by the applicable law, you may lodge a
          complaint with the relevant data protection supervisory authority. however, because we keep track of
          past transactions, you cannot delete information associated with past transactions on the Websites.
          In addition, in may be impossible for us to completely delete all your information because we
          periodically backup information.
        </SectionParagraph>
      </Section>
      <Title>Security of Information</Title>
      <Section>
        <SectionParagraph>
          We take security seriously and take numerous precautions to protect the security of Personally
          Identifiable Information to protect the personal data that we have under our control from
          unauthorized access, improper use or disclosure, unauthorized modification and unlawful destruction
          or accidental loss.
        </SectionParagraph>
        <SectionParagraph>
          Unfortunately, no data transmission over the Internet or any wireless network can be guaranteed to
          be 100% secure. As a result, while we employ commercially reasonable security measures to protect
          data and seek to partner with companies which do the same, we cannot guarantee the security of any
          information transmitted to or from the Websites, and are not responsible for the actions of any
          third parties that may receive any such information.
        </SectionParagraph>
      </Section>
      <Title>Retention period</Title>
      <Section>
        <SectionParagraph>
          For visitors to the Websites, we will retain relevant personal information for at least three years
          from the date of our last interaction with you and in compliance with our obligations under the GDPR
          or similar legislation around the world, or for longer if we are required to do so according to our
          regulatory obligations.
        </SectionParagraph>
        <SectionParagraph>
          For service and product provision to any client, we will retain relevant personal information for at
          least five years from the date of our last interaction with you and in compliance with our
          obligations under the GDPR or similar legislation around the world, or for longer as we are required
          to do so according to our regulatory obligations. We may then destroy such files without further
          notice or liability.
        </SectionParagraph>
        <SectionParagraph>
          If you no longer want IOV to use your information to provide you with our products and services, you
          can close your account and IOV will delete the information it holds about you unless IOV needs to
          retain and use your information to comply with our legal obligations, to resolve disputes or to
          enforce our agreements.
        </SectionParagraph>
      </Section>
      <Title>Cookies</Title>
      <Section>
        <SectionParagraph>
          To facilitate and customize your experience with the Websites, we store cookies on your computer. A
          cookie is a small text file that is stored on a User’s computer for record-keeping purposes which
          contains information about that User. We use cookies to save you time while using the Websites,
          remind us who you are, and track and target User interests in order to provide a customized
          experience. Cookies also allow us to collect information from you, like which pages you visited and
          what links you clicked on. Use of this information helps us to create a more user-friendly
          experience for all visitors. Cookies are also placed when you decide to use sharing buttons linked
          to social networks. . We have no access to or control over these cookies. This Privacy Policy covers
          the use of cookies by our Websites only and does not cover the use of cookies by any third party.
          Most browsers automatically accept cookies, but you may be able to modify your browser settings to
          decline cookies. Please note that if you decline or delete these cookies, some parts of the Websites
          may not work properly. These following links may help you:
        </SectionParagraph>
        <Block padding="sm" margin="sm">
          <SectionParagraph>
            - Internet Explorer :{" "}
            {addLinkTo("http://windows.microsoft.com/fr-FR/windows-vista/Block-or-allow-cookies")}
          </SectionParagraph>
          <SectionParagraph>
            - Chrome :{" "}
            {addLinkTo("http://support.google.com/chrome/bin/answer.py?hl=fr&hlrm=en&answer=95647")}
          </SectionParagraph>
          <SectionParagraph>
            - Firefox : {addLinkTo("http://support.mozilla.org/fr/kb/Activer et d%C3%A9sactiver les cookies")}
          </SectionParagraph>
          <SectionParagraph>
            - Safari : {addLinkTo("http://docs.info.apple.com/article.html?path=Safari/3.0/fr/9277.html")}
          </SectionParagraph>
        </Block>
        <SectionParagraph>
          Other Tracking Devices. We may use other industry standard technologies like pixel tags and web
          beacons to track your use of our Websites pages and promotions, or we may allow our Third Party
          Service Providers to use these devices on our behalf. Pixel tags and web beacons are tiny graphic
          images placed on certain pages on our Websites, or in our emails that allow us to determine whether
          you have performed a specific action. When you access these pages or open or click an email, pixel
          tags and web beacons generate a notice of that action. Pixel tags allow us to measure and improve
          our understanding of visitor traffic and behavior on our Websites, as well as give us a way to
          measure our promotions and performance. We may also utilize pixel tags and web beacons provided by
          our Affiliates and/or Marketing Partners for the same purposes.
        </SectionParagraph>
        <Typography weight="light" variant="body1" underlined>
          Cookies used on our Websites
        </Typography>
        <Typography variant="h6" gutterBottom>
          First party cookies
        </Typography>
        <Typography weight="light" variant="body1">
          [TO BE COMPLETED]
        </Typography>
        <Block padding="sm" margin="sm">
          <SectionParagraph>
            - <strong>Cookie name:</strong>
          </SectionParagraph>
          <SectionParagraph>
            - <strong>Purpose:</strong>
          </SectionParagraph>
          <SectionParagraph>
            - <strong>Duration:</strong>
          </SectionParagraph>
          <SectionParagraph>
            - <strong>Strictly necessary (Y/N):</strong>
          </SectionParagraph>
        </Block>
        <Typography variant="h6" gutterBottom>
          Third party cookies
        </Typography>
        <Typography weight="light" variant="body1">
          [TO BE COMPLETED]
        </Typography>
        <Block padding="sm" margin="sm">
        <SectionParagraph>
            - <strong>Cookie name:</strong>
          </SectionParagraph>
          <SectionParagraph>
            - <strong>Purpose:</strong>
          </SectionParagraph>
          <SectionParagraph>
            - <strong>Duration:</strong>
          </SectionParagraph>
          <SectionParagraph>
            - <strong>Strictly necessary (Y/N):</strong>
          </SectionParagraph>
        </Block>
      </Section>
      <Title>Privacy Policies of Third-Party Websites</Title>
      <Section>
        <SectionParagraph>
          This Privacy Policy only addresses the use and disclosure of information we collect from you on our
          Websites. Other websites that may be accessible through this Website have their own privacy policies
          and data collection, use and disclosure practices. If you link to any such website, we urge you
          review the website’s privacy policy. We are not responsible for the policies or practices of third
          parties.
        </SectionParagraph>
      </Section>
      <Title>Children</Title>
      <Section>
        <SectionParagraph>
          Minors under the age of 18 may not use the Websites. We do not collect personal information from
          anyone under the age of 18, and no part of the Websites is designed to attract anyone under the age
          of 18. By accessing to the Site, you declare that you are older than 18.
        </SectionParagraph>
        <SectionParagraph>You may choose at any time to opt-in to our newsletters.</SectionParagraph>
      </Section>
      <Title>Changes to Privacy Policy</Title>
      <Section>
        <SectionParagraph>
          If we decide to change our privacy policy, we will post those changes to this privacy statement, the
          home page, and other places we deem appropriate so that you are aware of what information we
          collect, how we use it, and under what circumstances, if any, we disclose it. We reserve the right
          to modify this privacy statement at any time, so please review it frequently. If we make material
          changes to this policy, we will notify you here, by email, or by means of notice on our home page.
        </SectionParagraph>
      </Section>
      <Title>Contacting Us</Title>
      <Section>
        <SectionParagraph>
          For further information about this policy, please contact{" "}
          <Link to="mailto:contact@iov.one">contact@iov.one</Link>
        </SectionParagraph>
      </Section>
    </React.Fragment>
  );
};

export default withStyles(styles)(PolicyLayout);
