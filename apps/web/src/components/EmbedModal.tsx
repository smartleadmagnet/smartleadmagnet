import React, { useState } from "react";
import Icon from "@smartleadmagnet/ui/components/icon";

interface EmbedModalProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
}

const EmbedModal = (props: EmbedModalProps) => {
  const { open, setIsOpen } = props;
  const [activeTab, setActiveTab] = useState<'embed' | 'share'>('embed');

  const toggleModal = () => {
    setIsOpen(!open);
  };

  const handleTabChange = (tab: 'embed' | 'share') => {
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
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={toggleModal}
        >
          {/* Modal Content */}
          <div
            className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()} // Prevent closing on content click
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 p-1 text-white"
              onClick={toggleModal}
            >
              <Icon name="close" />
            </button>

            {/* Modal Title with Gradient Background */}
            <div className="text-center mb-6">
              <div className="modal-header inline-flex items-center justify-center w-full py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-t-lg">
                <h2 className="text-2xl font-semibold">Embed/Share</h2>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex mb-4">
              <button
                className={`px-4 py-2 mr-2 rounded-md ${
                  activeTab === 'embed'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => handleTabChange('embed')}
              >
                Embed Code
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  activeTab === 'share'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => handleTabChange('share')}
              >
                Share Link
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'embed' ? (
              <div>
                <h3 className="text-lg font-medium mb-2">Embed Code</h3>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={3}
                  readOnly
                  value={embedCode}
                />
                <button
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                  onClick={() => copyToClipboard(embedCode)}
                >
                  Copy Code
                </button>
                <p className="text-gray-500 mt-2">
                  Copy the above iframe code to embed this content.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium mb-2">Share Link</h3>
                <input
                  className="w-full p-2 border border-gray-300 rounded-md"
                  type="text"
                  readOnly
                  value={shareLink}
                />
                <button
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                  onClick={() => copyToClipboard(shareLink)}
                >
                  Copy Link
                </button>

                {/* Social Media Icons */}
                <div className="flex mt-4 space-x-4">
                  <Icon name="facebook"  />
                  <Icon name="twitter" />
                  <Icon name="linkedin"  />
                  <Icon name="whatsapp"  />
                  <Icon name="email"  />
                </div>
                <p className="text-gray-500 mt-2">
                  Share this link to give others access.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EmbedModal;
