import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const outputChannel = vscode.window.createOutputChannel('Custom Open URL');

  const disposable = vscode.commands.registerCommand('custom-open-command', (arg: string) => {
    try {
      outputChannel.appendLine(`Custom open command has got the arg: ${arg}`);
      outputChannel.show();

      vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(arg));
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
