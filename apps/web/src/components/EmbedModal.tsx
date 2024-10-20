import React, { useState } from "react";
import { BsFacebook, BsTwitterX, BsWhatsapp, BsLinkedin } from "react-icons/bs";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard.tsx";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@smartleadmagnet/ui/components/ui/dialog";
import { CopyIcon, CheckIcon,X } from "lucide-react"; // Icons from lucide-react
import { FaWordpress, FaShopify, FaHubspot } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

interface EmbedModalProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
  magnetId: string;
}

const EmbedModal = (props: EmbedModalProps) => {
  const { open, setIsOpen, magnetId } = props;
  const [activeTab, setActiveTab] = useState<"embed" | "share">("embed");
  const [copy, isCopied] = useCopyToClipboard();

  const toggleModal = () => {
    setIsOpen(!open);
  };

  const handleTabChange = (tab: "embed" | "share") => {
    setActiveTab(tab);
  };

  const embedCode = `<iframe src="${process.env.NEXT_PUBLIC_SITE_URL}/share/${magnetId}"
  width="400" height="992"
  style="border-radius:0.5rem;border:none;" 
  loading="lazy"
  referrerpolicy="unsafe-url" 
  allow="clipboard-read; 
  clipboard-write"
  ></iframe>`;

  const shareLink = `${process.env.NEXT_PUBLIC_SITE_URL}/share/${magnetId}`;

  

  const shareOnFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`;
    window.open(shareUrl, "_blank", "width=600,height=400,top=50%,left=50%,transform=translate(-50%,-50%)");
  };

  const shareOnTwitter = () => {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareLink)}`;
    window.open(shareUrl, "_blank", "width=600,height=400,top=50%,left=50%,transform=translate(-50%,-50%)");
  };

  const shareOnLinkedIn = () => {
    const shareUrl = `http://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareLink)}`;
    window.open(shareUrl, "_blank", "width=600,height=400,top=50%,left=50%,transform=translate(-50%,-50%)");
  };

  const shareOnWhatsApp = () => {
    const shareUrl = `whatsapp://send?text=${encodeURIComponent(shareLink)}`;
    const encodedShareUrl = encodeURIComponent(shareUrl);
    window.open(
      `https://wa.me/send?text=${encodedShareUrl}`,
      "_blank",
      "width=600,height=400,top=50%,left=50%,transform=translate(-50%,-50%)"
    );
  };

  return (
    
      
        <Dialog
          open={open}
          onOpenChange={toggleModal}

        >
          <DialogContent 
          // className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          className="custom-dialog"
          >
          <div
            className="relative w-full rounded-lg bg-white p-6 shadow-lg overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="absolute right-4 top-[9px] p-1 text-black" onClick={toggleModal}>
              {/* Close button icon */}
              <X className="w-10 h-10 text-white" />
            </button>

            <div className="mb-6 text-center">
              <div className="modal-header inline-flex w-full items-center justify-center rounded-t-lg bg-gradient-to-r from-orange-500 to-pink-500 py-4 text-white">
                <h2 className="text-2xl font-semibold">Embed/Share</h2>
              </div>
            </div>

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

            {activeTab === "embed" ? (
              <div>
                <h3 className="mb-2 text-lg font-medium">Embed Code</h3>
                <div className="relative">
                  <SyntaxHighlighter language="html">{embedCode}</SyntaxHighlighter>
                  <button
                    onClick={() => copy({ text: embedCode })}
                    className="absolute right-0 top-0 mt-2 mt-[-1px] rounded bg-green-500 p-2 text-white hover:bg-green-600"
                  >
                    {isCopied ? <CheckIcon className="h-5 w-5" /> : <CopyIcon className="h-5 w-5" />}
                  </button>
                </div>
                <p className="mt-2 text-gray-500">Copy the above iframe code to embed this content.</p>
                <h3 className="mb-2 mt-4 text-lg font-medium">CMS Integrations</h3>
                <p className="text-gray-500">
                  You can also embed this content using your favorite CMS platform like WordPress, HubSpot, Shopify,
                  etc.
                </p>
                <div className="mt-4 flex space-x-4">
                  <Link
                    href="#"
                    target="_blank"
                    className="flex items-center space-x-2 rounded-md border p-4 shadow-md transition hover:shadow-lg"
                  >
                    <FaWordpress className="h-10 w-10 text-blue-500" />
                    <span className="text-xl">WordPress</span>
                  </Link>
                  <Link
                  href="#"
                    target="_blank"
                    className="flex items-center space-x-2 rounded-md border p-4 shadow-md transition hover:shadow-lg"

                  
                  >
                    <Image src="/images/webflow.svg" alt="HubSpot" width={40} height={40} />
                    <span className="text-xl">Webflow</span>
                  </Link>

                  <Link
                    href="#"
                    target="_blank"

                    className="flex items-center space-x-2 rounded-md border p-4 shadow-md transition hover:shadow-lg"
                  >
                    <FaHubspot className="h-10 w-10 text-orange-500" />
                    <span className="text-xl">HubSpot</span>
                  </Link>

                  <Link
                    href="#"
                    target="_blank"
                    className="flex items-center space-x-2 rounded-md border p-4 shadow-md transition hover:shadow-lg"
                  >
                    <FaShopify className="h-10 w-10 text-cyan-500" />
                    <span className="text-xl">Shopify</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="mb-2 text-lg font-medium">Share Link</h3>
                <div className="relative pr-[130px]">
                  <input
                    className="w-full rounded-md border border-gray-300 p-2 "
                    type="text"
                    readOnly
                    value={shareLink}
                  />
                  <button
                    onClick={() => copy({ text: shareLink })}
                    className="absolute right-0 top-0 mt-2 mt-[2px] flex items-center rounded bg-green-500  p-2 text-white hover:bg-green-600"
                  >
                    {isCopied ? <CheckIcon className="mr-2 h-5 w-5" /> : <CopyIcon className="mr-2 h-5 w-5" />} Copy
                    Link
                  </button>
                </div>

                {/* Social Media Icons */}
                <div className="mt-4 flex space-x-4">
                  <button onClick={shareOnFacebook} aria-label="Share on Facebook">
                    <BsFacebook className="h-10 w-10 text-blue-500" />
                  </button>
                  <button onClick={shareOnTwitter} aria-label="Share on Twitter">
                    <BsTwitterX className="h-6 w-6" />
                  </button>
                  <button onClick={shareOnLinkedIn} aria-label="Share on LinkedIn">
                    <BsLinkedin className="h-10 w-10 text-blue-500" />
                  </button>
                  <button onClick={shareOnWhatsApp} aria-label="Share on WhatsApp">
                    <BsWhatsapp className="h-10 w-10 text-green-500" />
                  </button>
                </div>
                <p className="mt-2 text-gray-500">Share this link to give others access.</p>
              </div>
            )}
          </div>
          </DialogContent>
          </Dialog>

          
        
      
    
  );
};

export default EmbedModal;
