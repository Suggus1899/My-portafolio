'use client';

import Script from 'next/script';

interface SchemaOrgProps {
  siteUrl: string;
}

export default function SchemaOrg({ siteUrl }: SchemaOrgProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Gustavo Colina',
    jobTitle: 'Software Engineer',
    url: siteUrl,
    sameAs: [
      'https://github.com/Suggus1899',
      'https://linkedin.com/in/gustavo-colina'
    ]
  };

  return (
    <Script
      id="schema-org-person"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
}
