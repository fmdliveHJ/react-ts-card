import ApplyIndex from '@/components/apply';
import useApplyMutation from '@/components/apply/hooks/useApplyMutation';
import { TermsList } from '@/model/apply';
const Apply = () => {
  const { mutate: apply } = useApplyMutation({
    onSuccess: () => {
      console.log('success');
    },
    onError: () => {
      window.history.back();
    },
  });

  return <ApplyIndex onSubmit={apply} />;
};

export default Apply;
