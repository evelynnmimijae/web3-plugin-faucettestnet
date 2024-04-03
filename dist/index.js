"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplatePlugin = void 0;
const web3_1 = require("web3");
const FaucetPlugin_1 = require("./FaucetPlugin");
// Initialize the Faucet Plugin
const faucetPlugin = new FaucetPlugin_1.FaucetPlugin();
// Example usage
faucetPlugin.init();
class TemplatePlugin extends web3_1.Web3PluginBase {
    constructor() {
        super(...arguments);
        this.pluginNamespace = "template";
    }
    test(param) {
        console.log(param);
    }
}
exports.TemplatePlugin = TemplatePlugin;
