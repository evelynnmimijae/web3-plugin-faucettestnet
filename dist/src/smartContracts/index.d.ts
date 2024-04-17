export declare function callContractMethod(contractAddress: string, abi: any[], methodName: string, args: any[]): Promise<void | [] | (unknown[] & [])>;
export declare function sendContractTransaction(contractAddress: string, abi: any[], methodName: string, args: any[], fromAddress: string, privateKey: string): Promise<import("web3").TransactionReceipt>;
