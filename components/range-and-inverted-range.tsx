import { FC, useCallback } from 'react';

type RangeAndInvertedRangeProps = {
  value: number;
  onChange: (newValue: number) => void;
  label: string;
  invertedLabel: string;
};

const roundForDisplay = (number: number) => Math.round(number * 100) / 100;

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
      {roundForDisplay(1 / value)}

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

      {roundForDisplay(value)}
    </>
  );
};
