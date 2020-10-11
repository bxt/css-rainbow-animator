import { FC } from 'react';

const roundForDisplay = (number: number) => Math.round(number * 100) / 100;

type ValuePreviewProps = {
  value: number;
};

export const ValuePreview: FC<ValuePreviewProps> = ({ value }) => {
  return (
    <span className="value">
      {roundForDisplay(value)}
      <style jsx>{`
        .value {
          background: #ddd;
          border-radius: 5px;
          padding: 0.125rem 0.5rem;
        }
      `}</style>
    </span>
  );
};
