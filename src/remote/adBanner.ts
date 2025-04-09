import { collection, getDocs } from 'firebase/firestore';

import { db } from './firebase';

import COLLECTIONS from '@/constants/index';
import { AdBanner } from '@/model/card';

export async function getAdBanners() {
  const adBannerSnapshot = await getDocs(collection(db, COLLECTIONS.ADBANNER));

  const adBanners = adBannerSnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...(doc.data() as AdBanner),
    };
  });

  return adBanners;
}
