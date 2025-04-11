import { TermsList } from '@/model/apply';
import COLLECTIONS from '@/constants';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

const apply = async (terms: TermsList) => {
  const applyRef = collection(db, COLLECTIONS.CARD_APPLY);
  const docRef = await addDoc(applyRef, terms);
  return docRef;
};

export default apply;
