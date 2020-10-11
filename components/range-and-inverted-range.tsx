import { FC, useCallback } from 'react';

import { ValuePreview } from './value-preview';

type RangeAndInvertedRangeProps = {
  value: number;
  onChange: (newValue: number) => void;
  label: string;
  invertedLabel: string;
};

export const RangeAndInvertedRange: FC<RangeAndInvertedRangeProps> = ({
  value,
  onChange,
  label,
  invertedLabel,
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
          type="range"
          onChange={onChangeInverted}
          value={isInverted ? 1 / value : 1}
          min="1"
          max="15"
          step="0.25"
        />
      </label>
      <ValuePreview value={1 / value} />
      <span className="alternative-indicator">or</span>
      <br />

      <label>
        {label}
        <input
          type="range"
          onChange={onChangeRegular}
          value={isInverted ? 1 : value}
          min="1"
          max="10"
          step="0.25"
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
