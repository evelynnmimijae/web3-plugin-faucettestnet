import Web3 from 'web3';
import { FaucetPlugin } from '../src/FaucetPlugin';
import mockAxios from 'jest-mock-axios';

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
    web3 = new Web3('https://sepolia.infura.io/v3/4713613d0f7f45deaeaf2247969f8a54');
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

  it('should send Ether to a user', async () => {
    const toAddress = '0x1234567890abcdef1234567890abcdef12345678';
    const amount = 0.1;

    // Mock the response from Tableland's API
    mockAxios.post.mockResolvedValue({ data: { success: true } });

    await faucetPlugin.requestEther(toAddress, amount);

    expect(mockAxios.post).toHaveBeenCalledWith(expect.anything(), expect.anything(), expect.anything());
  });

  it('should handle errors when sending a transaction', async () => {
    const toAddress = '0x1234567890abcdef1234567890abcdef12345678';
    const amount = 0.1;

    // Mock the error response from Tableland's API
    mockAxios.post.mockRejectedValue(new Error('Network error'));

    await expect(faucetPlugin.requestEther(toAddress, amount)).rejects.toThrow('Network error');
  });

  it('should validate request details', async () => {
    const toAddress = '0x1234567890abcdef1234567890abcdef12345678';
    const amount = -0.1;

    await expect(faucetPlugin.requestEther(toAddress, amount)).rejects.toThrow('Invalid request: address or amount is missing or invalid.');
  });

  // Add more tests as needed to cover different scenarios and edge cases
});
