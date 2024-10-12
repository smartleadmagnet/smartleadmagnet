import Image from 'next/image';

interface TestimonialCardProps {
  title: string;
  text: string;
  authorImage: string;
  authorName: string;
  authorPosition: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
                                                           title,
                                                           text,
                                                           authorImage,
                                                           authorName,
                                                           authorPosition,
                                                         }) => {
  return (
    <div className="bg-white border border-gray-200 shadow-md rounded-lg p-6">
      {/* Star icon */}
      <Image
        src="/images/home/star-five.svg"
        alt="Five star icon"
        width={200} // Set width for the star icon
        height={35} // Set height for the star icon
        className='mb-4'
      />

      {/* Title */}
      <h3 className="text-xl font-semibold mb-4">{title}</h3>

      {/* Text */}
      <p className="text-gray-600 mb-6">{text}</p>

      {/* Author Section */}
      <div className="flex items-center">
        {/* Author Image */}
        <div className="w-14 h-14 rounded-full overflow-hidden mr-4">
          <Image
            src={authorImage}
            alt={authorName}
            className="w-full h-full object-cover"
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
