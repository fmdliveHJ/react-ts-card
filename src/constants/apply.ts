import { Terms, Option } from '../model/apply';

export const TERMS_LIST: Array<Terms> = [
  {
    id: '01',
    title: '이용약관 동의',
  },
  {
    id: '02',
    title: '개인정보 수집 및 이용 동의',
  },
] as Terms[];

export const yearOptions = [
  { label: '600만원 ~ 5,000만원', value: '600만원 ~ 5,000만원' },
  { label: '5,000만원 ~ 1억원', value: '5,000만원 ~ 1억원' },
  { label: '1억원 초과', value: '1억원 초과' },
] as Option[];

export const creditScoreOptions = [
  { label: '600점 이상', value: '600점 이상' },
  { label: '600점 미만', value: '600점 미만' },
] as Option[];

export const paymentDateOptions = [
  { label: '1일', value: '1일' },
  { label: '25일', value: '25일' },
] as Option[];
