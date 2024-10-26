import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ImageIcon } from 'lucide-react';
import { marked } from 'marked';
import { createSlug } from '@/utils/slug';
import { LeadMagnet, User } from '@smartleadmagnet/database';
import CloneMagnetButton from './CloneMagnetButton';

interface LeadMagnetCardProps {
  leadMagnet: LeadMagnet;
  user?: any;
}

const LeadMagnetCard: React.FC<LeadMagnetCardProps> = ({ leadMagnet, user }) => {
  const slug = createSlug(leadMagnet?.name);

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
        <div
          className="mb-5 text-gray-600"
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
        <CloneMagnetButton leadMagnetId={leadMagnet.id} userId={user?.id} />
      </div>
    </div>
  );
};

export default LeadMagnetCard;
