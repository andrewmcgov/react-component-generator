import {window, workspace, Uri} from 'vscode';

export async function writeFile(path: string, content: string) {
  return workspace.fs.writeFile(
    Uri.file(path),
    new Uint8Array(Buffer.from(content))
  );
}

export function getSetting<T>(key: string, defaultValue: T): T {
  const value: T | undefined = workspace
    .getConfiguration('reactComponentGenerator')
    .get(key);

  return value === undefined ? defaultValue : value;
}

export async function readFile(path: string) {
  try {
    const file = await workspace.fs.readFile(Uri.file(path));
    return file.toString();
  } catch {
    return null;
  }
}

export async function readDirectory(path: string) {
  try {
    const directory = await workspace.fs.readDirectory(Uri.file(path));
    return directory;
  } catch {
    return null;
  }
}

export function openFile(path: string) {
  workspace.openTextDocument(Uri.file(path)).then((doc) => {
    window.showTextDocument(doc);
  });
}
