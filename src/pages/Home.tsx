import Top from '@/components/global/Top';
import AdBanners from '@/components/home/AdBanners';
import CardList from '@/components/home/CardList';
const Home = () => {
  return (
    <div>
      <Top title='Home' description='Home' />
      <AdBanners />
      <CardList />
    </div>
  );
};

export default Home;
