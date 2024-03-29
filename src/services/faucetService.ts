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

 async sendTransaction(to: string, amount: number) {
    const account = this.web3.eth.accounts.privateKeyToAccount(this.privateKey);
    const tx = {
      from: account.address,
      to,
      value: this.web3.utils.toWei(amount.toString(), 'ether'),
      gas: this.gasLimit,
      gasPrice: this.web3.utils.toWei(this.gasPrice.toString(), 'gwei'),
    };

    const signedTx = await this.web3.eth.accounts.signTransaction(tx, this.privateKey);
    const receipt = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    return receipt;
 }
}
