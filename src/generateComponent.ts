import {window, Uri} from 'vscode';

import {writeFile, getSetting, readFile, readDirectory} from './utilities';
import {
  exportLineTemplate,
  reactFunctionComponentTemplate,
  testFileTemplate,
  stylesTemplate,
  storiesTemplate,
} from './templates';
import {Language, StyleLanguage} from './types';

async function directoryToAddComponent(uri: Uri) {
  const {path} = uri;

  // If user clicked on a components folder, we want to add our new component there
  if (path.endsWith('components')) {
    return path;
    // If user clicks on a parent folder, we want to add our component to ParentFolder/components
  } else if (await readDirectory(path)) {
    return path.concat('/components');
  }

  // Otherwise, we want to work in the ./components folder
  const pathArray = path.split('/');
  pathArray.pop();
  const newPath = pathArray.join('/');

  if (newPath.endsWith('components')) {
    return newPath;
  }

  return newPath.concat('/components');
}

async function writeComponentsFolderIndexFile(
  directory: string,
  componentName: string,
  language: Language
) {
  const componentsFolderIndexPath = `${directory}/index.${language}`;
  const componentsFolderIndexContents = await readFile(
    componentsFolderIndexPath
  );

  if (componentsFolderIndexContents) {
    writeFile(
      componentsFolderIndexPath,
      componentsFolderIndexContents.concat(
        exportLineTemplate(componentName, true)
      )
    );
  } else {
    writeFile(
      componentsFolderIndexPath,
      exportLineTemplate(componentName, true)
    );
  }
}

async function writeComponentFiles(directory: string, componentName: string) {
  const language = getSetting<Language>('language', Language.typeScript);
  const stylesLanguage = getSetting<StyleLanguage>(
    'stylesLanguage',
    StyleLanguage.scss
  );
  const createStoriesFile = getSetting<boolean>('createStoriesFile', false);
  const verboseStoriesComments = getSetting<boolean>(
    'verboseStoriesComments',
    true
  );
  const useIndexFile = getSetting<boolean>('useIndexFile', true);

  // Write index file
  writeFile(
    `${directory}/${componentName}/index.${language}`,
    exportLineTemplate(componentName)
  );

  // Write component file
  writeFile(
    `${directory}/${componentName}/${componentName}.${language}x`,
    reactFunctionComponentTemplate(componentName)
  );

  // Write style file
  writeFile(
    `${directory}/${componentName}/${componentName}.${stylesLanguage}`,
    stylesTemplate(componentName)
  );

  // Write test file
  writeFile(
    `${directory}/${componentName}/tests/${componentName}.test.${language}x`,
    testFileTemplate(componentName)
  );

  // Write stories file
  if (createStoriesFile) {
    writeFile(
      `${directory}/${componentName}/${componentName}.stories.${language}x`,
      storiesTemplate(componentName, verboseStoriesComments)
    );
  }

  // Write components folder index file
  if (useIndexFile) {
    writeComponentsFolderIndexFile(directory, componentName, language);
  }
}

// This is the function that gets registered to our command
export async function generateComponent(uri?: Uri) {
  if (!uri) {
    return window.showErrorMessage('No file path found.');
  }

  const componentName = await window.showInputBox();

  if (!componentName) {
    return window.showErrorMessage('No component name passed');
  }

  const directory = await directoryToAddComponent(uri);

  writeComponentFiles(directory, componentName);
}
