import Icon from "@smartleadmagnet/ui/components/icon";
import SettingsForm from "@/components/SettingsForm";
import WebhookForm from "@/components/WebhookForm";
import EmailForm from "@/components/EmailForm";
import React from "react";
import { LeadMagnet } from "@smartleadmagnet/database";

interface Props {
	activeOption: string;
	setActiveOption: Function;
	leadMagnet: LeadMagnet;
}

export default function BuilderOption({activeOption, setActiveOption, leadMagnet}: Props) {
	return (<div className="flex flex-1 builder-wrapper">
		<div className="w-1/3 p-4">
			<div className="grid grid-cols-1 gap-4">
				<div
					onClick={() => setActiveOption("info")}
					className={`bg-white p-4 rounded shadow cursor-pointer transition-transform ${
						activeOption === "info"
							? "bg-blue-500 border border-blue-300"
							: ""
					}`}
				>
					<div className="flex items-center justify-center w-12 h-12 bg-gray-300 rounded-full mb-4">
						<Icon name="info"/>
					</div>
					<h3 className="text-lg font-semibold">Information</h3>
					<p className="text-sm">
						Update the basic information of your app here: icon,
						title, description, etc.
					</p>
				</div>
				<div
					onClick={() => setActiveOption("webhook")}
					className={`bg-white p-4 rounded shadow cursor-pointer transition-transform ${
						activeOption === "webhook"
							? "bg-blue-500 border border-blue-300"
							: ""
					}`}
				>
					<div className="flex items-center justify-center w-12 h-12 bg-gray-300 rounded-full mb-4">
						<Icon name="webhook"/>
					</div>
					<h3 className="text-lg font-semibold">
						Webhook Integration
					</h3>
					<p className="text-sm">
						Connect your form with your favorite tools like Zapier and
						other third-party tools.
					</p>
				</div>
				
				{/* Card 3 - Email */}
				<div
					onClick={() => setActiveOption("email")}
					className={`bg-white p-4 rounded shadow cursor-pointer transition-transform ${
						activeOption === "email"
							? "bg-blue-500 border border-blue-300"
							: ""
					}`}
				>
					<div className="flex items-center justify-center w-12 h-12 bg-gray-300 rounded-full mb-4">
						<Icon name="email"/>
					</div>
					<h3 className="text-lg font-semibold">Automated Email</h3>
					<p className="text-sm text-gray-600 mt-2">
						Automatically send an email to your leads when they submit
						the form.
						<br/>
						<span className="font-semibold text-red-500">
                        Note:
                      </span>{" "}
						Email address is required to send the message.
					</p>
				</div>
			</div>
		</div>
		{/* Right Column */}
		<div className="w-2/3 p-4">
			<main className="bg-gray-100 p-4 drop-area builder-column">
				<div className="grid grid-cols-1 gap-4">
					{activeOption === "info" && <SettingsForm leadMagnet={leadMagnet} />}
					{activeOption === "webhook" && <WebhookForm leadMagnet={leadMagnet} />}
					{activeOption === "email" && <EmailForm leadMagnet={leadMagnet} />}
				</div>
			</main>
		</div>
	</div>)
}