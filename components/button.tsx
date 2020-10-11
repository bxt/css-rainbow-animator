import { FC } from 'react';

type ButtonProps = {
  onClick: () => void;
};

export const Button: FC<ButtonProps> = (buttonProps) => {
  return (
    <>
      <button {...buttonProps} />
      <style jsx>{`
        button {
          font-size: inherit;
          background: #ddd;
          border-radius: 5px;
          border: 0.0525rem #999 solid;
          padding: 0.25rem 0.5rem;
        }
      `}</style>
    </>
  );
};
