import React from 'react';
import { colors } from '@/styles/colorPalette';

interface IconCheckProps {
  style?: React.CSSProperties;
  withCircle?: boolean;
  checked?: boolean;
}
export const IconHomeCheck: React.FC<IconCheckProps> = ({ style }) => {
  return (
    <svg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg' style={style}>
      <path d='M335 175L224 286.1L176.1 239c-9.375-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94l64 64C211.7 341.7 217.8 344 224 344s12.28-2.344 16.97-7.031l128-128c9.375-9.375 9.375-24.56 0-33.94S344.4 165.7 335 175zM256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464z' />
    </svg>
  );
};

export const IconAgreementCheck: React.FC<IconCheckProps> = ({
  withCircle,
  checked,
}: {
  withCircle: boolean;
  checked: boolean;
}) => {
  return (
    <svg id='Layer_1' version='1.1' viewBox='0 0 64 64' width={24} height={24}>
      <g>
        <g id='Icon-Check' transform='translate(328.000000, 278.000000)'>
          {withCircle ? (
            <path
              d='M-296-222.6c-12.9,0-23.4-10.5-23.4-23.4c0-12.9,10.5-23.4,23.4-23.4     c12.9,0,23.4,10.5,23.4,23.4C-272.6-233.1-283.1-222.6-296-222.6L-296-222.6z M-296-266.9c-11.5,0-20.9,9.4-20.9,20.9     s9.4,20.9,20.9,20.9s20.9-9.4,20.9-20.9S-284.5-266.9-296-266.9L-296-266.9z'
              id='Fill-43'
              fill={checked ? colors.blue : colors.gray}
            />
          ) : null}
          <polyline
            id='Fill-44'
            points='-298.8,-235.9 -310.7,-247.9 -308.9,-249.7 -298.8,-239.5 -283.1,-255.2      -281.3,-253.4 -298.8,-235.9    '
            fill={checked ? colors.blue : colors.gray}
          />
        </g>
      </g>
    </svg>
  );
};
