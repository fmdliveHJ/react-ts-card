import { APPLY_STATUS } from '@/model/apply';
import { useQuery } from '@tanstack/react-query';

interface UseReadyStatusProps {
  enabled: boolean;
}

const useReadyStatus = ({ enabled }: UseReadyStatusProps) => {
  return useQuery({
    queryKey: ['readyStatus'],
    queryFn: () => getReadyStatus(),
    enabled,
    refetchInterval: 2000,
    staleTime: 0,
  });
};

export default useReadyStatus;

function getReadyStatus(): (typeof APPLY_STATUS)[keyof typeof APPLY_STATUS] {
  const values = [
    APPLY_STATUS.REDAY,
    APPLY_STATUS.PROGRESS,
    APPLY_STATUS.COMPLETE,
    APPLY_STATUS.REJECT,
  ];

  const status = values[Math.floor(Math.random() * values.length)];

  if (status === APPLY_STATUS.REJECT) {
    throw new Error('신청 거절');
  }

  return status;
}
