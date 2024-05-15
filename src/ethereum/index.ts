import Web3 from 'web3';
import { ethereumConfig } from '../config';

const web3 = new Web3(ethereumConfig.network);
const account = web3.eth.accounts.privateKeyToAccount(ethereumConfig.privateKey);
web3.eth.accounts.wallet.add(account);

export async function sendEther(address: string, amount: number): Promise<void> {
  const tx = {
    from: account.address,
    to: address,
    value: web3.utils.toWei(amount.toString(), 'ether'),
    gas: ethereumConfig.gasLimit,
    gasPrice: web3.utils.toWei(ethereumConfig.gasPrice.toString(), 'gwei'),
  };

  try {
    const signedTx = await web3.eth.accounts.signTransaction(tx, ethereumConfig.privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction as string);
    console.log('Transaction successful with hash:', receipt.transactionHash);
  } catch (error) {
    console.error('Error sending Ether:', error);
    throw error;
  }
}