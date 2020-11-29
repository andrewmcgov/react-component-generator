import {window, workspace, Uri} from 'vscode';
import {
  exportLineTemplate,
  reactFunctionComponentTemplate,
  testFileTemplate,
} from './templates';

function writeFile(path: string, content: string) {
  workspace.fs.writeFile(Uri.file(path), new Uint8Array(Buffer.from(content)));
}

async function readFile(path: string) {
  try {
    const file = await workspace.fs.readFile(Uri.file(path));
    return file.toString();
  } catch {
    return null;
  }
}

async function readDirectory(path: string) {
  try {
    const directory = await workspace.fs.readDirectory(Uri.file(path));
    return directory;
  } catch {
    return null;
  }
}

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
  const pathArray = uri.path.split('/');
  pathArray.pop();
  const newPath = pathArray.join('/');

  if (newPath.endsWith('components')) {
    return newPath;
  }

  return newPath.concat('/components');
}

async function writeComponentsFolderIndexFile(
  directory: string,
  componentName: string
) {
  const componentsFolderIndexPath = `${directory}/index.ts`;
  const componentsFolderIndexContents = await readFile(
    componentsFolderIndexPath
  );

  if (componentsFolderIndexContents) {
    writeFile(
      componentsFolderIndexPath,
      componentsFolderIndexContents.concat(exportLineTemplate(componentName))
    );
  } else {
    writeFile(componentsFolderIndexPath, exportLineTemplate(componentName));
  }
}

async function writeComponentFiles(directory: string, componentName: string) {
  // Write component index file
  writeFile(
    `${directory}/${componentName}/index.ts`,
    exportLineTemplate(componentName)
  );

  // Write component file
  writeFile(
    `${directory}/${componentName}/${componentName}.tsx`,
    reactFunctionComponentTemplate(componentName)
  );

  // Write component file
  writeFile(
    `${directory}/${componentName}/tests/${componentName}.test.tsx`,
    testFileTemplate(componentName)
  );

  // Write components folder index file
  writeComponentsFolderIndexFile(directory, componentName);
}

// This is the function that gets registered to our command
export async function generateComponent(uri?: Uri) {
  if (!uri) {
    return window.showErrorMessage('No file path found.');
  }

  const componentName = await window.showInputBox();

  if (!componentName) {
    return console.error('No component name passed');
  }

  const directory = await directoryToAddComponent(uri);

  writeComponentFiles(directory, componentName);
}
