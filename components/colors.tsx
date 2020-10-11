import { Dispatch, FC, useCallback, useReducer } from 'react';

import { ValuePreview } from './value-preview';
import { Button } from './button';

type Color = string;

type Colors = Array<Color>;

type ColorsAction =
  | { type: 'ADD_COLOR' }
  | { type: 'CHANGE_COLOR'; index: number; color: Color }
  | { type: 'REMOVE_LAST_COLOR' };

const initialColors: Colors = ['#ff9900', '#9900ff', '#00ff99'];

const somewhatRandomColor = (() => {
  const pick = <T extends unknown>(array: Array<T>): T =>
    array[Math.floor(Math.random() * array.length)];

  const shuffle = <T extends unknown>(array: Array<T>): Array<T> =>
    array
      .map((x) => [x, Math.random()] as const)
      .sort((a, b) => a[1] - b[1])
      .map((a) => a[0]);

  const lowHexDigits = ['0', '4'];
  const highHexDigits = ['c', 'f'];
  const hexDigits = [...lowHexDigits, ...highHexDigits];

  return (): Color => {
    const bits = [
      `${pick(highHexDigits)}${pick(hexDigits)}`,
      `${pick(lowHexDigits)}${pick(hexDigits)}`,
      `${pick(lowHexDigits)}${pick(hexDigits)}`,
    ];
    return `#${shuffle(bits).join('')}`;
  };
})();

const colorsReducer = (state: Colors, action: ColorsAction) => {
  switch (action.type) {
    case 'ADD_COLOR':
      return [...state, somewhatRandomColor()];
    case 'REMOVE_LAST_COLOR':
      return state.slice(0, -1);
    case 'CHANGE_COLOR':
      const { index, color } = action;
      return state.map((currentColor, currentIndex) =>
        currentIndex === index ? color : currentColor,
      );
    default:
      throw new Error();
  }
};

type ColorPickerProps = {
  color: Color;
  dispatchColors: Dispatch<ColorsAction>;
  index: number;
};

const ColorPicker: FC<ColorPickerProps> = ({
  color,
  index,
  dispatchColors,
}) => {
  const onChange = useCallback(
    (event) => {
      dispatchColors({
        type: 'CHANGE_COLOR',
        index,
        color: event.target.value,
      });
    },
    [dispatchColors, index],
  );
  return <input type="color" onChange={onChange} value={color} />;
};

export const useColors = (): [Colors, Dispatch<ColorsAction>] => {
  return useReducer(colorsReducer, initialColors);
};

type ColorsPickerProps = {
  colors: Colors;
  dispatchColors: Dispatch<ColorsAction>;
};

export const ColorsPicker: FC<ColorsPickerProps> = ({
  colors,
  dispatchColors,
}) => {
  const addColor = useCallback(() => {
    dispatchColors({ type: 'ADD_COLOR' });
  }, [dispatchColors]);

  const removeColor = useCallback(() => {
    dispatchColors({ type: 'REMOVE_LAST_COLOR' });
  }, [dispatchColors]);

  return (
    <div className="colors">
      <ValuePreview value={colors.length} />
      <span className="buttons">
        <Button onClick={addColor}>+</Button>
        <Button onClick={removeColor}>-</Button>
      </span>
      <div className="color-pickers">
        {colors.map((color, index) => (
          <ColorPicker key={index} {...{ color, index, dispatchColors }} />
        ))}
      </div>
      <style jsx>{`
        .colors {
          display: flex;
          align-items: flex-start;
        }
        .buttons {
          margin: 0 1rem;
        }
        .buttons :global(button:first-child) {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
        .buttons :global(button:last-child) {
          border-left: 0;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
        .color-pickers {
          max-width: 400px;
        }
        .color-pickers :global(input) {
          margin: 0 0.125rem;
        }
      `}</style>
    </div>
  );
};
