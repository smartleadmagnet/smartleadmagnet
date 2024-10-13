import Image from "next/image";
import Link from "next/link";


const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Product Details</h1>
      <p className="text-center text-gray-600 mb-8 max-w-4xl mx-auto">This is a detailed description of the product. It includes key features, benefits, and other important information that will help customers make an informed decision.</p>
        <div className="md:flex">
          <div className="md:w-1/2">
            <Image
              src="https://via.placeholder.com/400"
              alt="Product Image"
              width={400}
              height={400}
              className="object-cover w-full h-100"
            />
          </div>
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold text-gray-800">Product Title</h1>
            <p className="mt-2 text-gray-600">
              This is a brief product description. It highlights the key features and benefits of the product in a concise way. Perfect for AI content writers or any creative task.
            </p>
            <div className="mt-4">
              <span className="text-2xl font-bold text-gray-800">$49.99</span>
              <span className="ml-2 text-sm text-gray-600 line-through">$59.99</span>
            </div>
            <div className="mt-4">
              <Link href={`/checkout/${id}`} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                  Buy Now
                
              </Link>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Page;
