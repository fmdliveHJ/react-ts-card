import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getAdBanners } from '@/remote/adBanner';
import { colors } from '@/styles/colorPalette';
import Flex from '../global/Flex';
import Text from '../global/Text';

import 'swiper/css';

const AdBanners = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['adBanners'],
    queryFn: () => getAdBanners(),
  });

  console.log(data);

  if (data == null || isLoading) {
    return (
      <Container>
        <Flex direction='column' css={bannerContainerStyles}>
          <Text bold={true}>&nbsp;</Text>
          <Text typography='t7'>&nbsp;</Text>
        </Flex>
      </Container>
    );
  }

  return (
    <Container>
      <Swiper spaceBetween={8}>
        {data?.map((banner) => {
          return (
            <SwiperSlide key={banner.id}>
              <Link to={banner.link}>
                <Flex direction='column' css={bannerContainerStyles}>
                  <Text bold={true}>{banner.title}</Text>
                  <Text typography='t7'>{banner.description}</Text>
                </Flex>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Container>
  );
};

const Container = styled.div`
  padding: 24px;
`;

const bannerContainerStyles = css`
  padding: 16px;
  background-color: ${colors.gray};
  border-radius: 4px;
`;

export default AdBanners;
