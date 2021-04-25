import {window, Uri} from 'vscode';
import {storiesTemplate} from './templates';
import {Language} from './types';

import {writeFile, readDirectory, getSetting, openFile} from './utilities';

async function pathToAddStories(uri: Uri, componentName: string) {
  const language = getSetting<Language>('language', Language.typeScript);

  const {path} = uri;

  // if the path is a folder we want to add the stories in the folder
  if (await readDirectory(path)) {
    return `${path}/${componentName}.stories.${language}`;
  }

  // if the path is a file we want add the stories beside the file
  const pathArray = path.split('/');
  pathArray.pop();
  const newPath = pathArray.join('/');

  return `${newPath}/${componentName}.stories.${language}x`;
}

async function suggestedComponentName(path: string) {
  if (await readDirectory(path)) {
    return '';
  }

  const pathArray = path.split('/');
  const filename = pathArray.pop();
  return filename?.split('.')[0];
}

export async function generateStories(uri?: Uri) {
  const verboseStoriesComments = getSetting<boolean>(
    'verboseStoriesComments',
    true
  );
  const singleQoute = getSetting<boolean>('singleQuote', true);

  if (!uri) {
    return window.showErrorMessage('No file path found.');
  }

  const componentName = await window.showInputBox({
    prompt: 'Component name',
    value: await suggestedComponentName(uri.path),
  });

  if (!componentName) {
    return window.showErrorMessage('No component name passed');
  }

  const path = await pathToAddStories(uri, componentName);

  await writeFile(path, storiesTemplate(componentName, verboseStoriesComments, singleQoute));
  openFile(path);
}
