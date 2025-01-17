import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "betterSEO" is now active!');
	const disposable = vscode.commands.registerCommand('betterSEO.helloWorld', () => {
		vscode.window.showInformationMessage('BetterSEO is Working!');
	});

	context.subscriptions.push(disposable);
}
export function deactivate() {};