// src/FaucetPlugin.ts

import { Web3PluginBase } from "web3";
import { requestEther } from './faucet'; // Import the main faucet function
import { checkAddressInTableland, updateTablelandRecord } from './database'; // Import Tableland database functions

export class FaucetPlugin extends Web3PluginBase {
  public pluginNamespace = "faucet";

  constructor() {
    super();
    // Initialization logic here, if needed
  }

  public async init(): Promise<void> {
    // Initialization logic for the faucet plugin
    await createFaucetRequestsTable(); // Ensure the table exists
    console.log("Faucet Plugin Initialized");
  }

  public async requestEther(address: string, amount: number): Promise<void> {
    if (!address || typeof address !== 'string' || !this.isValidAddress(address)) {
      throw new Error('Invalid request: address or amount is missing or invalid.');
    }
    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error('Invalid request: address or amount is missing or invalid.');
    }

    // Check if the address has already claimed Ether
    const hasClaimed = await checkAddressInTableland(address);
    if (hasClaimed) {
      console.log('Address has already claimed Ether.');
      return;
    }

    // Send Ether to the address
    await requestEther(address, amount);

    // Update the Tableland record to mark the address as having claimed Ether
    await updateTablelandRecord(address);

    console.log('Ether sent and Tableland record updated.');
  }

  private isValidAddress(address: string): boolean {
    // Implement address validation logic
    // This is a placeholder for actual validation logic
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  }
}
