CSS Rainbow Animator
====================

This is a small web app that allows you to generate animated rainbow gradients. Simply configure all the parameters you need and then click on download to get a web site that will just display your gradient animation. If you are not in the mood for rainbows, that's also fine, you can adjust colors and speeds as you wish. In any way you can create your own light mood for meditation, listening to music, whatever.

Developing
----------

This is a web site that uses web technologies like [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Next.js](https://nextjs.org/), [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) to assemble some browser-provided components like [color inputs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color), [CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations) and – of course – [color gradients](https://developer.mozilla.org/de/docs/Web/CSS/linear-gradient)!

To get started run

```shell
npm install
```

Developing works best if you use an IDE with TypeScript and ESLint support built in. Then just start the dev server:

```shell
npm run dev
```

The server will preview your changes at http://localhost:3000/css-rainbow-animator and refresh the components as you do changes.

Before committing, you should run the linters, just in case you missed something:

```shell
npm run lint
```

In the end you can build and export all the required files to the `out` directory using:

```shell
npm run build
```

That's it!
