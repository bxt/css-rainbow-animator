import { FC, useCallback } from 'react';

type SwathSizeProps = {
  swathSize: number;
  setSwathSize: (newValue: number) => void;
};

export const SwathSize: FC<SwathSizeProps> = ({ swathSize, setSwathSize }) => {
  const onChange = useCallback(
    (event) => {
      setSwathSize(event.target.value);
    },
    [setSwathSize],
  );

  const onChangeInverted = useCallback(
    (event) => {
      setSwathSize(1 / event.target.value);
    },
    [setSwathSize],
  );

  const isInverted = swathSize < 1;

  return (
    <fieldset>
      <legend>Swath size</legend>
      <label>
        Swaths per screen:
        <input
          type="range"
          onChange={onChangeInverted}
          value={isInverted ? 1 / swathSize : 1}
          min="1"
          max="15"
          step="0.25"
        />
      </label>
      {1 / swathSize}

      <br />
      <label>
        Swath with in screen sizes:
        <input
          type="range"
          onChange={onChange}
          value={isInverted ? 1 : swathSize}
          min="1"
          max="10"
          step="0.25"
        />
      </label>

      {swathSize}
    </fieldset>
  );
};
