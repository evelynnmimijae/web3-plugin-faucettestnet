// src/utils/errorHandling.ts
// src/services/tablelandService.ts

import { FaucetService } from '../services/faucetService';
import { TablelandService } from '../services/tablelandService';

// Custom error types
class FaucetError extends Error {
 constructor(message?: string) {
    super(message);
    this.name = 'FaucetError';
 }
}

class TablelandError extends Error {
 constructor(message?: string) {
    super(message);
    this.name = 'TablelandError';
 }
}

// Function to log errors
export function logError(error: Error): void {
 console.error(`Error: ${error.message}`);
 // Additional logging logic here, e.g., sending to an external logging service
}

// Function to send error notifications
export function sendErrorNotification(error: Error): void {
 // Implement logic to send notifications, e.g., email, Slack message
 console.log(`Sending error notification for: ${error.message}`);
}

// Function to retry a failed operation
export async function retryOperation<T>(operation: () => Promise<T>, retries = 3): Promise<T> {
 for (let i = 0; i < retries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (i === retries - 1) throw error; // If this was the last attempt, rethrow the error
      console.log(`Attempt ${i + 1} failed. Retrying...`);
      // Optionally, add a delay before retrying
    }
 }
 throw new Error('Operation failed after retries');
}

// Example usage in FaucetService
export async function sendTransactionWithErrorHandling(faucetService: FaucetService, to: string, amount: number): Promise<void> {
 try {
    await retryOperation(() => faucetService.sendTransaction(to, amount));
 } catch (error) {
    logError(error);
    sendErrorNotification(error);
    throw new FaucetError('Failed to send transaction');
 }
}

// Example usage in TablelandService
export async function storeRequestWithErrorHandling(tablelandService: TablelandService, userId: string, requestDetails: any): Promise<void> {
 try {
    await retryOperation(() => tablelandService.storeRequest(userId, requestDetails));
 } catch (error) {
    logError(error);
    sendErrorNotification(error);
    throw new TablelandError('Failed to store request');
 }
}
