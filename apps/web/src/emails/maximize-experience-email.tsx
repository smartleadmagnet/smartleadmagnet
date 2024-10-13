import {
  Body,
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

type MaximizeExperienceEmailProps = {
  userName: string;
  productName: string;
  mainBenefit: string;
  feature1: string;
  feature1Description: string;
  feature1Image: string;
  feature2: string;
  feature2Description: string;
  feature2Image: string;
  feature3: string;
  feature3Description: string;
  feature3Image: string;
  supportTeamLink: string;
  headerLogoSrc: string;
  headerImageSrc: string;
};

const MaximizeExperienceEmail: React.FC<MaximizeExperienceEmailProps> = ({
  userName = "User",
  productName = "Product",
  mainBenefit = "achieve your goals more efficiently",
  feature1 = "Feature 1",
  feature1Description = "Enhances your ability to manage tasks effectively.",
  feature1Image = "https://placehold.co/100x100",
  feature2 = "Feature 2",
  feature2Description = "Saves you valuable time by automating routine tasks.",
  feature2Image = "https://placehold.co/100x100",
  feature3 = "Feature 3",
  feature3Description = "Streamlines your workflow for maximum productivity.",
  feature3Image = "https://placehold.co/100x100",
  supportTeamLink = "https://example.com/support",
  headerLogoSrc = "https://smartleadmagnet.com/wp-content/uploads/2024/10/3.png",
  headerImageSrc = "https://placehold.co/600x200",
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
                          alt="Welcome to the Product Image"
                          className="mx-auto w-full"
                      />
                      
                      {/* Welcome Message */}
                      <Section className="p-4 sm:p-8">
                          <Heading as="h1" className="mb-4 text-xl font-bold sm:text-2xl">
                              Maximize Your {productName} Experience
                          </Heading>
                          <Text className="mb-4">
                              Hey {userName}, 
                          </Text>
                          <Text className="mb-4">
                              Now that you're all set up, it's time to make the most of {productName}. Here are the top features that will help you {mainBenefit}:
                          </Text>

                          {/* Feature Highlights */}
                          <Row className="mb-4">
                              <Column className="flex-1 p-2">
                                  <Img src={feature1Image} alt={feature1} className="mx-auto mb-2" />
                                  <Text className="font-semibold">{feature1}:</Text>
                                  <Text>{feature1Description}</Text>
                              </Column>
                              <Column className="flex-1 p-2">
                                  <Img src={feature2Image} alt={feature2} className="mx-auto mb-2" />
                                  <Text className="font-semibold">{feature2}:</Text>
                                  <Text>{feature2Description}</Text>
                              </Column>
                              <Column className="flex-1 p-2">
                                  <Img src={feature3Image} alt={feature3} className="mx-auto mb-2" />
                                  <Text className="font-semibold">{feature3}:</Text>
                                  <Text>{feature3Description}</Text>
                              </Column>
                          </Row>

                          {/* Support CTA */}
                          <Text className="mt-4">
                              Need a hand? Our <Link href={supportTeamLink} className="text-cyan-500">Support Team</Link> is always ready to help you. Dive in and explore all that {productName} can do for you today!
                          </Text>

                          <Text className="mt-4">
                              Best,
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

export default MaximizeExperienceEmail;

const footerHeading = {
  fontSize: "1.25rem",
  fontWeight: "bold",
  color: "#fff",
  marginTop: 0,
};
