import Web3 from 'web3';
import { FaucetPlugin } from '../src/FaucetPlugin';
import mockAxios from 'jest-mock-axios';
import dotenv from 'dotenv';

// Load environment variables from.env file
dotenv.config();

// Extend the Web3 type to include the faucetPlugin property
declare module 'web3' {
  interface Web3 {
    faucetPlugin: FaucetPlugin;
  }
}

describe('FaucetPlugin Tests', () => {
  let web3: Web3;
  let faucetPlugin: FaucetPlugin;

  beforeAll(() => {
    const infuraProjectId = process.env.INFURA_PROJECT_ID;
    if (!infuraProjectId) {
      throw new Error('Infura Project ID is not defined in the environment variables');
    }
    web3 = new Web3(`https://sepolia.infura.io/v3/${infuraProjectId}`);
    faucetPlugin = new FaucetPlugin();
    web3.faucetPlugin = faucetPlugin; // Assign the faucetPlugin to the web3 instance
  });

  afterEach(() => {
    // Restore the original behavior of axios after each test
    mockAxios.reset();
  });

  it('should register FaucetPlugin plugin on Web3 instance', () => {
    expect(web3.faucetPlugin).toBeDefined();
  });

  // Continue with your tests...
});
