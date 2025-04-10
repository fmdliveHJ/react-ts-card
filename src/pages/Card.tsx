import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCard } from '@/remote/card';
import { useCallback } from 'react';
import { useUser } from '@/hooks/auth/useUser';

import Top from '@/components/global/Top';
import List from '@/components/global/List';
import FixedBottomButton from '@/components/global/FixedBottomButton';
import { useAlertContext } from '@/context/AlertContext';
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
              left={<IconCheck />}
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
function IconCheck() {
  return (
    <svg
      fill='none'
      height='20'
      viewBox='0 0 48 48'
      width='20'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect fill='white' fillOpacity={0.01} height='48' width='48' />
      <path
        d='M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z'
        fill='#2F88FF'
        stroke='black'
        strokeLinejoin='round'
        strokeWidth='4'
      />
      <path
        d='M16 24L22 30L34 18'
        stroke='white'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='4'
      />
    </svg>
  );
}
