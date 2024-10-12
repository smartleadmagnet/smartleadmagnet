import React, { useState } from "react";
import Icon from "@smartleadmagnet/ui/components/icon";

interface EmbedModalProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
}

const EmbedModal = (props: EmbedModalProps) => {
  const { open, setIsOpen } = props;
  const [activeTab, setActiveTab] = useState<"embed" | "share">("embed");

  const toggleModal = () => {
    setIsOpen(!open);
  };

  const handleTabChange = (tab: "embed" | "share") => {
    setActiveTab(tab);
  };

  const embedCode = `<iframe src="https://example.com/embed" width="600" height="400"></iframe>`;
  const shareLink = "https://example.com/share";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      {/* Modal Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={toggleModal}
        >
          {/* Modal Content */}
          <div
            className="relative w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevent closing on content click
          >
            {/* Close Button */}
            <button className="absolute right-4 top-4 p-1 text-white" onClick={toggleModal}>
              <Icon name="close" />
            </button>

            {/* Modal Title with Gradient Background */}
            <div className="mb-6 text-center">
              <div className="modal-header inline-flex w-full items-center justify-center rounded-t-lg bg-gradient-to-r from-orange-500 to-pink-500 py-4 text-white">
                <h2 className="text-2xl font-semibold">Embed/Share</h2>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="mb-4 flex">
              <button
                className={`mr-2 rounded-md px-4 py-2 ${
                  activeTab === "embed" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => handleTabChange("embed")}
              >
                Embed Code
              </button>
              <button
                className={`rounded-md px-4 py-2 ${
                  activeTab === "share" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => handleTabChange("share")}
              >
                Share Link
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "embed" ? (
              <div>
                <h3 className="mb-2 text-lg font-medium">Embed Code</h3>
                <textarea
                  className="w-full rounded-md border border-gray-300 p-2"
                  rows={3}
                  readOnly
                  value={embedCode}
                />
                <button
                  className="mt-2 rounded-md bg-blue-500 px-4 py-2 text-white"
                  onClick={() => copyToClipboard(embedCode)}
                >
                  Copy Code
                </button>
                <p className="mt-2 text-gray-500">Copy the above iframe code to embed this content.</p>
              </div>
            ) : (
              <div>
                <h3 className="mb-2 text-lg font-medium">Share Link</h3>
                <input
                  className="w-full rounded-md border border-gray-300 p-2"
                  type="text"
                  readOnly
                  value={shareLink}
                />
                <button
                  className="mt-2 rounded-md bg-blue-500 px-4 py-2 text-white"
                  onClick={() => copyToClipboard(shareLink)}
                >
                  Copy Link
                </button>

                {/* Social Media Icons */}
                <div className="mt-4 flex space-x-4">
                  <Icon name="facebook" />
                  <Icon name="twitter" />
                  <Icon name="linkedin" />
                  <Icon name="whatsapp" />
                  <Icon name="email" />
                </div>
                <p className="mt-2 text-gray-500">Share this link to give others access.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EmbedModal;
