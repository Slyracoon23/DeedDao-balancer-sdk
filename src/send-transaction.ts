// WEB3 Send Transaction


import { Contract } from '@ethersproject/contracts';
import BigNumber from 'bignumber.js';
import { BigNumber as EPBigNumber } from '@ethersproject/bignumber';
import { toNormalizedWeights } from '@balancer-labs/balancer-js';

import { ethers } from "ethers";


import {
    JsonRpcProvider,
    TransactionResponse,
    Web3Provider
} from '@ethersproject/providers';





export interface WalletError extends Error {
    code: number | string;
  }
  

export  async function sendTransaction(
    web3: ethers.providers.JsonRpcProvider,
    contractAddress: string,
    abi: any[],
    action: string,
    params: any[]
  ): Promise<TransactionResponse> {
    console.log('Sending transaction');
    console.log('Contract', contractAddress);
    console.log('Action', `"${action}"`);
    console.log('Params', params);
    
    web3.getSigner();
    const signer = web3.getSigner();
    const contract = new Contract(contractAddress, abi, web3);
    const contractWithSigner = contract.connect(signer);
  
    try {

     // [REMOVED] Gas fee estimation
     
      // CHECK Send transaction here
      return await contractWithSigner[action](...params);
    } catch (e) {
      const error = e as WalletError;

      // [REMOVED] Error handeling 

      return Promise.reject(error);
    }
  }