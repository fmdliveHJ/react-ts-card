import { useInfiniteQuery } from '@tanstack/react-query';
import { getCards } from '@/remote/card';
import { flatten } from 'lodash';
import List from '@/components/global/List';
import Badge from '@/components/global/Badge';
import { useNavigate } from 'react-router-dom';

const CardList = () => {
  const navigate = useNavigate();
  const { data } = useInfiniteQuery({
    queryKey: ['cards'],
    queryFn: ({ pageParam = null }) => getCards(pageParam),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.lastPage,
  });

  if (data == null) {
    return null;
  }

  const cards = flatten(data?.pages.map((page) => page.cards));

  return (
    <div>
      <ul>
        {cards.map((card, index) => {
          return (
            <List
              key={card.id}
              contents={
                <List.Texts title={`${index + 1}위`} subTitle={card.name} />
              }
              right={
                card.payback != null ? (
                  <Badge label={`${card.payback}%`} />
                ) : null
              }
              withArrow
              onClick={() => navigate(`/card/${card.id}`)}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default CardList;
