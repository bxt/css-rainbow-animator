import Head from 'next/head';
import { useColors, ColorsPicker } from '../components/colors';

export default function Home(): JSX.Element {
  const [colors, dispatchColors] = useColors();

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

        body {
          background: linear-gradient(
            90deg,
            ${[...colors, ...colors.slice(0, 2)].join(',')}
          );
          background-size: 100% 100%;

          -webkit-animation: doublerainbows 3s linear infinite;
          -moz-animation: doublerainbows 3s linear infinite;
          animation: doublerainbows 3s linear infinite;
        }
        /*
      @-webkit-keyframes doublerainbows {
          from {background-position:0% 50%}
          to {background-position:100% 50%}
      }
      @-moz-keyframes doublerainbows {
        from {background-position:0% 50%}
        to {background-position:100% 50%}
      }
      @keyframes doublerainbows {
        from {background-position:0% 50%}
        to {background-position:100% 50%}
      } */
      `}</style>
    </div>
  );
}
