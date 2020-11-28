// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {commands, ExtensionContext} from 'vscode';
import {generateComponent} from './generateComponent';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
  console.log('React component generator is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const registeredCommand = commands.registerCommand(
    'extension.generateComponent',
    generateComponent
  );

  context.subscriptions.push(registeredCommand);
}

// this method is called when your extension is deactivated
export function deactivate() {}
