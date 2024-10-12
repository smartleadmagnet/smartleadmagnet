import Image from "next/image";

interface TestimonialCardProps {
  title: string;
  text: string;
  authorImage: string;
  authorName: string;
  authorPosition: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ title, text, authorImage, authorName, authorPosition }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
      {/* Star icon */}
      <Image
        src="/images/home/star-five.svg"
        alt="Five star icon"
        width={200} // Set width for the star icon
        height={35} // Set height for the star icon
        className="mb-4"
      />

      {/* Title */}
      <h3 className="mb-4 text-xl font-semibold">{title}</h3>

      {/* Text */}
      <p className="mb-6 text-gray-600">{text}</p>

      {/* Author Section */}
      <div className="flex items-center">
        {/* Author Image */}
        <div className="mr-4 h-14 w-14 overflow-hidden rounded-full">
          <Image
            src={authorImage}
            alt={authorName}
            className="h-full w-full object-cover"
            width={56} // Set width for the author image
            height={56} // Set height for the author image
          />
        </div>

        {/* Author Info */}
        <div>
          <h4 className="text-lg font-semibold">{authorName}</h4>
          <span className="text-gray-500">{authorPosition}</span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
