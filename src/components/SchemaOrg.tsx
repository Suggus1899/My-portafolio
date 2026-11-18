interface SchemaOrgProps {
  siteUrl: string;
}

export default function SchemaOrg({ siteUrl }: SchemaOrgProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Gustavo Colina',
    jobTitle: 'Full-Stack Developer',
    url: siteUrl,
    sameAs: [
      'https://github.com/Suggus1899',
      'https://www.linkedin.com/in/gustavo-colina-a1b787286/'
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\u003c') }}
    />
  );
}
