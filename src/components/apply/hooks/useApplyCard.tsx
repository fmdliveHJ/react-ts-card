import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { confirmCard } from '@/remote/apply';
import { TermsList } from '@/model/apply';

const useApplyCard = ({
  userId,
  cardId,
  options,
}: {
  userId: string;
  cardId: string;
  options?: UseQueryOptions<TermsList | null>;
}) => {
  return useQuery({
    queryKey: ['doc', userId, cardId],
    queryFn: () => confirmCard({ userId, cardId }),
    ...options,
  });
};

export default useApplyCard;
