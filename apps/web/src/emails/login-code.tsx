import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from "@react-email/components";
import * as React from "react";
interface LoginCodeEmailProps {
  loginCode: string;
}

export default function LoginCodeEmail({ loginCode }: LoginCodeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Use your login code to access SmartLeadMagnet. We prioritize your security and will never ask for sensitive
        information.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={coverSection}>
            <Section
              style={{
                backgroundColor: "#252f3d",
                padding: "20px 0",
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "center",
                width: "100%",
              }}
            >
              <Heading style={{ color: "#FFF" }}>SmartLeadMagnet</Heading>
            </Section>
            <Section style={upperSection}>
              <Section style={verificationSection}>
                <Text style={verifyText}>Your login code is:</Text>

                <Text style={codeText}>{loginCode}</Text>
                <Text style={validityText}>(This code is valid for 5 minutes)</Text>
                <Text style={validityText}>{`If you didn’t request this code, please disregard this email.`}</Text>
                <Text style={validityText}>Thank you for choosing SmartLeadMagnet.</Text>
              </Section>
            </Section>
            <Hr />
            <Section style={lowerSection}>
              <Text style={cautionText}>
                SmartLeadMagnet will never email you to request or verify your password, credit card information, or
                banking details.
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#fff",
  color: "#212121",
};

const container = {
  padding: "20px",
  margin: "0 auto",
  backgroundColor: "#eee",
};

const h1 = {
  color: "#333",
  textAlign: "center" as const,
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "15px",
};

const link = {
  color: "#2754C5",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  textDecoration: "underline",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

const imageSection = {
  backgroundColor: "#252f3d",
  display: "flex",
  padding: "20px 0",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row" as const,
  color: "#fff",
};

const coverSection = { backgroundColor: "#fff" };

const upperSection = { padding: "25px 35px" };

const lowerSection = { padding: "25px 35px" };

const verifyText = {
  ...text,
  margin: 0,
  fontWeight: "bold",
  textAlign: "center" as const,
};

const codeText = {
  ...text,
  fontWeight: "bold",
  fontSize: "36px",
  margin: "20px 0",
  textAlign: "center" as const,
};

const validityText = {
  ...text,
  margin: "0px",
  marginTop: "10px",
  textAlign: "center" as const,
};

const verificationSection = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const cautionText = { ...text, margin: "0px" };
