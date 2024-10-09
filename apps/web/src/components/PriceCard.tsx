
interface PriceCardProps {
  title: string;
  description: string;
  price: string;
  duration: string;
  features: { text: string; emphasis?: string }[];
  buttonText: string;
  onButtonClick: () => void;
}

const PriceCard: React.FC<PriceCardProps> = ({
  title,
  description,
  price,
  duration,
  features,
  buttonText,
  onButtonClick
}) => {
  return (
    <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
      <h3 className="mb-4 text-2xl font-semibold">{title}</h3>
      <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
        {description}
      </p>
      <div className="flex justify-center items-baseline my-8">
        <span className="mr-2 text-5xl font-extrabold">{price}</span>
        <span className="text-gray-500 dark:text-gray-400">{duration}</span>
      </div>
      <ul role="list" className="mb-8 space-y-4 text-left">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-3">
            <svg
              className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>
              {feature.text}{" "}
              {feature.emphasis && (
                <span className="font-semibold">{feature.emphasis}</span>
              )}
            </span>
          </li>
        ))}
      </ul>
      <button
        onClick={onButtonClick}
        className="text-white btn-primary bg-primary rounded-lg px-6 py-3"
      >
        {buttonText}
      </button>
    </div>
  )
}

export default PriceCard;
