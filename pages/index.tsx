import Head from 'next/head';
import { useCallback, useState } from 'react';
import css from 'styled-jsx/css';
import { useColors, ColorsPicker } from '../components/colors';
import { CssOutput } from '../components/css-output';
import { Button } from '../components/button';
import { RangeAndInvertedRange } from '../components/range-and-inverted-range';

export default function Home(): JSX.Element {
  const [colors, dispatchColors] = useColors();
  const [paused, setPaused] = useState(false);
  const [swathSize, setSwathSize] = useState(1);
  const [timePerSwath, setTimePerSwath] = useState(1);

  const togglePaused = useCallback(() => {
    setPaused(!paused);
  }, [paused]);

  return (
    <div className="container">
      <Head>
        <title>CSS Rainbow Animator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          <img
            src="/rainbow.svg"
            alt="CSS Rainbow Animator Logo"
            className="logo"
          />
          CSS Rainbow Animator
        </h1>

        <fieldset>
          <legend>Colors</legend>
          <ColorsPicker {...{ colors, dispatchColors }} />
        </fieldset>

        <fieldset>
          <legend>Swath size</legend>
          <RangeAndInvertedRange
            value={swathSize}
            onChange={setSwathSize}
            label="Swath with in screen sizes:"
            invertedLabel="Swaths per screen:"
          />
        </fieldset>

        <fieldset>
          <legend>Animation</legend>
          <RangeAndInvertedRange
            value={timePerSwath}
            onChange={setTimePerSwath}
            label="Seconds per swath:"
            invertedLabel="Swaths per second:"
          />
          <br />
          <Button onClick={togglePaused}>{paused ? 'play' : 'pause'}</Button>
        </fieldset>

        <fieldset>
          <legend>Result</legend>
          <CssOutput {...{ colors, paused, swathSize, timePerSwath }} />
        </fieldset>
      </main>

      <style jsx>{styles}</style>
      <style jsx global>
        {globalStyles}
      </style>
    </div>
  );
}

const styles = css`
  .container {
    min-height: 100vh;
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  main,
  .logo {
    background: white;
    border-radius: 5px;
    box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.25);
  }

  main {
    padding: 1rem 2rem 2rem 2rem;
    margin: 7rem 0.5rem;
    position: relative;
  }

  @media (min-width: 768px) {
    main {
      padding: 2rem 4rem 4rem 4rem;
    }
  }

  .logo {
    padding: 1rem 1rem 0 1rem;
    position: absolute;
    top: -50px;
    left: 50%;
    margin-left: -40px;
  }

  @media (min-width: 768px) {
    .logo {
      padding: 2rem 2rem 0 2rem;
      margin-left: -56px;
    }
  }

  h1 {
    font-size: 20px;
    text-align: center;
    margin-bottom: 0.5rem;
  }

  @media (min-width: 768px) {
    h1 {
      font-size: 48px;
      margin-bottom: 1rem;
    }
  }

  fieldset {
    padding-top: 0.5rem;
    margin-bottom: 1.5rem;
    border: none;
  }

  legend {
    font-weight: bold;
    text-transform: uppercase;
    color: #999;
    font-size: 0.7em;
  }
`;

export const globalStyles = css.global`
  html,
  body {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    line-height: 1.6;
  }

  * {
    padding: 0;
    margin: 0;
  }
`;
