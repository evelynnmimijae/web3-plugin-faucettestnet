import { Web3PluginBase } from "web3";
import FaucetPlugin from './FaucetPlugin';

// Initialize the Faucet Plugin
const faucetPlugin = new FaucetPlugin();

// Example usage
faucetPlugin.init();

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
  }
}
