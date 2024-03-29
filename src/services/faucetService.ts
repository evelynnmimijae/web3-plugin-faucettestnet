// src/services/faucetService.ts

import Web3 from 'web3';

export class FaucetService {
 private web3: Web3;
 private privateKey: string;
 private gasPrice: number;
 private gasLimit: number;

 constructor(network: string, privateKey: string, gasPrice: number, gasLimit: number) {
    this.web3 = new Web3(network);
    this.privateKey = privateKey;
    this.gasPrice = gasPrice;
    this.gasLimit = gasLimit;
 }

 // Existing methods...

 // Method to call a read-only contract method
 async callContractMethod(contractAddress: string, abi: any[], methodName: string, args: any[] = []): Promise<any> {
    try {
      // Validate contract address and ABI
      if (!this.web3.utils.isAddress(contractAddress)) {
        throw new Error('Invalid contract address');
      }
      if (!Array.isArray(abi)) {
        throw new Error('Invalid contract ABI');
      }

      const contract = new this.web3.eth.Contract(abi, contractAddress);
      const result = await contract.methods[methodName](...args).call();
      return result;
    } catch (error) {
      console.error('Error calling contract method:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
 }

 // Method to send a transaction to a contract method
 async sendContractTransaction(contractAddress: string, abi: any[], methodName: string, args: any[] = [], value: number = 0): Promise<any> {
    try {
      // Validate contract address and ABI
      if (!this.web3.utils.isAddress(contractAddress)) {
        throw new Error('Invalid contract address');
      }
      if (!Array.isArray(abi)) {
        throw new Error('Invalid contract ABI');
      }

      const contract = new this.web3.eth.Contract(abi, contractAddress);
      const account = this.web3.eth.accounts.privateKeyToAccount(this.privateKey);
      const tx = {
        from: account.address,
        to: contractAddress,
        data: contract.methods[methodName](...args).encodeABI(),
        value: this.web3.utils.toWei(value.toString(), 'ether'),
        gas: this.gasLimit,
        gasPrice: this.web3.utils.toWei(this.gasPrice.toString(), 'gwei'),
      };

      const signedTx = await this.web3.eth.accounts.signTransaction(tx, this.privateKey);
      const receipt = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      return receipt;
    } catch (error) {
      console.error('Error sending contract transaction:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
 }
}
