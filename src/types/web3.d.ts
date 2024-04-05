// types/web3.d.ts
import { Web3 } from 'web3';
import { FaucetPlugin } from '../src/FaucetPlugin'; // Adjust the import path as necessary

declare module 'web3' {
 interface Web3 {
    faucetPlugin: FaucetPlugin;
 }
}