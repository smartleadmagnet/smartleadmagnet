// ScheduleMeetingCTA.js

import { SlCalender } from "react-icons/sl";
import Link from "next/link";


export default function ScheduleMeeting() {
  return (
    <div className="flex items-center justify-center p-6  border border-gray-200 bg-cyan-500 rounded-lg shadow-lg text-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">
          Schedule a Meeting
        </h2>
        <p className="text-lg mb-2">
          Let’s connect and discuss your needs. Click below to book a time.
        </p>
        <Link href="https://meetings.hubspot.com/sales-smartleadmagnet" target="_blank" className="flex items-center justify-center gap-2  w-full block rounded border border-cyan-500 bg-white px-6 py-4 text-center text-lg font-bold text-cyan-500 hover:border-cyan-600 hover:bg-cyan-600 hover:text-white md:w-auto">
          <SlCalender className="w-5 h-5" />
          Schedule Now
        </Link>
      </div>
    </div>
  );
}
