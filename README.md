# React component generator

A VS Code extension for generating new react component files with the following structure:

- `StartingComponent`
  - `/components`
    - `index.ts`
    - `/NewComponent`
      - `index.ts`
      - `NewComponent.ts`
      - `/tests`
        - `NewComponent.test.tsx`

## Features

Right click in the file editor or on a file in the explorer and click `Generate react component` to scaffold out a new React component with all the files you need.

Supports TypeScript and Javascript. Use the `language` setting to choose the language for the generated component.

<img width="417" alt="Generate react component appears as an option in the explorer right click menu" src="https://user-images.githubusercontent.com/14366097/100553487-1ecc0800-325c-11eb-929b-add9b82cac47.png">

## Development

1. Clone the repository with `git clone https://github.com/andrewmcgov/react-component-generator.git`
2. Install dependencies by running `yarn` in the project folder
3. With extension source open in VS Code, press `F5` to open a new VS Code window with the extension running. `F5` runs the code in `.vscode/launch.json`.
4. The extension code starts in `src/extension.ts`.
5. Check out the [VS Code API documentation](https://code.visualstudio.com/api) for more info about buinding extensions.

---

This extension was scaffolded with [Yeoman](https://yeoman.io/). Feel free to fork and tweak to your liking!
