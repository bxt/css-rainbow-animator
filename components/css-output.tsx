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

  const html = `<style>${css}\n</style>`;

  return (
    <>
      <pre>{css}</pre>
      <a
        href={`data:text/html,${encodeURIComponent(html)}`}
        download="animated-rainbow.html"
      >
        Download
      </a>
      <style jsx>{`
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
      <style jsx global>{`
        body {
          ${bodyCss}
          animation-play-state: ${paused ? 'paused' : 'running'};
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
