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
  Row,
  Column,
  Text,
} from "@react-email/components";
import React from "react";

type QuickWinEmailProps = {
  userName: string;
  productName: string;
  specificFeature: string;
  benefit: string;
  callToActionLink: string;
  headerLogoSrc: string;
  headerImageSrc: string;
  featureImageSrc: string; // New prop for feature image
};

const QuickWinEmail: React.FC<QuickWinEmailProps> = ({
  userName = "User",
  productName = "Product",
  specificFeature = "Try out our new dashboard feature",
  benefit = "streamline your workflow like never before",
  callToActionLink = "https://example.com/get-started",
  headerLogoSrc = "https://smartleadmagnet.com/wp-content/uploads/2024/10/3.png",
  headerImageSrc = "https://placehold.co/600x200",
  featureImageSrc = "https://placehold.co/300x150", // Default feature image
}) => {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Body className="bg-white p-4 sm:p-8">
          <Container
            className="mx-auto overflow-hidden rounded-lg border shadow-lg"
            style={{ maxWidth: "100%", width: "600px" }}
          >
            {/* Header Section */}
            <Section className="p-4 font-sans sm:p-8 bg-gray-900">
              <Img src={headerLogoSrc} alt={`${productName} Logo`} width="220" height="55" className="mx-auto" />
            </Section>
            <Img
              src={headerImageSrc}
              alt="Quick Win Image"
              style={{ width: "100%", maxWidth: "600px", height: "auto" }}
              className="mx-auto"
            />

            {/* Welcome Message */}
            <Section className="p-4 sm:p-8">
              <Heading as="h1" className="mb-4 text-xl font-bold sm:text-2xl">
                Here’s a Quick Win to Get Started Fast
              </Heading>
              <Text className="mb-4">
                Hi {userName},
              </Text>
              <Text className="mb-4">
                Ready to see {productName} in action? Let’s make it easy. Here’s a quick win you can achieve right now:
              </Text>
              <Text className="mb-4 font-semibold">{specificFeature}</Text>
              <Img
                src={featureImageSrc}
                alt="Feature Illustration"
                style={{ width: "100%", height: "auto", maxWidth: "400px", margin: "0 auto" }}
                className="mb-4"
              />
              <Text className="mb-4">
                You’ll {benefit}. Plus, it's just the beginning of what you can accomplish with {productName}!
              </Text>
              <Text className="mb-4">
                Click <Link href={callToActionLink} className="text-cyan-500">here</Link> to try it out now, and let us know how it goes—we love to hear from our users!
              </Text>

              <Text className="mt-4">
                Best,
                <br />
                [Your Name] & The {productName} Team
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

export default QuickWinEmail;

const footerHeading = {
  fontSize: "1.25rem",
  fontWeight: "bold",
  color: "#fff",
  marginTop: 0,
};
