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

type ConfirmSignupEmailProps = {
  userName: string;
  productName: string;
  confirmEmailLink: string;
  headerLogoSrc: string;
  headerImageSrc: string;
  footerImageSrc: string;
  productFunctionality: string;
};




const ConfirmSignupEmail: React.FC<ConfirmSignupEmailProps> = ({
  userName = "User",
  productName = "Product",
  confirmEmailLink = "https://example.com/confirm-email",
  headerLogoSrc = "https://smartleadmagnet.com/wp-content/uploads/2024/10/3.png",
  headerImageSrc = "https://d3uu14lxe8399z.cloudfront.net/confirm_email.png",
  footerImageSrc = "https://placehold.co/600x100",
  productFunctionality = "Your Product's Functionality",

}) => {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Body className="bg-white p-4 sm:p-8 ">
          <Container
            className="mx-auto overflow-hidden rounded-lg border  shadow-lg"
            style={{ maxWidth: "100%", width: "600px" }}
          >
            <Section className="p-4 font-sans sm:p-8 bg-gray-900">
            <Img src={headerLogoSrc} alt={`${productName} Logo`} width="220" height="55" className="mx-auto"  />
            </Section>
            <Img
              src={headerImageSrc}
              alt="Confirm Signup Image"
              style={{ width: "200px", maxWidth: "200px", height: "auto" }}
              className="mt-5 mx-auto"
            />
         

            <Section className="p-2 sm:p-8">
            
              <Heading as="h1" className="mb-4 text-xl font-bold sm:text-2xl">
                You're Almost There, {userName}!
              </Heading>
              <Text className="mb-4">
                Thank you for signing up for {productName}! 🚀 We're thrilled to have you on board.
                Before we dive into all the amazing things you can do with {productName}, please confirm your email by clicking the button below:
              </Text>

              <Button
    href={confirmEmailLink}
    className="rounded bg-cyan-500 px-5 py-3 font-bold text-white hover:bg-cyan-700 w-[90%] text-center"
  >
    Confirm Email
  </Button>
              
              <Text className="mt-4">
                Once confirmed, you'll have full access to all the features we offer. Welcome to the future of {productFunctionality}!
              </Text>
              <Text className="mt-4">
                Best,
                <br />
                The {productName} Team
              </Text>
            </Section>
            <Section className="bg-gray-900 p-[20px] text-white text-center">
          <Row >
            <Text style={footerHeading} >Stay in Touch</Text>
          </Row>
          <Row
            align="center"
            style={{
              width: "104px",
              
              
            }}
          >
            <Column style={{ paddingRight: "10px" }}>
              <Link href="#">
                <Img
                  width="28"
                  height="28"
                  src="https://d3uu14lxe8399z.cloudfront.net/facebook.png"
                />
              </Link>
            </Column>
            <Column style={{ paddingRight: "10px" }}>
              <Link href="https://notifications.google.com">
                <Img
                  width="28"
                  height="28"
                  src="https://d3uu14lxe8399z.cloudfront.net/twitter-white.png"
                />
              </Link>
            </Column>
            <Column style={{ paddingRight: "10px" }}>
              <Link href="https://notifications.google.com">
                <Img
                  width="28"
                  height="28"
                  src="https://d3uu14lxe8399z.cloudfront.net/linkedin.png"
                />
              </Link>
            </Column>
          </Row>
        </Section>
        <Section className=" p-[5px] text-white text-center">
        <Text className="text-center text-sm text-gray-500">
        © 2024 SmartLeadMagnet. All rights reserved.
      </Text>
      <Text className="text-center text-sm text-gray-500">
        Boost your conversions with AI-powered lead magnets.
      </Text>
      <Text className="text-center text-sm text-gray-500">
        <a href="/privacy-policy" className="text-blue-500">Privacy Policy</a> {"  "}
        <a href="/terms" className="text-blue-500">Terms of Service</a>
      </Text>
          </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ConfirmSignupEmail;



const footerHeading = {
  fontSize: "1.25rem",
  fontWeight: "bold",
  color: "#fff",
  marginTop:0

}