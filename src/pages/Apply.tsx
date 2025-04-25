import ApplyIndex from '@/components/apply';
import useApplyMutation from '@/components/apply/hooks/useApplyMutation';
import useReadyStatus from '@/components/apply/hooks/useReadyStatus';
import useApplyCard from '@/components/apply/hooks/useApplyCard';
import { updateCard } from '@/remote/apply';
import { useState, useEffect } from 'react';
import { APPLY_STATUS } from '@/model/apply';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks/auth/useUser';
import { useAlertContext } from '@/context/AlertContext';

const STATUS_MESSAGE = {
  [APPLY_STATUS.COMPLETE]: '이미 발급이 완료된 카드입니다',
  [APPLY_STATUS.REDAY]: '카드 발급 진행중입니다.',
  [APPLY_STATUS.REJECT]: '카드 발급에 실패했습니다',
};

const Apply = () => {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const user = useUser();
  const { id } = useParams() as { id: string };
  const { open } = useAlertContext();

  const { data: doc, error } = useApplyCard({
    userId: user?.uid as string,
    cardId: id,
  });

  useEffect(() => {
    if (!doc) return;

    if (doc.status === APPLY_STATUS.COMPLETE) {
      open({
        title: '이미 발급이 완료된 카드입니다',
        onButtonClick: () => {
          window.history.back();
        },
      });
      return;
    }

    setReady(true);
  }, [doc, open]);

  useEffect(() => {
    if (error) {
      console.error('에러 발생:', error);
      open({
        title: '카드를 불러오는 데 실패했어요.',
        onButtonClick: () => {
          window.history.back();
        },
      });
    }
  }, [error, open]);

  const { data: status } = useReadyStatus({
    enabled: ready,
  });

  const { mutate, isPending: isLoading } = useApplyMutation({
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

  if (doc != null && doc.status === APPLY_STATUS.COMPLETE) {
    return null;
  }

  if (ready || isLoading) {
    return <div>{STATUS_MESSAGE[status]}</div>;
  }

  return <ApplyIndex onSubmit={mutate} />;
};

export default Apply;
