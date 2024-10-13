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
} from "@react-email/components";
import React from "react";

type WelcomeEmailProps = {
  userName: string;
  productName: string;
  keyBenefits: string;
  step1: string;
  step2: string;
  step3: string;
  helpCenterLink: string;
  headerLogoSrc: string;
  headerImageSrc: string;
};

const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
  userName = "User",
  productName = "Product",
  keyBenefits = "boost your productivity like never before.",
  step1 = "Login into yout account and start crete your first lead magnet.",
  step2 = "Customize your lead magnet with your brand colors and logo.",
  step3 = "Connect with a huge variety of LLM providers and start growing your leads.",
  helpCenterLink = "https://example.com/help-center",
  headerLogoSrc = "https://smartleadmagnet.com/wp-content/uploads/2024/10/3.png",
  headerImageSrc = "https://placehold.co/600x200",
}) => {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Body className="bg-white p-4 sm:p-8">
          <Container
            className="mx-auto overflow-hidden rounded-lg border  shadow-lg"
            style={{ maxWidth: "100%", width: "600px" }}
          >
            {/* Header Section */}
            <Section className="p-4 font-sans sm:p-8 bg-gray-900">
              <Img src={headerLogoSrc} alt={`${productName} Logo`} width="220" height="55" className="mx-auto" />
            </Section>
            <Img
              src={headerImageSrc}
              alt="Welcome to the Product Image"
              className="mx-auto  w-full"
            />
            
            {/* Welcome Message */}
            <Section className="p-4 sm:p-8">
              <Heading as="h1" className="mb-4 text-xl font-bold sm:text-2xl">
                Welcome to {productName}, {userName}! 🎉
              </Heading>
              <Text className="mb-4">
                We're thrilled you're here! Thanks for joining the {productName} community. With {productName}, you’ll {keyBenefits}.
              </Text>
              
              {/* Steps to Get Started */}
              <Heading as="h2" className="mb-4 text-lg font-semibold">
                Here's how to get started:
              </Heading>
              <Text className="mb-4">1. {step1}</Text>
              <Text className="mb-4">2. {step2}</Text>
              <Text className="mb-4">3. {step3}</Text>

              {/* CTA Button */}
              <Button
                href={helpCenterLink}
                className="rounded bg-cyan-500 px-5 py-3 font-bold text-white hover:bg-cyan-700 w-[90%] text-center"
              >
                Visit the Help Center
              </Button>

              {/* Support Text */}
              <Text className="mt-4">
                Need help? Feel free to check out our <Link href={helpCenterLink} className="text-cyan-500">Help Center</Link> or reply directly to this email—we're here to assist you!
              </Text>
              <Text className="mt-4">
                Let's make great things happen together!
              </Text>
              <Text className="mt-4">
                Cheers,
                <br />
                The {productName} Team
              </Text>
            </Section>
            
            {/* Footer Section */}
            <Section className="bg-gray-900 p-[20px] text-white text-center">
              <Row>
                <Text style={footerHeading}>Stay Connected</Text>
              </Row>
              <Row align="center" style={{ width: "104px" }}>
                <Column style={{ paddingRight: "10px" }}>
                  <Link href="https://facebook.com">
                    <Img
                      width="28"
                      height="28"
                      src="https://d3uu14lxe8399z.cloudfront.net/facebook.png"
                    />
                  </Link>
                </Column>
                <Column style={{ paddingRight: "10px" }}>
                  <Link href="https://twitter.com">
                    <Img
                      width="28"
                      height="28"
                      src="https://d3uu14lxe8399z.cloudfront.net/twitter-white.png"
                    />
                  </Link>
                </Column>
                <Column style={{ paddingRight: "10px" }}>
                  <Link href="https://linkedin.com">
                    <Img
                      width="28"
                      height="28"
                      src="https://d3uu14lxe8399z.cloudfront.net/linkedin.png"
                    />
                  </Link>
                </Column>
              </Row>
            </Section>

            {/* Copyright and Terms */}
            <Section className="p-[5px] text-white text-center">
              <Text className="text-center text-sm text-gray-500">
                © 2024 {productName}. All rights reserved.
              </Text>
              <Text className="text-center text-sm text-gray-500">
                Explore your potential with our AI-powered solutions.
              </Text>
              <Text className="text-center text-sm text-gray-500">
                <Link href="/privacy-policy" className="text-blue-500">Privacy Policy</Link> {" | "}
                <Link href="/terms" className="text-blue-500">Terms of Service</Link>
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
