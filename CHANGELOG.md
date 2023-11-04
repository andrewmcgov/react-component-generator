# Change Log

All notable changes to this extension will be documented in this file.

## [Unreleased]

## [1.1.1] - 2023-11-03

### Added

- Updated generated Storybook stories file to support [CSF3](https://storybook.js.org/blog/storybook-csf3-is-here/).
- Removed verbose stories comments setting
- Changed the default value of styles language to CSS

## [1.1.0] - 2022-11-16

### Added

- New setting to include or exclude the React import in generated components and stories. The React import is not needed if your app is using [the new JSX Transform](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#whats-different-in-the-new-transform)

## [1.0.8] - 2022-10-27

- Updated storybook web docs link

## [1.0.7] - 2022-09-29

- Removes title from `Meta` object in stories template
- Uses `import type` for imports from storybook in stories template

## [1.0.6] - 2022-02-22

- Import StoryFn instead of Story type in storybook template

## [1.0.5] - 2021-11-01

- Use separate type import in Storybook stories template

## [1.0.4] - 2021-09-07

- Type the `meta` value instead of casting in Storybook template

## [1.0.3] - 2021-05-17

- Fixed issue with styles import path when using a styles extension other than `.scss`

## [1.0.2] - 2021-05-07

- Fix a few typos

## [1.0.1] - 2021-05-06

- Move commads lower in list of menu items so we don't take over the 'new file' spot

## [1.0.0] - 2021-04-14

### Added

- Setting to generate a stories file while generating a component
- New command to add a stories file to an existing component
- Add verbose story comments setting

### Changed

- Use named exports everywhere
- Import the styles and add className={styles.ComponentName} to the rendered div in the generated component
- Pre-populate the Sass file with a .ComponentName rule
- Declare an interface named ComponentNameProps in the generated component
- Use export \* …. in the ComponentName/index.ts file
- No longer update index file at `app/components/index.ts`
- Open the generated component file

### Removed

- Use default export setting
- Generate styles and generate test settings - both are always generated now

## [0.1.1] - 2021-01-19

### Fixed

- Fix issue when importing a component exported as default into the generated test file

## [0.1.0] - 2021-01-18

### Added

- Setting to specify if a styles file should be generated
- Setting to specify the language of the generated styles file
- Setting to specify if a components folder index file should be used
- Setting to speicify if a test file should be generated
- Setting to specify if the generated component should exported as default

## [0.0.2] - 2020-09-29

- Initial Release

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.
