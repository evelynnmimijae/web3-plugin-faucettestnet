import { FaucetPlugin } from '../src/FaucetPlugin';
declare module 'web3' {
    interface Web3 {
        faucetPlugin: FaucetPlugin;
    }
}
