import ApplyIndex from '@/components/apply';
import useApplyMutation from '@/components/apply/hooks/useApplyMutation';
import useReadyStatus from '@/components/apply/hooks/useReadyStatus';
import { updateCard } from '@/remote/apply';
import { useState, useEffect } from 'react';
import { APPLY_STATUS } from '@/model/apply';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks/auth/useUser';

const Apply = () => {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const user = useUser();
  const { id } = useParams() as { id: string };

  const { data: status } = useReadyStatus({
    enabled: ready,
  });

  const { mutate } = useApplyMutation({
    onSuccess: () => {
      setReady(true);
    },
    onError: () => {
      window.history.back();
    },
  });

  useEffect(() => {
    if (!status || !user?.uid) return;

    const updateAndNavigate = async () => {
      if (status === APPLY_STATUS.COMPLETE) {
        await updateCard({
          userId: user.uid,
          cardId: id,
          terms: {
            status: APPLY_STATUS.COMPLETE,
          },
        });
        navigate(`/apply/finish?success=true`);
      } else if (status === APPLY_STATUS.REJECT) {
        await updateCard({
          userId: user.uid,
          cardId: id,
          terms: {
            status: APPLY_STATUS.REJECT,
          },
        });
        navigate(`/apply/finish?success=false`);
      }
    };

    updateAndNavigate();
  }, [status, user?.uid, id, navigate]);

  if (ready) {
    return <div>로딩중</div>;
  }

  return <ApplyIndex onSubmit={mutate} />;
};

export default Apply;
