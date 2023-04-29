import * as vscode from "vscode";
import * as fs from "fs";

export function activate(context: vscode.ExtensionContext) {
  const outputChannel = vscode.window.createOutputChannel('Custom Open URL');

  const disposable = vscode.commands.registerCommand('custom-open-command', (arg: string) => {
    try {
      outputChannel.clear();
      outputChannel.appendLine(`Custom open command has got the arg: ${arg}`);
      outputChannel.show();

      const url = vscode.Uri.parse(arg);
      if (!fs.existsSync(url.path)) {
        outputChannel.appendLine(`The file was not found by path: ${url.path}, maybe it is a web url`);
        outputChannel.show();
        // do not return, because we want to open the url anyway (maybe it is a web url) 
      }

      vscode.commands.executeCommand('vscode.open', url);
    } catch (error) {
      if (error instanceof Error) {
        outputChannel.appendLine(error.message);
        outputChannel.show();
      }
    }
  }
  );
  context.subscriptions.push(disposable);
}

export function deactivate() { }
