[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![MIT License](https://img.shields.io/github/license/ddellamico/react-redux-blog)](https://github.com/alan2207/bulletproof-react/blob/master/LICENCE)

A meticulously crafted, extensible, and robust architecture for constructing production-grade React applications.
The project aim to provide guidelines on the development key points of a long term React project:

- A well-defined **folder structure and code organization** for enhanced maintainability and scalability, with particular attention to the possibility of splitting and sharing components across projects.
- A robust **state management** approach to effectively manage data and maintain application code SOLID
- An automated **release system** to streamline the deployment process and ensure seamless updates with automatic changelog, version bump and tags
- Consistent **code formatting and styling** to enhance code readability, maintain consistency, and promote adherence to best practices
- A **headless theme**, with few dependencies and focus on accessibility

## ⚡ Features

- Blazing fast build system: [Vite](https://vitejs.dev/) + [React SWC](https://github.com/vitejs/vite-plugin-react-swc) + [Yarn 4](https://yarnpkg.com/getting-started/install) + [TypeScript](https://www.typescriptlang.org) with [absolute imports](https://github.com/aleclarson/vite-tsconfig-paths)
- App State: [Redux Toolkit 2](https://redux-toolkit.js.org/)
- Theme: [Radix](https://www.radix-ui.com/) + [Shadcn/ui](https://ui.shadcn.com/) + [Tailwind 3](https://tailwindcss.com/)
- Format and Style: [Eslint](https://eslint.org/) + [Prettier](https://prettier.io/) with a [prettier plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) that automatically sorts tailwind classes.
- Release flow: [Husky](https://github.com/typicode/husky) + [Commitlint](https://commitlint.js.org/) + [Semantic-release](https://github.com/semantic-release/semantic-release)
- Mocked server for fast development: [MSW](https://mswjs.io/)
- Tests: E2E tests with [Cucumber](https://cucumber.io/docs/installation/javascript/) + [Playwright](https://playwright.dev/), and unit and integration tests with [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/).

## <a name="start"></a>✨ Getting Started

```bash
npx degit ddellamico/react-redux-blog my-app
cd my-app

# To enable yarn 4 follow the instruction here: https://yarnpkg.com/getting-started/install
yarn #Install dependencies.
yarn create:env #Create a .env file
```

### Common Commands

- `yarn start` - start a development server with hot reload.
- `yarn build` - build for production. The generated files will be on the `dist` folder.
- `yarn preview` - locally preview the production build.
- `yarn test` - run unit and integration tests.
- `yarn test:coverage` - run unit and integration tests with coverage.
- `yarn e2e:local` - run E2E test locally. Make sure to run yarn start before in a separate shell.
- `yarn type-check` - check for typescript errors.
- `yarn outdated` - update dependencies interactively.
- `yarn format` - format all files with Prettier.
- `yarn lint` - runs ESLint.
- `yarn create:env` - creates default envs.

## <a name="folder"></a>🗄️ Folder Structure and Code Organization

TLDR; Embrace the [vertical slice architecture](https://www.jimmybogard.com/vertical-slice-architecture/)

The vertical slice architecture is the recommended structure. Each feature encapsulates components, state management (redux), API interactions, and hooks. This architecture offers several compelling advantages:

1. Reduced Coupling: By isolating each feature within its own slice, dependencies between different parts of the codebase are minimized. This foster improved code comprehension, facilitates code modifications, and mitigates the risk of introducing bugs during changes.
2. Enhanced Maintainability: by simplifying the process of locating code pertaining to specific features. This stems from the organization of feature-specific code within a single slice, rather than scattering it across multiple layers or components.
3. Accelerated Development: by enabling parallel work on different features. Each feature can be developed and tested independently, fostering a more streamlined development process.
4. Streamlined Testing: Testing becomes more manageable due to the ability to isolate each feature for testing purposes.
5. Improved Onboarding: facilitates a smoother onboarding experience for new developers. The organization of code around user features, rather than technical layers or components, aligns with developers' familiarity.
6. Packetization: Features can be effortlessly moved and shared across projects.

Over the years, different structures were born based on different layers of features, including [Atomic design](https://atomicdesign.bradfrost.com/chapter-2/#:~:text=Molecules%20are%20groups%20of%20two,functioning%20together%20as%20a%20unit.) or [Feature slice](https://feature-sliced.design/). However, dividing code into numerous layers of features reduce the developer experience by the constant navigation between multiple folders. Also, the moment you want to move the logic to another package the refactor is also more invasive.

If you need to re-use features across projects, within the following structure is very easy to move the folders in a monorepo package without much re-factoring (thanks also to the usage of alias in imports).

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

## License

[MIT](https://choosealicense.com/licenses/mit/)
