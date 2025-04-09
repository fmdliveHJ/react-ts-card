import { Typography, typographyMap } from '@/styles/typography';
import { Colors, colors } from '@/styles/colorPalette';
import { CSSProperties } from 'react';

import styled from '@emotion/styled';

interface TextProps {
  typography?: Typography;
  color?: Colors;
  display?: CSSProperties['display'];
  textAlign?: CSSProperties['textAlign'];
  fontWeight?: CSSProperties['fontWeight'];
  bold?: boolean;
}

const Text = styled.span<TextProps>(
  ({ color = '#000', display, textAlign, fontWeight, bold }) => ({
    color: colors[color],
    textAlign,
    fontWeight: bold ? 'bold' : fontWeight,
    display,
  }),
  ({ typography = 't5' }) => typographyMap[typography]
);

export default Text;
