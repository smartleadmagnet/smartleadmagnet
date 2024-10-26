import {
  Body,
  Button,
  Container,
  Head,
  Heading,
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
  userName: string;
  productName?: string;
  step1?: string;
  step2?: string;
  step3?: string;
};

const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
  userName = "User",
  productName = "SmartLeadMagnet",
  step1 = "Begin your journey by logging in and start building your lead magnet.",
  step2 = "Customize your lead magnet with content that resonates with your audience.",
  step3 = "Watch as SmartLeadMagnet captures more leads and boosts your conversions.",
}) => {
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
        <Preview>Start building personalized lead magnets effortlessly with our drag-and-drop tool.</Preview>
        <Body className="bg-white p-4 sm:p-8">
          <Container
            className="mx-auto overflow-hidden rounded-lg border shadow-lg"
            style={{ maxWidth: "100%", width: "600px" }}
          >
            {/* Header Section */}
            {/*<Section className="bg-gray-900 p-4 font-sans sm:p-8">*/}
            {/*  <Img src={headerLogoSrc} alt={`${productName} Logo`} width="220" height="55" className="mx-auto" />*/}
            {/*</Section>*/}

            {/* Welcome Message */}
            <Section className="p-4 sm:p-8">
              <Heading as="h2" className="mb-4 text-xl font-bold sm:text-2xl">
                Hi {userName}!
              </Heading>
              <Text className="mb-4 text-base">
                Welcome to {productName}, {userName}! 🎉
              </Text>
              <Text className="mb-4">
                You’ve taken the first step toward creating powerful, personalized lead magnets for your website. With{" "}
                {productName}, you’ll be able to build customized lead magnets in minutes – no technical skills
                required!
              </Text>

              {/* Steps to Get Started */}
              <Heading as="h2" className="mb-4 text-lg font-semibold">
                To get started:
              </Heading>
              <Text className="mb-4">1. {step1}</Text>
              <Text className="mb-4">2. {step2}</Text>
              <Text className="mb-4">3. {step3}</Text>

              {/* CTA Button */}
              <Button
                href="https://smartleadmagnet.com"
                className="w-[90%] rounded bg-cyan-500 px-5 py-3 text-center font-bold text-white hover:bg-cyan-700"
              >
                Start Creating
              </Button>

              {/* Support Text */}
              <Text className="mt-4">If you need help or have questions, please contact us.</Text>
              <Text className="mt-4">
                Best regards,
                <br />
                The {productName} Team
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

export default WelcomeEmail;

const footerHeading = {
  fontSize: "1.25rem",
  fontWeight: "bold",
  color: "#fff",
  marginTop: 0,
};
