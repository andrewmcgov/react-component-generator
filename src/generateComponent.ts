import {window, workspace, Uri} from 'vscode';

export async function generateComponent(uri?: Uri) {
  if (!uri) {
    return window.showErrorMessage('No file path found.');
  }

  const componentName = await window.showInputBox();

  if (!componentName) {
    return console.error('No component name passed');
  }

  const directory = getDirectory(uri);

  writeComponentFiles(directory, componentName);
}

function writeComponentFiles(directory: string, componentName: string) {
  workspace.fs.writeFile(
    Uri.file(`${directory}/components/${componentName}/index.ts`),
    new Uint8Array()
  );
  workspace.fs.writeFile(
    Uri.file(`${directory}/components/${componentName}/${componentName}.ts`),
    new Uint8Array()
  );
}

function getDirectory(uri: Uri) {
  const pathArray = uri.path.split('/');
  pathArray.pop();
  return pathArray.join('/');
}

function writeFile(name: string) {
  workspace.fs.writeFile(Uri.file(`/temp/${name}.ts`), new Uint8Array());
}
