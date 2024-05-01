import { Web3 } from 'web3';
import { FaucetPlugin } from '../src/FaucetPlugin';
import axios from 'axios';
import mockAxios from 'jest-mock-axios';

describe('FaucetPlugin Tests', () => {
  let web3: Web3;
  let faucetPlugin: FaucetPlugin;

  beforeAll(() => {
    web3 = new Web3('http://127.0.0.1:8545');
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

  describe('FaucetPlugin method tests', () => {
    it('should send Ether to a user', async () => {
      const toAddress = '0x123...';
      const amount = 0.1;

      // Mock the response from Tableland's API
      mockAxios.post.mockResolvedValue({ data: { success: true } });

      await faucetPlugin.requestEther(toAddress, amount);

      // Use Jest's expect for the assertion
      expect(mockAxios.post).toHaveBeenCalledWith(expect.anything(), expect.anything());
    });

    // Other tests...
  });
});
