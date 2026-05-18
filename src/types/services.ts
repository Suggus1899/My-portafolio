export type Service = {
  id: string;
  title: string;
  idealFor: string;
  scope: string;
  deliverables: string[];
  technologies: string[];
  duration: string;
};

export type ServiceCategory = {
  id: string;
  name: string;
  description: string;
  services: Service[];
};

export type ContactCTAs = {
  whatsapp: string;
  email: string;
  calendar?: string;
};
