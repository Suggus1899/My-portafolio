export type Experience = {
  roleKey: string;
  companyKey: string;
  periodKey: string;
  descriptionKey: string;
  technologiesKey: string;
  achievementsKeys: string[];
};

export const experiences: Experience[] = [
  {
    roleKey: 'exp1Role',
    companyKey: 'exp1Company',
    periodKey: 'exp1Period',
    descriptionKey: 'exp1Description',
    technologiesKey: 'exp1Technologies',
    achievementsKeys: ['exp1Achievement1', 'exp1Achievement2', 'exp1Achievement3'],
  },
  {
    roleKey: 'exp2Role',
    companyKey: 'exp2Company',
    periodKey: 'exp2Period',
    descriptionKey: 'exp2Description',
    technologiesKey: 'exp2Technologies',
    achievementsKeys: ['exp2Achievement1', 'exp2Achievement2', 'exp2Achievement3'],
  },
];
