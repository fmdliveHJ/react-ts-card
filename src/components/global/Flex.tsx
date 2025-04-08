import styled from '@emotion/styled';
import { CSSProperties } from 'react';
interface FlexProps {
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  direction?: CSSProperties['flexDirection'];
  wrap?: CSSProperties['flexWrap'];
}

const Flex = styled.div<FlexProps>(({ align, justify, direction, wrap }) => ({
  display: 'flex',
  alignItems: align,
  justifyContent: justify,
  flexDirection: direction,
  flexWrap: wrap,
}));

export default Flex;
