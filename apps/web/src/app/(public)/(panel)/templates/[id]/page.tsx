import Image from "next/image";
import templateCategories from "@/data/categories.json";
import Link from "next/link";

const templateData = [
  {
    id: "1",
    category: "marketing",
    title: "Email Campaign",
    description: "Create an effective email marketing campaign.",
    icon: "https://via.placeholder.com/100", // Dummy icon image URL
  },
  {
    id: "2",
    category: "marketing",
    title: "Social Media Ad",
    description: "Design social media ads for your business.",
    icon: "https://via.placeholder.com/100", // Dummy icon image URL
  },
  {
    id: "3",
    category: "seo",
    title: "SEO Audit",
    description: "Audit your website's SEO performance.",
    icon: "https://via.placeholder.com/100", // Dummy icon image URL
  },
  {
    id: "4",
    category: "design",
    title: "Landing Page Design",
    description: "Design a creative and engaging landing page.",
    icon: "https://via.placeholder.com/100", // Dummy icon image URL
  },
  {
    id: "5",
    category: "development",
    title: "Web Development",
    description: "Develop a responsive website.",
    icon: "https://via.placeholder.com/100", // Dummy icon image URL
  },
  // Add more templates for other categories as needed...
];
const TemplatesPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  // Filter templates based on selected category, or show all if 'all' is selected
  const filteredTemplates = id === "all" ? templateData : templateData.filter((template) => template.category === id);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold">Templates</h1>

      {/* Top Menu - Categories */}
      <div className="mb-8 flex justify-center">
        <nav className="flex flex-wrap overflow-auto">
          {templateCategories.map((category) => (
            <Link
              key={category.id}
              href={`/templates/${category.id}`}
              className={`no-wrap mb-3 ml-5 rounded-lg px-4 py-2 font-semibold hover:bg-gray-900 hover:text-white
              ${id === category.id ? "bg-gray-900 text-white" : "bg-gray-200"}`}
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Template Items Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.length ? (
          filteredTemplates.map((template) => (
            <div key={template.id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
              <div className="mb-4 flex items-center space-x-4">
                {/* Use Next.js Image component */}
                <div className="relative h-16 w-16">
                  <Image
                    src={template.icon}
                    alt={`${template.title} Icon`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                    priority={true} // Use priority for important images to load faster
                  />
                </div>
                <h2 className="text-2xl font-semibold">{template.title}</h2>
              </div>
              <p className="mb-4 text-gray-600">{template.description}</p>
              <div className="flex space-x-2">
                <Link
                  href={`/templates/view/${template.id}`}
                  className="rounded bg-cyan-500 px-4 py-2 text-white hover:bg-cyan-600"
                >
                  Use This
                </Link>
                <Link
                  href={`/templates/use/${template.id}`}
                  className="rounded border border-cyan-500  px-4 py-2  text-cyan-500 hover:bg-cyan-600 hover:text-white"
                >
                  Make it yours
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No templates available for this category.</p>
        )}
      </div>
    </div>
  );
};

export default TemplatesPage;
