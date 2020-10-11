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
            alt="CSS Rainbow Animator Logo"
            className="logo"
            src="/rainbow.svg"
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
            invertedLabel="Swaths per screen:"
            label="Swath with in screen sizes:"
            onChange={setSwathSize}
            value={swathSize}
          />
        </fieldset>

        <fieldset>
          <legend>Animation</legend>
          <RangeAndInvertedRange
            invertedLabel="Swaths per second:"
            label="Seconds per swath:"
            onChange={setTimePerSwath}
            value={timePerSwath}
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
    align-items: center;
    display: flex;
    justify-content: center;
    max-width: 100%;
    min-height: 100vh;
  }

  main,
  .logo {
    background: white;
    border-radius: 5px;
    box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.25);
  }

  main {
    margin: 7rem 0.5rem;
    padding: 1rem 2rem 2rem 2rem;
    position: relative;
  }

  @media (min-width: 768px) {
    main {
      padding: 2rem 4rem 4rem 4rem;
    }
  }

  .logo {
    left: 50%;
    margin-left: -40px;
    padding: 1rem 1rem 0 1rem;
    position: absolute;
    top: -50px;
  }

  @media (min-width: 768px) {
    .logo {
      margin-left: -56px;
      padding: 2rem 2rem 0 2rem;
    }
  }

  h1 {
    font-size: 20px;
    margin-bottom: 0.5rem;
    text-align: center;
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
    color: #999;
    font-size: 0.7em;
    font-weight: bold;
    text-transform: uppercase;
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
    margin: 0;
    padding: 0;
  }
`;
