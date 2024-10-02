import { Button } from "@smartleadmagnet/ui/components/ui/button";
import Icon from "@smartleadmagnet/ui/components/icon";
import { builderItems } from "@smartleadmagnet/ui/lib/constants";
import { Card } from "@smartleadmagnet/ui/components/ui/card"; // Adjust this path based on your file structure
import { BuilderComponentProps } from "../types/builder"; // Adjust this path based on your file structure



const ButtonBar = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-100">
      {/* Left Column: Back Arrow */}
      <div className="flex items-center">
        <Button className="px-4 py-2 bg-gray-300 text-black shadow-md hover:bg-gray-400">
          ← Back
        </Button>
      </div>

      {/* Center Column: Button Bar */}
      <div className="flex space-x-4">
        <Button >
          Builder
        </Button>
        <Button >
          Design
        </Button>
        <Button >
          Integration
        </Button>
        <Button >
          Settings
        </Button>
      </div>

      {/* Right Column: Publish Button */}
      <div className="flex items-center">
        <Button className="px-4 py-2 bg-green-600 text-white shadow-md hover:bg-green-700">
          Publish
        </Button>
      </div>
    </div>
  );
};



const BuilderComponent: React.FC<BuilderComponentProps> = ({ builderItems }) => {
  return (
    <div className="grid gap-4">
      {builderItems.map((item, index) => (
        <div key={index} className="py-2">
          <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
          <Card className="p-4 shadow-md" >
            <div className="grid grid-cols-2 gap-2">
              {item.children.map((child, childIndex) => (
                <Card key={childIndex} className="builder-item" draggable>
                  <Icon name={child.icon} height="50px" width="50px" />
                  <span>{child.title}</span>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};


export default function Builder() {
  return (
    <div className="min-h-screen flex flex-col">
    {/* Top Menu */}
    <ButtonBar/>
    
    {/* Main Layout: Sidebar and Content */}
    <div className="flex flex-1">
      {/* Sidebar (33% width) */}
      <aside className="w-1/4   p-4">
        <BuilderComponent builderItems={builderItems} />
      </aside>

      {/* Main Content (2 equal columns) */}
      <div className="flex flex-1">
        <main className="flex-1 bg-gray-100 p-4">
          <h2 className="text-lg font-bold">Main Content 1</h2>
          
        </main>
        <main className="flex-1 bg-gray-200 p-4">
          <h2 className="text-lg font-bold">Main Content 2</h2>
          
        </main>
      </div>
    </div>
  </div>
  );
}
