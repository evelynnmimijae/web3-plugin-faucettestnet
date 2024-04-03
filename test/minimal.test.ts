// src/test/minimal.test.ts

import mockAxios from 'jest-mock-axios';

jest.mock('axios', () => mockAxios);

describe('Minimal Axios Mock Test', () => {
 it('should mock axios post request', async () => {
    // Mock the response from an API call
    mockAxios.post.mockResolvedValue({ data: { success: true } });

    // Simulate a function that makes an axios post request
    const result = await mockAxios.post('http://example.com', {});

    expect(result).toEqual({ data: { success: true } });
    expect(mockAxios.post).toHaveBeenCalledWith('http://example.com', {});
 });

 afterEach(() => {
   mockAxios.reset();
 });
});
