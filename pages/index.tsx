import Head from 'next/head';
import { useCallback, useState } from 'react';
import { useColors, ColorsPicker } from '../components/colors';
import { CssOutput } from '../components/css-output';
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
        <h1 className="title">
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
            label="Seconds per swath"
            invertedLabel="Swaths per second"
          />
          <br />
          <button onClick={togglePaused}>{paused ? 'play' : 'pause'}</button>
        </fieldset>
        <CssOutput {...{ colors, paused, swathSize, timePerSwath }} />
      </main>

      <style jsx>{``}</style>

      <style jsx global>{`
        html,
        body {
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          padding: 0;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
