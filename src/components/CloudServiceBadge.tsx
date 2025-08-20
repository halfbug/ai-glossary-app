import React from 'react';

type CloudServiceBadgeProps = {
  service: string;
  provider: 'aws' | 'gcp' | 'azure';
};

const providerClasses = {
  aws: 'bg-[#FF9900]',
  gcp: 'bg-[#4285F4]',
  azure: 'bg-[#0078D4]'
};

export const CloudServiceBadge: React.FC<CloudServiceBadgeProps> = ({ service, provider }) => (
  <span className={`inline-block px-2 py-1 text-xs rounded-full text-white mr-2 mb-1 ${providerClasses[provider]}`}>
    {service}
  </span>
);
