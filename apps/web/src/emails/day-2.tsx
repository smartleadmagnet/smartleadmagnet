import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Section,
  Tailwind,
  Text,
  Column,
  Row,
  Font,
  Preview,
} from "@react-email/components";
import React from "react";

type BenefitsReminderEmailProps = {
  name: string;
};

const Day2: React.FC<BenefitsReminderEmailProps> = ({ name = "User" }) => {
  return (
    <Html>
      <Tailwind>
        <Head>
          <Font
            fontFamily="Open Sans"
            fallbackFontFamily="Arial"
            webFont={{
              url: "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap",
              format: "woff2",
            }}
            fontWeight={400}
            fontStyle="normal"
          />
        </Head>
        <Preview>SmartLeadMagnet is your key to growing your audience effortlessly.</Preview>
        <Body className="bg-white p-4 sm:p-8">
          <Container
            className="mx-auto overflow-hidden rounded-lg border shadow-lg"
            style={{ maxWidth: "100%", width: "600px" }}
          >
            {/* Message */}
            <Section className="p-4 sm:p-8">
              <Text className="mb-4">Hi {name},</Text>
              <Text className="mb-4">
                If you haven’t started creating your lead magnets yet, this is a great moment to do so!
              </Text>
              <Text className="mb-4">
                SmartLeadMagnet helps you capture more leads and grow your audience effortlessly. Whether you run a
                business, a startup, or an agency, our AI-powered tool simplifies creating lead magnets that resonate
                with your visitors.
              </Text>

              {/* CTA Button */}
              <Button
                href="https://smartleadmagnet.com"
                className="w-[90%] rounded bg-cyan-500 px-5 py-3 text-center font-bold text-white hover:bg-cyan-700"
              >
                Build Your Lead Magnet
              </Button>

              {/* Support Text */}
              <Text className="mt-4">Need assistance? We’re just a message away!</Text>
              <Text className="mt-4">
                Best regards,
                <br />
                The SmartLeadMagnet Team
              </Text>
            </Section>

            {/* Footer Section */}
            <Section className="bg-gray-900 p-[20px] text-center text-white">
              <Row>
                <Text style={footerHeading}>Stay Connected</Text>
              </Row>
              <Row align="center" style={{ width: "104px" }}>
                <Column style={{ paddingRight: "10px" }}>
                  <Link href="https://twitter.com/dcoderai">
                    <Img width="28" height="28" src="https://d3uu14lxe8399z.cloudfront.net/twitter-white.png" />
                  </Link>
                </Column>
                <Column style={{ paddingRight: "10px" }}>
                  <Link href="https://linkedin.com">
                    <Img width="28" height="28" src="https://d3uu14lxe8399z.cloudfront.net/linkedin.png" />
                  </Link>
                </Column>
              </Row>
            </Section>

            {/* Copyright and Terms */}
            <Section className="p-[5px] text-center text-white">
              <Text className="text-center text-sm text-gray-500">© 2024 SmartLeadMagnet. All rights reserved.</Text>
              <Text className="text-center text-sm text-gray-500">
                Explore your potential with our AI-powered solutions.
              </Text>
              <Text className="text-center text-sm text-gray-500">
                <Link href="/privacy-policy" className="text-blue-500">
                  Privacy Policy
                </Link>{" "}
                {" | "}
                <Link href="/terms-and-conditions" className="text-blue-500">
                  Terms of Service
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default Day2;

const footerHeading = {
  fontSize: "1.25rem",
  fontWeight: "bold",
  color: "#fff",
  marginTop: 0,
};