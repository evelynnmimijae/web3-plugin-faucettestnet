import { Web3 } from 'web3';
import { FaucetPlugin } from './FaucetPlugin';

declare module 'web3' {
  interface Web3 {
    faucet: FaucetPlugin;
  }
}
