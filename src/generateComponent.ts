import {window, Uri} from 'vscode';

import {
  writeFile,
  getSetting,
  readFile,
  readDirectory,
  openFile,
} from './utilities';
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
  const needsComponentParentDir = getSetting<boolean>('needsComponentParentDir', false);
  
  // If user clicked on a components folder, we want to add our new component there
  if (!needsComponentParentDir || path.endsWith('components')) {
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
  const createTestFile = getSetting<boolean>  ('createTestFile', true);
  const createStoriesFile = getSetting<boolean>('createStoriesFile', false);
  const useIndexFile = getSetting<boolean>('useIndexFile', true);
  const importReact = getSetting<boolean>('importReact', false);
  const useCssModules = getSetting<boolean>('useCssModules', true);
  const usePropTypes = getSetting<boolean>('usePropTypes', true);

  // Write index file
  if(useIndexFile) {
    writeFile(
      `${directory}/${componentName}/index.${language}`,
      exportLineTemplate(componentName)
    );
  }

  // Write component file
  const componentPath = `${directory}/${componentName}/${componentName}.${language}x`;
  const componentPromise = writeFile(
    componentPath,
    reactFunctionComponentTemplate(componentName, stylesLanguage, importReact, useCssModules, language, usePropTypes)
  );

  // Write style file
  writeFile(
    `${directory}/${componentName}/${componentName}.${stylesLanguage}`,
    stylesTemplate(componentName, useCssModules)
  );

  // Write test file
  if (createTestFile) {
    writeFile(
      `${directory}/${componentName}/tests/${componentName}.test.${language}x`,
      testFileTemplate(componentName)
    );
  }

  // Write stories file
  if (createStoriesFile) {
    writeFile(
      `${directory}/${componentName}/${componentName}.stories.${language}x`,
      storiesTemplate(componentName, importReact)
    );
  }

  // Write components folder index file
  if (useIndexFile && !directory.endsWith('app/components')) {
    writeComponentsFolderIndexFile(directory, componentName, language);
  }

  await componentPromise;
  openFile(componentPath);
}

// This is the function that gets registered to our command
export async function generateComponent(uri?: Uri) {
  if (!uri) {
    return window.showErrorMessage('No file path found.');
  }

  const componentName = await window.showInputBox({
    prompt: 'Component name',
  });

  if (!componentName) {
    return window.showErrorMessage('No component name passed');
  }

  const directory = await directoryToAddComponent(uri);

  writeComponentFiles(directory, componentName);
}
