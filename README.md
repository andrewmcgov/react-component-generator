# React component generator

A VS Code extension for generating new React component files with the following structure:

- `StartingComponent`
  - `/components`
    - `index.ts`
    - `/NewComponent`
      - `index.ts`
      - `NewComponent.tsx`
      - `NewComponent.stories.tsx` (optional)
      - `/tests`
        - `NewComponent.test.tsx`

## Features

Right click in the file editor or on a file in the explorer and click `Generate React component` to scaffold out a new React component with all the files you need.

<img width="336" alt="Screen Shot of the contextual file explorer menu featuring items added by the extension" src="https://user-images.githubusercontent.com/14366097/117344991-0b107780-ae74-11eb-9281-f15025134d10.png">

Right click in the file editor or on a file in the explorer and click `Generate Storybook stories file` to add a stories file to an existing component.

## Settings

- **Language** - Specifies if components should be generated in TypeScript or JavaScript.
- **Styles Language** - Specifies what language will be used for styles.
- **Create Stories File** - Specifies if a stories file should be generated with the component.
- **Use Index File** - Specifies if the components folder should have an index file to export all of its components. Does not add or update the index file at `app/components/index`
- **Import React** - Specifies if React should be imported in generated components and stories. The React import is not needed if your app is using [the new JSX Transform](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#whats-different-in-the-new-transform).

## Development

1. Clone the repository with `git clone https://github.com/andrewmcgov/react-component-generator.git`
2. Install dependencies by running `yarn` in the project folder
3. With extension source open in VS Code, press `F5` to open a new VS Code window with the extension running. `F5` runs the code in `.vscode/launch.json`.
4. The extension code starts in `src/extension.ts`.
5. Check out the [VS Code API documentation](https://code.visualstudio.com/api) for more info about buinding extensions.

---

This extension was scaffolded with [Yeoman](https://yeoman.io/). Feel free to fork and tweak to your liking!
