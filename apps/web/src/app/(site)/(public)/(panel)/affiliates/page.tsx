import Link from "next/link";
import { FaArrowUp, FaCoins, FaShare } from "react-icons/fa";
import IncomeByAffiliateProgramCalculator from "./IncomeByAffiliateCalculator";
import { affiliateProgramLink } from "@/lib/affiliate";

export default function Affiliates() {
  return (
    <div className="relative min-h-screen min-w-full">
      <div className="bg-gradient-radial from-primary-100 absolute left-0 top-0 z-[-1] min-h-full min-w-full via-transparent opacity-50 dark:from-gray-900" />
      <div className="from-primary-400 to-primary-50 absolute left-0 top-[-500px] z-[-1] min-h-[800px] min-w-full bg-gradient-to-r opacity-10 blur-[200px] dark:from-gray-700 dark:to-gray-800" />
      <div className="container mx-auto flex flex-col">
        <div className="flex flex-col items-center">
          <h1 className="mb-6 mt-[120px] text-center text-[36px] font-extrabold leading-[40px] text-gray-900 sm:text-4xl lg:text-[52px] lg:leading-[60px] dark:text-white">
            Be our affiliate to
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text font-bold text-transparent dark:from-cyan-300 dark:to-cyan-500">
              earn 15% commission.
            </span>
          </h1>
          <h2 className="text-primary-500 dark:text-primary-400 text-center">
            Partner with us to earn a <strong>recurring 15% commission</strong> every referral
          </h2>
          <div className="my-8 flex flex-col gap-4 sm:flex-row">
            <Link target="_blank" className="btn-primary rounded font-bold" href={affiliateProgramLink}>
              Join our affiliate program
            </Link>
          </div>

          <div className="mb-6 mt-[60px] flex flex-col items-center gap-4">
            <IncomeByAffiliateProgramCalculator />
          </div>

          <h3 className="mb-4 mt-[80px] text-center text-4xl font-extrabold text-gray-900 dark:text-white">
            How it works
          </h3>
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary-300 dark:bg-primary-600 rounded-[14px] p-2">
                <FaArrowUp size="20" className="text-white" />
              </div>
              <p className="text-gray-900 dark:text-white">
                Sign up our affiliate program and get a unique link that can be shared
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary-300 dark:bg-primary-600 rounded-[14px] p-2">
                <FaShare size="20" className="text-white" />
              </div>
              <p className="text-gray-900 dark:text-white">Share your link with your friends, customers, clients...</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary-300 dark:bg-primary-600 rounded-[14px] p-2">
                <FaCoins size="20" className="text-white" />
              </div>
              <p className="text-gray-900 dark:text-white">
                You'll get 40% recurring commission for every successful referral
              </p>
            </div>
          </div>

          <h3 className="mb-4 mt-[80px] text-center text-4xl font-extrabold text-gray-900 dark:text-white">
            Affiliate Terms
          </h3>
          <p className="max-w-[680px] text-center font-semibold text-gray-900 dark:text-white">
            There are a few rules about our affiliate program you should know about. <br />
            No "gotchas" here, just some terms to keep everyone happy.
          </p>
          <div className="max-w-[680px]">
            <ul className="mt-6 list-disc pl-8 text-gray-900 dark:text-white">
              <li className="mt-4">
                Self-referrals are not allowed (i.e., signing up for promotekit through your own affiliate link)
              </li>
              <li className="mt-4">
                Abuse, gaming, or attempting to mislead (i.e., posting fake discounts to coupon-sharing websites) will
                result in your account being permanently banned.
              </li>
              <li className="mt-4">
                In some cases, we can give credit to an affiliate even if the customer didn't sign up through an
                affiliate link. If you have a case like this, please contact us, and we'll do our best to help.
              </li>
              <li className="mt-4">No pretending to be acting on behalf of us (i.e., as an employee).</li>
              <li className="mt-4">
                We reserve the right to modify the Terms of Service for our affiliate program at any time.
              </li>
              <li className="mt-4">
                All content and materials available on our website, including but not limited to text, graphics, logos,
                images, and software, are the property of <strong>SmartLeadMagnet</strong> and are protected by
                copyright, trademark, and other intellectual property laws.
              </li>
            </ul>
          </div>

          <h3 className="mb-4 mt-[140px] text-center text-4xl font-extrabold leading-[46px] text-gray-900 dark:text-white">
            Ready to partner with us?
          </h3>
          <Link target="_blank" className="btn-primary mb-[120px] mt-4 rounded font-bold" href={affiliateProgramLink}>
            Join our affiliate program
          </Link>
        </div>
      </div>
    </div>
  );
}
