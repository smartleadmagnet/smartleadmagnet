import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { Input } from "@smartleadmagnet/ui/components/ui/input";
import { Label } from "@smartleadmagnet/ui/components/ui/label";
import { useState } from "react";
import ReactQuill from "react-quill"; // Import React Quill
import "react-quill/dist/quill.snow.css"; // Import the Quill styles

export default function AutomatedEmailForm() {
  // State for form fields
  const [emailData, setEmailData] = useState({
    recipient: "",
    subject: "",
    content: "",
  });

  // Handle input change
  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setEmailData({...emailData, [name]: value});
  };

  // Handle rich text editor change
  const handleContentChange = (value: any) => {
    setEmailData({...emailData, content: value});
  };

  // Handle sending test email
  const handleSendTest = async () => {
    console.log("Sending test email with data:", emailData);
    // Here you would send a test email request, e.g., using fetch or axios
    // const response = await fetch('/api/send-test-email', {
    //   method: 'POST',
    //   body: JSON.stringify(emailData),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
  };

  return (
    <div className="w-full flex flex-col bg-white p-4 rounded-md">
      {/* Recipient Email Input */}
      <div className="form-control w-full mb-4">
        <Label className="text-sm font-semibold mb-[10px] block">
          Recipient Email
        </Label>
        <Input
          name="recipient"
          type="email"
          value={emailData.recipient}
          onChange={handleChange}
          placeholder="Enter recipient email"
          className="w-full"
          required
        />
      </div>

      {/* Subject Input */}
      <div className="form-control w-full mb-4">
        <Label className="text-sm font-semibold mb-[10px] block">
          Subject
        </Label>
        <Input
          name="subject"
          value={emailData.subject}
          onChange={handleChange}
          placeholder="Enter email subject"
          className="w-full"
          required
        />
      </div>

      {/* Email Content Rich Text Editor */}
      <div className="form-control w-full mb-4">
        <Label className="text-sm font-semibold mb-[10px] block">
          Email Content
        </Label>
        <ReactQuill
          value={emailData.content}
          onChange={handleContentChange}
          placeholder="Enter email content"
          theme="snow"
          className="w-full"
          modules={{
            toolbar: [
              [{header: [1, 2, false]}],
              ['bold', 'italic', 'underline', 'strike'],
              [{list: 'ordered'}, {list: 'bullet'}],
              ['link', 'image'],
              ['clean'], // Remove formatting button
            ],
          }}
        />
      </div>

      {/* Send Test Button */}
      <Button
        className="mt-4"
        onClick={handleSendTest}
      >
        Send Test
      </Button>
    </div>
  );
}
