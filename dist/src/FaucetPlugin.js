"use strict";
// src/FaucetPlugin.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaucetPlugin = void 0;
const web3_1 = require("web3");
const faucet_1 = require("./faucet"); // Import the main faucet function
const database_1 = require("./database"); // Import Tableland database functions
class FaucetPlugin extends web3_1.Web3PluginBase {
    constructor() {
        super();
        this.pluginNamespace = "faucet";
        // Initialization logic here, if needed
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            // Initialization logic for the faucet plugin
            console.log("Faucet Plugin Initialized");
        });
    }
    requestEther(address, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if the address has already claimed Ether
            const hasClaimed = yield (0, database_1.checkAddressInTableland)(address);
            if (hasClaimed) {
                console.log('Address has already claimed Ether.');
                return;
            }
            // Send Ether to the address
            yield (0, faucet_1.requestEther)(address, amount);
            // Update the Tableland record to mark the address as having claimed Ether
            yield (0, database_1.updateTablelandRecord)(address);
            console.log('Ether sent and Tableland record updated.');
        });
    }
}
exports.FaucetPlugin = FaucetPlugin;
