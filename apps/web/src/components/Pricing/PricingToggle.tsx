import React from "react";

interface PricingToggleProps {
  onPriceChange: (isYearly: boolean) => void;
  isYearly: boolean;
}

const PricingToggle: React.FC<PricingToggleProps> = ({ onPriceChange, isYearly }) => {
  return (
    <div className="mb-[34px] mt-[10px] px-[16px] sm:px-[20px] md:px-[40px]">
      <div className="mx-auto flex max-w-[1280px] items-center justify-center md:!justify-end">
        <div className="select-none whitespace-nowrap rounded-md bg-[#fff] p-[2px] leading-[18px]">
          <div className="relative flex overflow-x-hidden rounded-md">
            <div
              className="absolute top-[0] z-0 rounded-md bg-[#282828] text-[16px] font-medium text-transparent transition-transform duration-300 ease-in-out ltr:left-[0] rtl:right-[0]"
              style={{
                transform: isYearly ? "translateX(0)" : "translateX(96%)",
                width: "214px",
                height: "44px",
              }}
            ></div>
            <div
              className={`relative z-[1] cursor-pointer px-[16px] py-[13px] text-[16px] font-medium transition-colors duration-300 ease-in-out ${
                isYearly ? "text-white" : "text-[#282828]"
              }`}
              onClick={() => onPriceChange(true)}
            >
              Yearly (Save up to 48%)
            </div>
            <div
              className={`relative z-[1] cursor-pointer py-[13px] pl-[20px] pr-[20px] text-[16px] font-medium transition-colors duration-300 ease-in-out ${
                isYearly ? "text-[#282828]" : "text-white"
              }`}
              onClick={() => onPriceChange(false)}
            >
              Monthly
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingToggle;
