import { Web3PluginBase } from "web3";
export declare class FaucetPlugin extends Web3PluginBase {
    pluginNamespace: string;
    constructor();
    init(): Promise<void>;
    requestEther(address: string, amount: number): Promise<void>;
}
