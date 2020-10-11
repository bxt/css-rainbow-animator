import Head from 'next/head';
import { useCallback, useState } from 'react';
import { useColors, ColorsPicker } from '../components/colors';
import { CssOutput } from '../components/css-output';

export default function Home(): JSX.Element {
  const [colors, dispatchColors] = useColors();
  const [paused, setPaused] = useState(false);

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
        <ColorsPicker {...{ colors, dispatchColors }} />
        <button onClick={togglePaused}>{paused ? 'play' : 'pause'}</button>
        <CssOutput {...{ colors, paused }} />
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
