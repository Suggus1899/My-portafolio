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
      'https://github.com/Suggus1899'
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
