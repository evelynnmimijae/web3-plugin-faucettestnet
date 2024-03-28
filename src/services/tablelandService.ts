// src/services/tablelandService.ts

import axios from 'axios';

export const getDataFromTableland = async (): Promise<void> => {
 try {
    const response = await axios.get('https://api.tableland.com/v1/your-table-id', {
      headers: {
        'Authorization': 'Bearer YOUR_TABLELAND_API_KEY'
      }
    });
    console.log(response.data);
 } catch (error) {
    console.error('Error fetching data from Tableland:', error);
 }
};

export const updateTableland = async (address: string): Promise<void> => {
 try {
    await axios.post('https://api.tableland.com/v1/your-table-id', {
      address: address,
      claimed: true
    }, {
      headers: {
        'Authorization': 'Bearer YOUR_TABLELAND_API_KEY'
      }
    });
    console.log('Address updated in Tableland:', address);
 } catch (error) {
    console.error('Error updating Tableland:', error);
 }
};
