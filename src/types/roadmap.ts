import { DataSource } from './common';

export type MilestoneCategory = 'Heritage' | 'Supporters' | 'Sporting' | 'Academy' | 'Infrastructure' | 'Future';

export interface Milestone {
  id: string;
  year: string;
  quarter?: string;
  title: string;
  category: MilestoneCategory;
  description: string;
  isCompleted: boolean;
  isCurrent?: boolean;
  highlightNumber?: string;
  highlightLabel?: string;
  dataSource: DataSource;
}
