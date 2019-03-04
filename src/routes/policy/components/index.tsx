import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Link from "~/components/layout/Link";
import Typography from "~/components/layout/Typography";
import { lightFont } from "~/theme/variables";
import Section from "./SectionComponent";
import Title from "./TitleComponent";

const styles = createStyles({
  updateDate: {
    alignSelf: "left",
  },
  list: {
    fontWeight: lightFont,
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
        <Typography weight="light" variant="body2">
          IOV SAS, a French company, the provider our website, {addLinkTo("http://demo.iov.one")}, and other
          sites we own and operate (the “Websites”) is committed to protecting your privacy online. Please
          read the following to learn what information we collect from you (the “User” or the “End User”) and
          how we use that information. If you have any questions about our privacy policy, please email us.
        </Typography>
        <Block margin="md" />
        <Typography weight="light" variant="body2">
          BY ACCESSING OR USING OUR WEBSITES, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTAND, AND AGREE TO BE
          BOUND TO ALL THE TERMS OF THIS PRIVACY POLICY. IF YOU DO NOT AGREE TO THESE TERMS, EXIT THIS PAGE
          AND DO NOT ACCESS OR USE THE WEBSITES.
        </Typography>
      </Section>
      <Title>Types of Information Collected</Title>
      <Section>
        <Typography weight="light" variant="body2" gutterBottom>
          We process the following personal information about you:
        </Typography>
        <Typography variant="body2" gutterBottom>
          Information that you provide to us
        </Typography>
        <Typography weight="light" variant="body2">
          IOV processes every information that you choose to provide to us as well as the following data:
        </Typography>
        <Block padding="sm" margin="sm">
          <Typography weight="light" variant="body2">
            - Your first name, name and gender;
          </Typography>
          <Typography weight="light" variant="body2">
            - Citizenship;
          </Typography>
          <Typography weight="light" variant="body2">
            - Mailing address, email, phone number;
          </Typography>
          <Typography weight="light" variant="body2">
            - Name of your company, position;
          </Typography>
          <Typography weight="light" variant="body2">
            - Email;
          </Typography>
          <Typography weight="light" variant="body2">
            - IP address;
          </Typography>
          <Typography weight="light" variant="body2">
            - Every information necessary for the provision our services pursuant to a contract (payment
            information, services history…);
          </Typography>
          <Typography weight="light" variant="body2">
            - Login and access codes;
          </Typography>
          <Typography weight="light" variant="body2">
            - Social media profile;
          </Typography>
          <Typography weight="light" variant="body2">
            - Your preferences about commercial solicitation.
          </Typography>
        </Block>
        <Typography weight="light" variant="body2">
          Your personal information is collected when:
        </Typography>
        <Block padding="sm" margin="sm">
          <Typography weight="light" variant="body2">
            - You register on our Websites;
          </Typography>
          <Typography weight="light" variant="body2">
            - You subscribe to our newsletter;
          </Typography>
          <Typography weight="light" variant="body2">
            - You contact us;
          </Typography>
          <Typography weight="light" variant="body2">
            - You open a wallet;
          </Typography>
          <Typography weight="light" variant="body2">
            - You interact with our company.
          </Typography>
        </Block>
      </Section>
      <Title>Use of your personal information</Title>
      <Section>
        <Typography weight="light" variant="body2">
          IOV will only process your personal data for the following purposes:
        </Typography>
        <Block padding="sm" margin="sm">
          <Typography weight="light" variant="body2">
            - To visit our Website;
          </Typography>
          <Typography weight="light" variant="body2">
            - To activate your account;
          </Typography>
          <Typography weight="light" variant="body2">
            - To provide our services and execute our contractual obligations;
          </Typography>
          <Typography weight="light" variant="body2">
            - To ensure communication on our services and customize our offers;
          </Typography>
          <Typography weight="light" variant="body2">
            - To provide our newsletter;
          </Typography>
          <Typography weight="light" variant="body2">
            - To understand and answer your expectations, comments and suggestions;
          </Typography>
          <Typography weight="light" variant="body2">
            - To analyze and predict your preferences so that we can offer you tailored services or that may
            interest you;
          </Typography>
          <Typography weight="light" variant="body2">
            - To send you marketing communications;
          </Typography>
          <Typography weight="light" variant="body2">
            - Conduct surveys, analysis and statistics;
          </Typography>
          <Typography weight="light" variant="body2">
            - Inform you on the improvement of our services;
          </Typography>
          <Typography weight="light" variant="body2">
            - To comply with our regulatory requirements;
          </Typography>
          <Typography weight="light" variant="body2">
            - If any, to process your claims.
          </Typography>
        </Block>
        <Typography weight="light" variant="body2">
          Also, we may aggregate and/or anonymize your data so that it will no longer be considered as
          personal data. We do so to generate other data for our use, which we may use and disclose for any
          purpose (including in particular, for statistics, services analyses, provision of new services….
        </Typography>
      </Section>
      <Title>What is our legal basis to use or process your personal information?</Title>
      <Section>
        <Typography weight="light" variant="body2" gutterBottom>
          Your personal information is only processed by IOV when we have a legal basis to do so and in
          particular:
        </Typography>
        <Block padding="sm" margin="sm">
          <Typography weight="light" variant="body2">
            - to perform our obligations in accordance with any contract that we may have with you (for
            instance, to register on our Websites, answer your queries, provide our services….);
          </Typography>
          <Typography weight="light" variant="body2">
            - in case of consent (by navigating on our Websites, clicking on a ticking box…). You may withdraw
            your consent at any time;
          </Typography>
          <Typography weight="light" variant="body2">
            - it is in our legitimate interest or a third party's legitimate interest to use personal
            information in such a way to ensure that we provide our services in the best way that we can;
          </Typography>
          <Typography weight="light" variant="body2">
            - it is our legal obligation to use your personal information to comply with any legal obligations
            imposed upon us.
          </Typography>
        </Block>
      </Section>
      <Title>Release of personal Information</Title>
      <Section>
        <Typography weight="light" variant="body2">
          Our commercial partners and companies (the “Third-Party Service Providers”) who work with us for
          management of our Websites, performance of our contracts with you, hosting of your data and
          provision of our business operations exclusively process your personal data within the scope of the
          missions entrusted to them. These Third-Party Service Providers may contact you directly using the
          personal data that you provided us or that we obtained lawfully from third parties. We strictly
          require from our Third-Party Service Providers that they process your personal in data in compliance
          with personal data applicable regulation and to implement appropriate measure to ensure security and
          confidentiality of your personal information.
        </Typography>
        <Typography weight="light" variant="body2">
          We may also release your information when we believe release is appropriate to comply with the law,
          protect ours rights, or if all or part of our assets is transferred to another company.
        </Typography>
        <Typography weight="light" variant="body2">
          Lastly, aggregated data, meaning non-identifiable data can be transferred to third parties for
          marketing, advertising or any other purpose.
        </Typography>
      </Section>
      <Title>Location of your personal information</Title>
      <Section>
        <Typography weight="light" variant="body2">
          IOV may transfer your personal information outside of the European Economic Area (EEA) to its
          subsidiaries and to external suppliers based outside of the EEA. The EEA comprises those countries
          that are in the European Union (EU) and some other countries that are considered to have adequate
          laws to ensure personal information is protected.
        </Typography>
        <Typography weight="light" variant="body2">
          When transferring your personal information outside of the EEA, IOV will (and will ensure that
          service providers acting on our behalf agree to) protect it from improper use or disclosure and
          ensure the same levels of protection are in place as are applied within the EEA.
        </Typography>
        <Typography weight="light" variant="body2">
          You hereby consent to the transfer of your personal data outside the European Union.
        </Typography>
      </Section>
      <Title>Updating and Correcting Information</Title>
      <Section>
        <Typography weight="light" variant="body2">
          When transferring your personal information outside of the EEA, IOV will (and will ensure that
          service providers acting on our behalf agree to) protect it from improper use or disclosure and
          ensure the same levels of protection are in place as are applied within the EEA.
        </Typography>
        <Block padding="sm" margin="sm">
          <Typography weight="light" variant="body2">
            -{" "}
            <Typography weight="semibold" variant="body2" inline>
              Access to your information
            </Typography>
            &nbsp;– You have the right to request a copy of your personal information that we hold.
          </Typography>
          <Typography weight="light" variant="body2">
            -{" "}
            <Typography weight="semibold" variant="body2" inline>
              Correcting your information
            </Typography>
            &nbsp;– IOV ensures to make sure that your personal information is accurate, complete and up to
            date. At any time, you may ask us to correct your personal information.
          </Typography>
          <Typography weight="light" variant="body2">
            -{" "}
            <Typography weight="semibold" variant="body2" inline>
              Deletion of your information
            </Typography>
            &nbsp;– You have the right to ask us to delete personal information about you where i) You
            consider that we no longer require the information for the purposes for which it was obtained or
            ii) our use of your personal information is contrary to law or our other legal obligations.
          </Typography>
          <Typography weight="light" variant="body2">
            -{" "}
            <Typography weight="semibold" variant="body2" inline>
              Oppose or restrict how we may use your information
            </Typography>
            &nbsp;– You may ask us to restrict how we use your personal information or oppose to such process.
            In this case, we may only use the relevant personal information with your consent, for legal
            claims or where there are other public interest grounds.
          </Typography>
          <Typography weight="light" variant="body2">
            -{" "}
            <Typography weight="semibold" variant="body2" inline>
              Opt-out to the reception of newsletters.
            </Typography>
            You may at any time decide to opt-out to the reception of our newsletters.
          </Typography>
          <Typography weight="light" variant="body2">
            -{" "}
            <Typography weight="semibold" variant="body2" inline>
              Right to data portability
            </Typography>
            &nbsp;– You have the right, in certain circumstances, to obtain personal information you have
            provided us with (in a structured, commonly used and machine-readable format) and to reuse it
            elsewhere or to ask us to transfer this to a third party of your choice (please note that this
            right is limited to the data you provided to us).
          </Typography>
        </Block>
        <Typography weight="light" variant="body2">
          These requests must be addressed by written request to IOV,
          <Link to="mailto:privacy@iov.one">privacy@iov.one</Link>
        </Typography>
        <Typography weight="light" variant="body2">
          If our answer is not satisfactory within the time limit set by the applicable law, you may lodge a
          complaint with the relevant data protection supervisory authority. however, because we keep track of
          past transactions, you cannot delete information associated with past transactions on the Websites.
          In addition, in may be impossible for us to completely delete all your information because we
          periodically backup information.
        </Typography>
      </Section>
      <Title>Security of Information</Title>
      <Section>
        <Typography weight="light" variant="body2">
          We take security seriously and take numerous precautions to protect the security of Personally
          Identifiable Information to protect the personal data that we have under our control from
          unauthorized access, improper use or disclosure, unauthorized modification and unlawful destruction
          or accidental loss.
        </Typography>
        <Typography weight="light" variant="body2">
          Unfortunately, no data transmission over the Internet or any wireless network can be guaranteed to
          be 100% secure. As a result, while we employ commercially reasonable security measures to protect
          data and seek to partner with companies which do the same, we cannot guarantee the security of any
          information transmitted to or from the Websites, and are not responsible for the actions of any
          third parties that may receive any such information.
        </Typography>
      </Section>
      <Title>Retention period</Title>
      <Section>
        <Typography weight="light" variant="body2">
          For visitors to the Websites, we will retain relevant personal information for at least three years
          from the date of our last interaction with you and in compliance with our obligations under the GDPR
          or similar legislation around the world, or for longer if we are required to do so according to our
          regulatory obligations.
        </Typography>
        <Typography weight="light" variant="body2">
          For service and product provision to any client, we will retain relevant personal information for at
          least five years from the date of our last interaction with you and in compliance with our
          obligations under the GDPR or similar legislation around the world, or for longer as we are required
          to do so according to our regulatory obligations. We may then destroy such files without further
          notice or liability.
        </Typography>
        <Typography weight="light" variant="body2">
          If you no longer want IOV to use your information to provide you with our products and services, you
          can close your account and IOV will delete the information it holds about you unless IOV needs to
          retain and use your information to comply with our legal obligations, to resolve disputes or to
          enforce our agreements.
        </Typography>
      </Section>
      <Title>Cookies</Title>
      <Section>
        <Typography weight="light" variant="body2">
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
        </Typography>
        <Block padding="sm" margin="sm">
          <Typography weight="light" variant="body2">
            - Internet Explorer : {addLinkTo("http://windows.microsoft.com/fr-FR/windows-vista/Block-or-allow-cookies")}
          </Typography>
          <Typography weight="light" variant="body2">
            - Chrome : {addLinkTo("http://support.google.com/chrome/bin/answer.py?hl=fr&hlrm=en&answer=95647")}
          </Typography>
          <Typography weight="light" variant="body2">
            - Firefox : {addLinkTo("http://support.mozilla.org/fr/kb/Activer et d%C3%A9sactiver les cookies")}
          </Typography>
          <Typography weight="light" variant="body2">
            - Safari : {addLinkTo("http://docs.info.apple.com/article.html?path=Safari/3.0/fr/9277.html")}
          </Typography>
        </Block>
        <Typography weight="light" variant="body2">
          Other Tracking Devices. We may use other industry standard technologies like pixel tags and web
          beacons to track your use of our Websites pages and promotions, or we may allow our Third Party
          Service Providers to use these devices on our behalf. Pixel tags and web beacons are tiny graphic
          images placed on certain pages on our Websites, or in our emails that allow us to determine whether
          you have performed a specific action. When you access these pages or open or click an email, pixel
          tags and web beacons generate a notice of that action. Pixel tags allow us to measure and improve
          our understanding of visitor traffic and behavior on our Websites, as well as give us a way to
          measure our promotions and performance. We may also utilize pixel tags and web beacons provided by
          our Affiliates and/or Marketing Partners for the same purposes.
        </Typography>
      </Section>
      <Title>Privacy Policies of Third-Party Websites</Title>
      <Section>For any request, please contact us at contact@iov.one</Section>
      <Title>Children</Title>
      <Section>For any request, please contact us at contact@iov.one</Section>
      <Title>Changes to Privacy Policy</Title>
      <Section>For any request, please contact us at contact@iov.one</Section>
      <Title>Contacting Us</Title>
      <Section>
        For further information about this policy, please contact{" "}
        <Link to="mailto:contact@iov.one">contact@iov.one</Link>
      </Section>
    </React.Fragment>
  );
};

export default withStyles(styles)(PolicyLayout);
