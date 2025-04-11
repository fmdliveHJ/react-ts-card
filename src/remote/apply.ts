import { TermsList } from '@/model/apply';
import COLLECTIONS from '@/constants';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebase';

export async function applyDoc(terms: TermsList) {
  return addDoc(collection(db, COLLECTIONS.CARD_APPLY), terms);
}

export async function updateCard({
  cardId,
  userId,
  terms,
}: {
  cardId?: string;
  userId?: string;
  terms: Partial<TermsList>;
}) {
  const snapshot = await getDocs(
    query(
      collection(db, COLLECTIONS.CARD_APPLY),
      where('cardId', '==', cardId),
      where('userId', '==', userId)
    )
  );

  const [doc] = snapshot.docs;

  updateDoc(doc.ref, terms);
}
// 카드 발급 확인
export async function confirmCard({
  userId,
  cardId,
}: {
  userId: string;
  cardId: string;
}) {
  const snapshot = await getDocs(
    query(
      collection(db, COLLECTIONS.CARD_APPLY),
      where('cardId', '==', cardId),
      where('userId', '==', userId)
    )
  );

  if (snapshot.docs.length === 0) {
    // 데이터가 하나도 없다면
    return null;
  }

  const [doc] = snapshot.docs; // 유저가 신청한 정보

  return doc.data() as TermsList;
}
