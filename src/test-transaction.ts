import {
    JsonRpcProvider,
    TransactionResponse,
    Web3Provider
} from '@ethersproject/providers';


import { ethers } from "ethers";




export interface WalletError extends Error {
  code: number | string;
}


export function sendTransaction2(
    web3: ethers.providers.JsonRpcProvider,
  ): any {
    console.log('Sending transaction');
    
    const signer = web3.getSigner();

    return signer;
  };



let web3 = new ethers.providers.JsonRpcProvider();


let signer  = sendTransaction2(web3);

console.log(signer);