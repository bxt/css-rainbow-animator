import { Dispatch, FC, useCallback, useReducer } from 'react';

type Color = string;

type Colors = Array<Color>;

type ColorsAction =
  | { type: 'ADD_COLOR' }
  | { type: 'REMOVE_LAST_COLOR' }
  | { type: 'CHANGE_COLOR'; index: number; color: Color };

const initialColors: Colors = ['#ff9900', '#9900ff', '#00ff99'];
const defaultNewColor: Color = '#ff0000';

const colorsReducer = (state: Colors, action: ColorsAction) => {
  switch (action.type) {
    case 'ADD_COLOR':
      return [...state, defaultNewColor];
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
  index: number;
  dispatchColors: Dispatch<ColorsAction>;
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
    <fieldset>
      <legend>Colors</legend>
      {colors.length}
      <button onClick={addColor}>+</button>
      <button onClick={removeColor}>-</button>
      {colors.map((color, index) => (
        <ColorPicker key={index} {...{ color, index, dispatchColors }} />
      ))}
    </fieldset>
  );
};
