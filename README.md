# React Redux Blog

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![MIT License](https://img.shields.io/github/license/ddellamico/react-redux-blog)](https://github.com/alan2207/bulletproof-react/blob/master/LICENCE)

A modern blog application built with React, Redux Toolkit, RTK Query, and TypeScript, featuring normalized state and optimistic updates.

## ⚡ Features

- **TypeScript** for static type checking and enhanced code quality.
- **Redux Toolkit** for efficient state management.
- **RTK Query** for streamlined data fetching and caching.
- **Normalized State** to manage complex relational data structures.
- **Optimistic Updates** for a seamless user experience.
- **Mock Service Worker (mswjs)** and **mswjs/data** for mocked API endpoints, enabling fast development without a real backend.
- **Vitest** and **React Testing Library** for unit and integration testing.

## <a name="start"></a>✨ Getting Started

```bash
npx degit ddellamico/react-redux-blog my-app
cd my-app

yarn #Install dependencies.
yarn create:env #Create a .env file
```

### Common Commands

- `yarn start` - start a development server with hot reload.
- `yarn build` - build for production. The generated files will be on the `dist` folder.
- `yarn preview` - locally preview the production build.
- `yarn test` - run unit and integration tests.
- `yarn test:coverage` - run unit and integration tests with coverage.
- `yarn type-check` - check for typescript errors.
- `yarn outdated` - update dependencies interactively.
- `yarn format` - format all files with Prettier.
- `yarn lint` - runs ESLint.
- `yarn create:env` - creates default envs.

## <a name="folder"></a>🗄️ Folder Structure and Code Organization

```
.
└── src/
    ├── assets                   → Assets folder can contain all the static files such as images, fonts, etc.
    ├── pages                    → Routes and pages
    ├── shared/
    │   ├── config               → All the global configuration, env variables etc. get exported from here and used in the app
    │   ├── helpers              → Any helper function that do not belong to a feature i.e. logging, generic storage (localstorage), etc.
    │   └── store                → Redux configuration
    ├── UI/
    │   ├── elements             → Basic and complex UI elements
    │   └── layout               → Page layouts used across the app
    └── features/                → Features used across the entire application
        └── Feature X/           → Optional: a folder container for a group of features
            ├── Feature A/
            │   ├── store        → Redux slice
            │   ├── hooks        → React hooks
            │   ├── components   → React components
            │   └── services     → Services consumed by redux
            ├── Feature B
            └── Feature C
```

## Contributing

Contributions are always welcome! If you have any ideas, suggestions, fixes, feel free to contribute. You can do that by going through the following steps:

1. Clone this repo
2. Create a branch: `git checkout -b your-feature`
3. Make some changes
4. Test your changes
5. Push your branch and open a Pull Request

## Acknowledgments

- Project initialized using [marcoturi's React Redux Boilerplate](https://github.com/marcoturi/react-redux-boilerplate/tree/main).
- Inspired by [this YouTube tutorial](https://www.youtube.com/watch?v=9P2IUx13MZI) on building a blog application with React and Redux Toolkit.

## License

[MIT](https://choosealicense.com/licenses/mit/)
