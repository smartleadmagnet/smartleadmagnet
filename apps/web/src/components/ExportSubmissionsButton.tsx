"use client";
import React from "react";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { LeadMagnetUsage } from "@smartleadmagnet/database";
import { format } from "date-fns";

// Helper function to generate CSV
const generateCSV = (data: LeadMagnetUsage[]) => {
  const headers = ["IP Address", "Webhook Status", "Email Sent", "Submitted At", "Payload"];
  const csvRows = [
    headers.join(","), // Headers row
    ...data.map((row) => {
      const submittedAt = format(new Date(row.consumedAt), "yyyy-MM-dd");
      return [
        row.ipAddress,
        row.webhookStatus,
        row.emailSent ? "Sent" : "Not Sent",
        submittedAt,
        JSON.stringify(row.payload), // Payload as a JSON string
      ].join(","); // Join each row data with a comma
    }),
  ];
  return csvRows.join("\n"); // Join rows with newline
};

// Function to download the CSV file
const downloadCSV = (csvData: string, filename: string) => {
  const blob = new Blob([csvData], { type: "text/csv" });
  const url = window?.URL?.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", filename);
  a.click();
};

interface ExportSubmissionsButtonProps {
  usageData: LeadMagnetUsage[];
  leadMagnetName: string;
}

const ExportSubmissionsButton: React.FC<ExportSubmissionsButtonProps> = ({ usageData, leadMagnetName }) => {
  const handleExportSubmissions = () => {
    const csvData = generateCSV(usageData);
    downloadCSV(csvData, `${leadMagnetName || "submissions"}-export.csv`);
  };

  return (
    <Button className="btn-primary" onClick={handleExportSubmissions}>
      Export Submissions
    </Button>
  );
};

export default ExportSubmissionsButton;
