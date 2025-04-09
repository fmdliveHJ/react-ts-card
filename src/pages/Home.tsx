import Top from '@/components/global/Top';
import { getCards } from '@/remote/card';
import { getAdBanners } from '@/remote/adBanner';
import { useEffect } from 'react';
import AdBanners from '@/components/home/AdBanners';
import CardList from '@/components/home/CardList';
const Home = () => {
  useEffect(() => {
    getCards().then((cards) => {
      console.log(cards);
    });
  }, []);

  useEffect(() => {
    getAdBanners().then((adBanners) => {
      console.log(adBanners);
    });
  }, []);

  return (
    <div>
      <Top title='Home' description='Home' />
      <AdBanners />

      <CardList />
    </div>
  );
};

export default Home;
