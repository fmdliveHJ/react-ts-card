import { User } from './user';

export interface Terms {
  id: string;
  title: string;
  link?: string;
}

export const APPLY_STATUS = {
  REDAY: 'REDAY',
  PROGRESS: 'PROGRESS',
  COMPLETE: 'COMPLETE',
  REJECT: 'REJECT',
} as const;

export interface TermsList {
  userId: User['uid'];
  terms: Array<Terms['id']>;
  appliedAt: Date;
  cardId: string;
  salary: string;
  creditScore: string;
  payDate: string;
  isMaster: boolean;
  isPostpay: boolean;
  isHipass: boolean;
  status: keyof typeof APPLY_STATUS;
}

export interface Option {
  label: string;
  value: string | number | undefined;
}
