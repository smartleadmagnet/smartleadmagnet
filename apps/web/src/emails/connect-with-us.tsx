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
} from "@react-email/components";
import React from "react";

type ConnectWithUsEmailProps = {
  userName: string;
  productName: string;
  socialMediaLinks: { platform: string; url: string }[];
  communityLink: string;
  newsletterLink: string;
  headerLogoSrc: string;
  headerImageSrc: string;
};

const ConnectWithUsEmail: React.FC<ConnectWithUsEmailProps> = ({
  userName = "User",
  productName = "Product",
  socialMediaLinks = [
    { platform: "Facebook", url: "https://facebook.com" },
    { platform: "Twitter", url: "https://twitter.com" },
    { platform: "LinkedIn", url: "https://linkedin.com" },
  ],
  communityLink = "https://example.com/community",
  newsletterLink = "https://example.com/newsletter",
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
              alt="Quick Win Image"
              style={{ width: "100%", maxWidth: "600px", height: "auto" }}
              className="mx-auto"
            />

            {/* Main Content */}
            <Section className="p-4 sm:p-8">
              <Heading as="h1" className="mb-4 text-xl font-bold sm:text-2xl">
                Connect with Us & Join Our Community
              </Heading>
              <Text className="mb-4">
                Hi {userName},
              </Text>
              <Text className="mb-4">
                We’d love to stay connected with you! Join our vibrant {productName} community where you can get tips, share feedback, and connect with other users:
              </Text>

              {/* Social Media Links */}
              <Text className="mb-4">
                Follow us on:
                <ul className="list-disc pl-5">
                  {socialMediaLinks.map((link) => (
                    <li key={link.platform}>
                      <Link href={link.url} className="text-cyan-500">
                        {link.platform}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Text>

              <Text className="mb-4">
                Join our <Link href={communityLink} className="text-cyan-500">Community Group</Link> or <Link href={newsletterLink} className="text-cyan-500">Newsletter</Link> for exclusive updates!
              </Text>

              <Text className="mt-4">
                We’re committed to helping you succeed with {productName}. Let’s stay in touch!
              </Text>

              <Text className="mt-4">
                Warm regards,
                <br />
                The {productName} Team
              </Text>
            </Section>

            {/* Footer Section */}
            <Section className="bg-gray-900 p-[20px] text-white text-center">
            <Text className="text-center text-sm text-gray-500">
                  © 2024 {productName}. All rights reserved.
                </Text>
                <Text className="text-center text-sm text-gray-500">
                  Explore your potential with our AI-powered solutions.
                </Text>
                <Text className="text-center text-sm text-gray-500">
                  <Link href="/privacy-policy" className="text-white">Privacy Policy</Link> {" | "}
                  <Link href="/terms" className="text-white">Terms of Service</Link>
                </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ConnectWithUsEmail;
