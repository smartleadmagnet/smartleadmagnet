import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ImageIcon } from 'lucide-react';
import { marked } from 'marked';
import { createSlug } from '@/utils/slug';
import { LeadMagnet } from '@smartleadmagnet/database';

interface LeadMagnetCardProps {
  leadMagnet: LeadMagnet;
}

const LeadMagnetCard: React.FC<LeadMagnetCardProps> = ({ leadMagnet }) => {
  const slug = createSlug(leadMagnet.name);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center space-x-4">
        {leadMagnet.image ? (
          <Image
            className="h-[60px] w-[60px] rounded-full object-cover object-center"
            src={leadMagnet.image}
            alt={leadMagnet.name}
            width={60}
            height={60}
          />
        ) : (
          <div className="app_icon">
            <ImageIcon className="h-[40px] w-[40px] rounded-full" />
          </div>
        )}
        <h2 className="text-2xl font-semibold">{leadMagnet.name}</h2>
      </div>
      {leadMagnet.description && (
        <p
          className="mb-4 text-gray-600"
          dangerouslySetInnerHTML={{ __html: marked(leadMagnet.description.slice(0, 200)) }}
        />
      )}
      <div className="flex space-x-2">
        <Link
          href={`/templates/view/${slug}`}
          className="rounded bg-cyan-500 px-4 py-2 text-white hover:bg-cyan-600"
        >
          Use This
        </Link>
        <Link
          href={`/templates/use/${slug}`}
          className="rounded border border-cyan-500 px-4 py-2 text-cyan-500 hover:bg-cyan-600 hover:text-white"
        >
          Make it yours
        </Link>
      </div>
    </div>
  );
};

export default LeadMagnetCard;
