import { FC, useCallback } from 'react';

import { ValuePreview } from './value-preview';

type RangeAndInvertedRangeProps = {
  invertedLabel: string;
  label: string;
  onChange: (newValue: number) => void;
  value: number;
};

export const RangeAndInvertedRange: FC<RangeAndInvertedRangeProps> = ({
  invertedLabel,
  label,
  onChange,
  value,
}) => {
  const onChangeRegular = useCallback(
    (event) => {
      onChange(event.target.value);
    },
    [onChange],
  );

  const onChangeInverted = useCallback(
    (event) => {
      onChange(1 / event.target.value);
    },
    [onChange],
  );

  const isInverted = value < 1;

  return (
    <>
      <label>
        {invertedLabel}
        <input
          max="15"
          min="1"
          onChange={onChangeInverted}
          step="0.25"
          type="range"
          value={isInverted ? 1 / value : 1}
        />
      </label>
      <ValuePreview value={1 / value} />
      <span className="alternative-indicator">or</span>
      <br />

      <label>
        {label}
        <input
          max="10"
          min="1"
          onChange={onChangeRegular}
          step="0.25"
          type="range"
          value={isInverted ? 1 : value}
        />
      </label>
      <ValuePreview value={value} />
      <style jsx>{`
        input,
        .alternative-indicator {
          margin: 0 0.25rem 0 1rem;
        }
      `}</style>
    </>
  );
};
