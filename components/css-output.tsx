import { FC } from 'react';

type CssOutputProps = {
  paused: boolean;
  colors: Array<string>;
  swathSize: number;
  timePerSwath: number;
};

export const CssOutput: FC<CssOutputProps> = ({
  paused,
  colors,
  swathSize,
  timePerSwath,
}) => {
  const count = colors.length;

  const backgroundSize = count * swathSize;
  const duration = timePerSwath * count;
  const endPosition = backgroundSize / (backgroundSize - 1);

  const bodyCss = `
    background: linear-gradient(
      90deg,
      ${[...colors, ...colors.slice(0, 1)].join(',')}
    );
    background-size: ${backgroundSize * 100}% ${backgroundSize * 100}%;

    animation: doublerainbows ${duration}s linear infinite;
    animation-play-state: ${paused ? 'paused' : 'running'};
`;

  const css = `
    body {
      ${bodyCss}
    }
    @keyframes doublerainbows {
      from {
        background-position: 0% 50%;
      }
      to {
        background-position: ${endPosition * 100}% 50%;
      }
    }
  `;

  return (
    <>
      <pre>{css}</pre>
      <style jsx global>{`
        body {
          ${bodyCss}
        }
        @keyframes doublerainbows {
          from {
            background-position: 0% 50%;
          }
          to {
            background-position: ${endPosition * 100}% 50%;
          }
        }
      `}</style>
    </>
  );
};
