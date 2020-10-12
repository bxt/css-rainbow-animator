import { FC, useCallback, useState } from 'react';
import css from 'styled-jsx/css';

type CssOutputProps = {
  colors: Array<string>;
  paused: boolean;
  swathSize: number;
  timePerSwath: number;
};

export const CssOutput: FC<CssOutputProps> = ({
  colors,
  paused,
  swathSize,
  timePerSwath,
}) => {
  const [showCss, setShowCss] = useState(false);

  const toggleCss = useCallback((event) => {
    event.preventDefault();
    setShowCss((showCss) => !showCss);
  }, []);

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

  const html = `<style>${css}\n</style>\n\n${fullscreenHelperScript}`;

  return (
    <>
      <p>
        <a
          href={`data:text/html,${encodeURIComponent(html)}`}
          download="animated-rainbow.html"
        >
          Download
        </a>
        {' – '}
        <a
          href={`data:text/plain,${encodeURIComponent(css)}`}
          download="animated-rainbow.css"
          onClick={toggleCss}
        >
          {showCss ? 'Hide' : 'Show'} CSS
        </a>
      </p>
      {showCss ? <pre>{css}</pre> : null}
      <style jsx>{styles}</style>
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

const styles = css`
  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    line-height: 1.2;
    background: #ddd;
    border-radius: 5px;
  }
`;

const fullscreenHelperScript = `
<script>
  document.addEventListener("click", toggleFullScreen, false);

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
</script>
`;
