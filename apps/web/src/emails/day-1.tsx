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

type WelcomeEmailProps = {
  name: string;
};

const Day1: React.FC<WelcomeEmailProps> = ({ name = "User" }) => {
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
        <Preview>See how easy it is to build personalized lead magnets with SmartLeadMagnet.</Preview>
        <Body className="bg-white p-4 sm:p-8">
          <Container
            className="mx-auto overflow-hidden rounded-lg border shadow-lg"
            style={{ maxWidth: "100%", width: "600px" }}
          >
            {/* Welcome Message */}
            <Section className="p-4 sm:p-8">
              <Text className="mb-4">Hi {name}!</Text>
              <Text className="mb-4">
                Did you know that with SmartLeadMagnet, you can create lead magnets that truly connect with your
                audience?
              </Text>
              <Text className="mb-4">
                Our tool leverages AI to help you design and deliver high-converting lead magnets effortlessly. Here’s
                what makes SmartLeadMagnet stand out:
              </Text>

              {/* Features Section */}
              <Text className="mb-4">
                • <strong>Drag-and-drop simplicity:</strong> Build lead magnets without any coding or design experience.
              </Text>
              <Text className="mb-4">
                • <strong>Personalization:</strong> Create content that speaks directly to your website visitors.
              </Text>
              <Text className="mb-4">
                • <strong>Conversion-focused:</strong> Capture more leads by offering the right content at the right
                time.
              </Text>

              {/* CTA Button */}
              <Button
                href="https://smartleadmagnet.com"
                className="w-[90%] rounded bg-cyan-500 px-5 py-3 text-center font-bold text-white hover:bg-cyan-700"
              >
                Start Building
              </Button>

              {/* Support Text */}
              <Text className="mt-4">We can’t wait to see what you create!</Text>
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
                  <Link href="https://www.facebook.com/people/Smartleadmagnet/61567550700439/">
                    <Img width="28" height="28" src="https://d3uu14lxe8399z.cloudfront.net/facebook.png" />
                  </Link>
                </Column>
                <Column style={{ paddingRight: "10px" }}>
                  <Link href="https://www.youtube.com/channel/UCsYNmeoFcdVw37w_-xd4h3A">
                    <Img width="28" height="28" src="https://d3uu14lxe8399z.cloudfront.net/youtube_icon.png" />
                  </Link>
                </Column>
                <Column style={{ paddingRight: "10px" }}>
                  <Link href="https://github.com/smartleadmagnet/smartleadmagnet">
                    <Img width="28" height="28" src="https://d3uu14lxe8399z.cloudfront.net/github.png" />
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
                <Link href="https://smartleadmagnet.com/privacy-policy" className="text-blue-500">
                  Privacy Policy
                </Link>{" "}
                {" | "}
                <Link href="https://smartleadmagnet.com/terms-and-conditions" className="text-blue-500">
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

export default Day1;

const footerHeading = {
  fontSize: "1.25rem",
  fontWeight: "bold",
  color: "#fff",
  marginTop: 0,
};
