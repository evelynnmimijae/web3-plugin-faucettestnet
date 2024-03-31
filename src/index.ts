// src/index.ts

import { Web3PluginBase } from "web3";
import FaucetPlugin from './FaucetPlugin';
import { requestEther } from './faucet'; // Import the main faucet function

// Initialize the Faucet Plugin
const faucetPlugin = new FaucetPlugin();

// Example usage
faucetPlugin.init();

// Add a method to the FaucetPlugin class to handle Ether requests
class FaucetPluginWithFaucet extends FaucetPlugin {
 public async requestEther(address: string, amount: number): Promise<void> {
    await requestEther(address, amount);
 }
}

// Initialize the Faucet Plugin with the extended class
const faucetPluginWithFaucet = new FaucetPluginWithFaucet();

// Example usage of the extended FaucetPlugin
faucetPluginWithFaucet.init();
faucetPluginWithFaucet.requestEther('0xYourEthereumAddress', 1)
 .then(() => console.log('Ether request processed.'))
 .catch(console.error);

export class TemplatePlugin extends Web3PluginBase {
 public pluginNamespace = "template";

 public test(param: string): void {
    console.log(param);
 }
}

// Module Augmentation
declare module "web3" {
 interface Web3Context {
    template: TemplatePlugin;
    faucet: FaucetPluginWithFaucet; // Add the faucet plugin to the Web3Context interface
 }
}
