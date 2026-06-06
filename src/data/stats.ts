export type Stat = {
  value: number;
  suffix: string;
  labelKey: string;
};

export const stats: Stat[] = [
  { value: 3, suffix: '+', labelKey: 'yearsLabel' },
  { value: 15, suffix: '+', labelKey: 'projectsLabel' },
  { value: 4, suffix: '', labelKey: 'languagesLabel' },
  { value: 20, suffix: '+', labelKey: 'techLabel' },
];
