export type Repo = {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  demoUrl?: string | null;
  status?: string;
  year?: string;
  license?: string;
  highlights?: string[];
};

export type Project = Repo & {
  isPrivate?: boolean;
};

// Legacy Service type - kept for backward compatibility
export type Service = {
  id: string;
  category: string;
  title: string;
  summary: string;
  includes: string[];
  deliverables: string[];
  eta: string;
};

// New Service types
export type ServiceDetail = {
  id: string;
  title: string;
  idealFor: string;
  scope: string;
  deliverables: string[];
  technologies: string[];
  duration: string;
  startingPrice?: string;
  exclusions: string;
  revisions: string;
  payment: 'standard' | 'milestones' | 'upfront';
};

export type ServiceCategory = {
  id: string;
  name: string;
  description: string;
  services: ServiceDetail[];
};

export type ContactCTAs = {
  whatsapp: string;
  email: string;
  calendar?: string;
};
