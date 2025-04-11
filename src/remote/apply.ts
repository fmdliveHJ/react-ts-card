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
