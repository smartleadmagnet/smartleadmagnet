import { Input } from '@smartleadmagnet/ui/components/ui/input';
import { Card } from '@smartleadmagnet/ui/components/ui/card';
import { Button } from '@smartleadmagnet/ui/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-4 bg-gray-50 hero-section">
      {/* Title and Subtitle */}
      <h1 className="hero-heading text-center mb-5 text-3xl sm:text-4xl lg:text-5xl">
        Enter Your Website URL <br /> And Get Best <br />
        <span className="rounded-md bg-[#BEF8FC] px-2">Lead Magnet</span>
      </h1>
      <p className="text-xl sm:text-2xl mb-4 text-center">
        Find what you're looking for below
      </p>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row w-full max-w-5xl items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-10 px-4">
        <Input
          type="text"
          placeholder="Enter Your Website URL"
          className="w-full px-4 py-3 sm:px-8 sm:py-8 text-lg sm:text-2xl rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500"
        />
        <Button
          type="submit"
          className="px-6 py-4 sm:px-10 sm:py-8 text-lg sm:text-xl font-bold rounded-xl bg-cyan-500 text-white hover:bg-cyan-900 shadow-md"
        >
          Search
        </Button>
      </div>

      {/* Dummy Cards */}
      <div className="grid grid-cols-1 gap-6 w-full max-w-5xl  px-4">
        <Card className="p-4 border rounded-lg shadow-lg">
          <h3 className="text-lg sm:text-xl font-semibold mb-2">Result 1</h3>
          <p className="text-gray-600">This is a dummy result card.</p>
          <Button className="mt-4">View More</Button>
        </Card>

        <Card className="p-4 border rounded-lg shadow-lg">
          <h3 className="text-lg sm:text-xl font-semibold mb-2">Result 2</h3>
          <p className="text-gray-600">This is another dummy result card.</p>
          <Button className="mt-4">View More</Button>
        </Card>
      </div>
    </div>
  );
}
