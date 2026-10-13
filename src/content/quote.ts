export interface QuoteContent {
  eyebrow: string;
  statementLead: string;
  statementEmphasis: string;
  supportingText?: string;
}

export const footballQuoteContent: QuoteContent = {
  eyebrow: '02 / MATCHDAY MENTALITY',
  statementLead: 'Ninety minutes.',
  statementEmphasis: 'Zero excuses.',
  supportingText: 'All heart. From the opening whistle to the final breath.',
};
