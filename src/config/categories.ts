export const categoryMapping = {
  'Guide': 'Guides pratiques',
  'Conseils': 'Conseils de pro',
  'Planification': 'Planifier son potager',
  'Équipement': 'Matériel & Outils'
} as const;

export type CategoryKey = keyof typeof categoryMapping;

export const getCategoryDisplayText = (cat: string): string => {
  return categoryMapping[cat as CategoryKey] || cat;
};
