// src/database/index.ts

import axios from 'axios';
import { tablelandConfig } from '../config';

export async function checkAddressInTableland(address: string): Promise<boolean> {
 try {
    const response = await axios.get(`https://api.tableland.com/v1/your-table-id/${address}`, {
      headers: {
        'Authorization': 'Bearer YOUR_TABLELAND_API_KEY'
      }
    });
    return response.data.claimed;
 } catch (error) {
    console.error('Error checking address in Tableland:', error);
    return false;
 }
}

export async function storeRequest(userId: string, requestDetails: any) {
 const response = await axios.post(`https://api.tableland.com/v1/databases/${tablelandConfig.databaseId}/documents`, {
    userId,
    requestDetails,
 }, {
    headers: {
      'Authorization': `Bearer ${tablelandConfig.apiKey}`,
    },
 });

 return response.data;
}

export async function getRequests(userId: string) {
 const response = await axios.get(`https://api.tableland.com/v1/databases/${tablelandConfig.databaseId}/documents?userId=${userId}`, {
    headers: {
      'Authorization': `Bearer ${tablelandConfig.apiKey}`,
    },
 });

 return response.data;
}

export async function updateTablelandRecord(address: string): Promise<void> {
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
      console.error('Error updating Tableland record:', error);
   }
  }