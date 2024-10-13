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

type WelcomeEmailProps = {
  userName: string;
  companyName: string;
  loginLink: string;
  headerLogoSrc: string;
  headerImageSrc: string;
  footerImageSrc: string;
  instagramUrl: string;
  facebookUrl: string;
  privacyPolicyUrl: string;
  termsOfServiceUrl: string;
  helpCenterUrl: string;
  unsubscribeUrl: string;
};

const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
  userName = "User",
  companyName = "Our Company",
  loginLink = "https://example.com/login",
  headerLogoSrc = "https://placehold.co/100x100",
  headerImageSrc = "https://placehold.co/600x300",
  footerImageSrc = "https://placehold.co/600x100",
  instagramUrl = "https://instagram.com",
  facebookUrl = "https://facebook.com",
  privacyPolicyUrl = "https://example.com/privacy-policy",
  termsOfServiceUrl = "https://example.com/terms-of-service",
  helpCenterUrl = "https://example.com/help-center",
  unsubscribeUrl = "https://example.com/unsubscribe",
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
            <Img src={headerLogoSrc} alt={`${companyName} Logo`} width="100" height="100" className="mx-auto" />
            <Img
              src={headerImageSrc}
              alt="Welcome Image"
              style={{ width: "100%", maxWidth: "600px", height: "auto" }}
            />
            <Section className="p-4 sm:p-8">
              <Heading as="h1" className="mb-4 text-xl font-bold sm:text-2xl">
                Welcome, {userName}!
              </Heading>
              <Text className="mb-4">
                Thank you for joining {companyName}. We are thrilled to have you on board and can&apos;t wait for you to
                explore our features and community.
              </Text>
              <Button href={loginLink} className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
                Log in to Your Account
              </Button>
              <Text className="mt-4">
                If you have any questions or need assistance, our support team is here for you.
              </Text>
              <Text className="mt-4">
                Best Wishes,
                <br />
                The {companyName} Team
              </Text>
            </Section>
            <Img src={footerImageSrc} alt="Footer Image" style={{ width: "100%", maxWidth: "600px", height: "auto" }} />
            <Section className="bg-gray-200 p-4 text-center">
              <Link href={instagramUrl} className="mx-2">
                Instagram
              </Link>
              <Link href={facebookUrl} className="mx-2">
                Facebook
              </Link>
              <Container className="mt-4 text-xs">
                <Text className="mb-2">© 2023 {companyName}. All rights reserved.</Text>
                <Text>
                  You are receiving this email because you registered to join {companyName}. If you no longer want to
                  receive emails from us, you can unsubscribe at any time.
                </Text>
                <Link href={privacyPolicyUrl} className="underline">
                  Privacy policy
                </Link>
                {" • "}
                <Link href={termsOfServiceUrl} className="underline">
                  Terms of service
                </Link>
                {" • "}
                <Link href={helpCenterUrl} className="underline">
                  Help center
                </Link>
                {" • "}
                <Link href={unsubscribeUrl} className="underline">
                  Unsubscribe
                </Link>
              </Container>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeEmail;

// Example of how to use the WelcomeEmail component
// const emailProps: WelcomeEmailProps = {
//     userName: 'Lokachi',
//     companyName: 'CIRCO',
//     loginLink: 'https://example.com/login',
//     headerLogoSrc: 'https://placehold.co/100x100',
//     headerImageSrc: 'https://placehold.co/600x300',
//     footerImageSrc: 'https://placehold.co/600x100',
//     instagramUrl: 'https://instagram.com',
//     facebookUrl: 'https://facebook.com',
//     privacyPolicyUrl: 'https://example.com/privacy-policy',
//     termsOfServiceUrl: 'https://example.com/terms-of-service',
//     helpCenterUrl: 'https://example.com/help-center',
//     unsubscribeUrl: 'https://example.com
