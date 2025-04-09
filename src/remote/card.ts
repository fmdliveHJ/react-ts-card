import {
  collection,
  getDocs,
  QuerySnapshot,
  query,
  limit,
  startAfter,
  doc,
  getDoc,
} from 'firebase/firestore';

import { db } from './firebase';

import COLLECTIONS from '@/constants/index';
import { Card } from '@/model/card';

export async function getCards(page?: QuerySnapshot<Card>) {
  const cardQuery =
    page == null
      ? query(collection(db, COLLECTIONS.CARD), limit(10))
      : query(collection(db, COLLECTIONS.CARD), startAfter(page), limit(10));

  const cardSnapshot = await getDocs(cardQuery);

  const lastPage = cardSnapshot.docs[cardSnapshot.docs.length - 1];

  const cards = cardSnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...(doc.data() as Card),
    };
  });

  return {
    cards,
    lastPage,
  };
}

export async function getCard(id: string) {
  const snapshot = await getDoc(doc(db, COLLECTIONS.CARD, id));

  return {
    id,
    ...(snapshot.data() as Card),
  };
}
