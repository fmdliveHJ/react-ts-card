import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCard } from '@/remote/card';
import { useCallback } from 'react';
import { useUser } from '@/hooks/auth/useUser';

import Top from '@/components/global/Top';
import List from '@/components/global/List';
import FixedBottomButton from '@/components/global/FixedBottomButton';
import { useAlertContext } from '@/context/AlertContext';
import { IconHomeCheck } from '@/components/icons';
const Card = () => {
  const params = useParams();
  const navigate = useNavigate();
  const user = useUser();

  const { open } = useAlertContext();
  const { data } = useQuery({
    queryKey: ['card', params.id],
    queryFn: () => getCard(params.id as string),
    enabled: !!params.id,
  });

  const moveToApply = useCallback(() => {
    if (user == null) {
      open({
        title: '로그인이 필요해요',
        onButtonClick: () => {
          navigate('/login');
        },
      });
      return;
    }

    if (user) {
      navigate(`/apply/${params.id}`);
      return;
    }
  }, [params.id, user, open, navigate]);

  if (data == null) {
    return null;
  }

  const { name, promotion, tags, corpName, benefit } = data;
  const subTitle =
    promotion != null ? removeHtmlTags(promotion.title) : tags?.join(',') ?? '';

  return (
    <div>
      <Top title={`${corpName} ${name}`} description={subTitle} />
      <ul>
        {benefit.map((text, index) => {
          return (
            <List
              key={text}
              left={<IconHomeCheck style={{ width: 20, height: 20 }} />}
              contents={
                <List.Texts title={`혜택 ${index + 1}`} subTitle={text} />
              }
            />
          );
        })}
      </ul>
      <FixedBottomButton label='신청하기' onClick={moveToApply} />
    </div>
  );
};

export default Card;

function removeHtmlTags(text: string) {
  return text.replace(/<[^>]*>?/g, '');
}
