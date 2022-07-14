# React component generator

A VS Code extension for generating new React component files with the following structure:

- `StartingComponent`
  - `/components`
    - `/NewComponent`
      - `index.ts`
      - `NewComponent.tsx`

## Features

Right click in the file editor or on a file in the explorer and click `Generate React component 🗿` That's it.

## Development

1. Clone the repository with `git clone https://github.com/andrewmcgov/react-component-generator.git`
2. Install dependencies by running `yarn` in the project folder
3. With extension source open in VS Code, press `F5` to open a new VS Code window with the extension running. `F5` runs the code in `.vscode/launch.json`.
4. The extension code starts in `src/extension.ts`.
5. Check out the [VS Code API documentation](https://code.visualstudio.com/api) for more info about buinding extensions.
