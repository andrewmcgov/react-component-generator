// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { commands, window, ExtensionContext } from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
  console.log("React component generator is now active!");

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const generateComponent = commands.registerCommand(
    "react-component-generator.generateComponent",
    async () => {
      // Code in here is executed every time the command is executed
      const componentName = await window.showInputBox();

      if (componentName) {
        window.showInformationMessage(
          `Your component will be called ${componentName}.`
        );
        console.log({ componentName });
      } else {
        console.error("No component name passed");
      }
    }
  );

  context.subscriptions.push(generateComponent);
}

// this method is called when your extension is deactivated
export function deactivate() {}
