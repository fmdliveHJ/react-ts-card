import { User } from './user';

export interface Terms {
  id: string;
  title: string;
  link?: string;
}

export interface TermsList {
  userId: User['uid'];
  terms: Array<Terms['id']>;
  appliedAt: Date;
  cardId: string;
  salary: string;
  creditScore: string;
  payDate: string;
}

export interface Option {
  label: string;
  value: string | number | undefined;
}
