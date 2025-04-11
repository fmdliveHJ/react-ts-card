import { useMutation } from '@tanstack/react-query';
import { applyDoc } from '@/remote/apply';
import { TermsList } from '@/model/apply';
import { useAlertContext } from '@/context/AlertContext';

interface UseApplyMutationProps {
  onSuccess: () => void;
  onError: () => void;
}

const useApplyMutation = ({ onSuccess, onError }: UseApplyMutationProps) => {
  const { open } = useAlertContext();

  return useMutation({
    mutationFn: (terms: TermsList) => applyDoc(terms),
    onSuccess: () => {
      onSuccess();
      console.log('신청 완료 mutation');
    },
    onError: () => {
      open({
        title: '오류가 발생했습니다.',
        onButtonClick: () => {
          onError();
        },
      });
    },
  });
};

export default useApplyMutation;
