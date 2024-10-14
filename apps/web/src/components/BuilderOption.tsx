import Icon from "@smartleadmagnet/ui/components/icon";
import SettingsForm from "@/components/SettingsForm";
import WebhookForm from "@/components/WebhookForm";
import EmailForm from "@/components/EmailForm";
import React from "react";

interface Props {
  activeOption: string;
  setActiveOption: Function;
}

export default function BuilderOption({ activeOption, setActiveOption }: Props) {
  return (
    <div className="builder-wrapper flex flex-1">
      <div className="w-1/3 p-4 builder-column">
        <div className="grid grid-cols-1 gap-4">
          <div
            onClick={() => setActiveOption("info")}
            className={`cursor-pointer rounded bg-white p-4 shadow transition-transform ${
              activeOption === "info" ? "border border-blue-300 bg-blue-500" : ""
            }`}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-300">
              <Icon name="info" />
            </div>
            <h3 className="text-lg font-semibold">Information</h3>
            <p className="text-sm">Update the basic information of your app here: icon, title, description, etc.</p>
          </div>
          <div
            onClick={() => setActiveOption("webhook")}
            className={`cursor-pointer rounded bg-white p-4 shadow transition-transform ${
              activeOption === "webhook" ? "border border-blue-300 bg-blue-500" : ""
            }`}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-300">
              <Icon name="webhook" />
            </div>
            <h3 className="text-lg font-semibold">Webhook Integration</h3>
            <p className="text-sm">
              Connect your form with your favorite tools like Zapier and other third-party tools.
            </p>
          </div>

          {/* Card 3 - Email */}
          <div
            onClick={() => setActiveOption("email")}
            className={`cursor-pointer rounded bg-white p-4 shadow transition-transform ${
              activeOption === "email" ? "border border-blue-300 bg-blue-500" : ""
            }`}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-300">
              <Icon name="email" />
            </div>
            <h3 className="text-lg font-semibold">Automated Email</h3>
            <p className="mt-2 text-sm text-gray-600">
              Automatically send an email to your leads when they submit the form.
              <br />
              <span className="font-semibold text-red-500">Note:</span> Email address is required to send the message.
            </p>
          </div>
        </div>
      </div>
      {/* Right Column */}
      <div className="w-2/3 p-4">
        <main className="drop-area builder-column bg-gray-100 p-4">
          <div className="grid grid-cols-1 gap-4">
            {activeOption === "info" && <SettingsForm />}
            {activeOption === "webhook" && <WebhookForm />}
            {activeOption === "email" && <EmailForm />}
          </div>
        </main>
      </div>
    </div>
  );
}
