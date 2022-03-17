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


import {
    Vault__factory,
    WeightedPoolFactory__factory,
    WeightedPool__factory
  } from '@balancer-labs/typechain';



export interface WalletError extends Error {
    code: number | string;
  }
  


export type PoolSeedToken = {
    tokenAddress: string;
    weight: number;
    isLocked: boolean; // TODO Not needed propablly 
    amount: string;
    id: string;
};

type Address = string;

function scale(
    input: BigNumber | string,
    decimalPlaces: number
): BigNumber {
    const unscaled = typeof input === 'string' ? new BigNumber(input) : input;
    const scalePow = new BigNumber(decimalPlaces.toString());
    const scaleMul = new BigNumber(10).pow(scalePow);
    return unscaled.times(scaleMul);
}



// Calculate weights String form PoolSeedTokens
export function calculateTokenWeights(tokens: PoolSeedToken[]): string[] {
    const weights: EPBigNumber[] = tokens.map((token: PoolSeedToken) => {
        const normalizedWeight = new BigNumber(token.weight).multipliedBy(
            new BigNumber(1e16)
        );
        return EPBigNumber.from(normalizedWeight.toString());
    });

    /*
    Normalize an array of token weights to ensure they sum to 1e18

    @param weights — an array of token weights to be normalized

    @returns — an equivalent set of normalized weights
    */
    const normalizedWeights = toNormalizedWeights(weights); // This is a check
    const weightStrings = normalizedWeights.map((weight: EPBigNumber) => { // Weight must be in uint256[]
        return weight.toString();
    });

    return weightStrings;
}



export async function createWeightedPool(
    provider: Web3Provider,
    name: string,
    symbol: string,
    swapFee: string,
    tokens: PoolSeedToken[],
    owner: Address
): Promise<TransactionResponse> {
    
    if (!owner.length) return Promise.reject('No pool owner specified');

    const weightedPoolFactoryAddress = "0x8E9aa87E45e92bad84D5F8DD1bff34Fb92637dE9" // KOVAN NETWORK weightedPoolFactory Address  

    const tokenAddresses: Address[] = tokens.map((token: PoolSeedToken) => {
        return token.tokenAddress;
    });

    const seedTokens = calculateTokenWeights(tokens); // weights of each token
    const swapFeeScaled = scale(new BigNumber(swapFee), 18);  // Swap Fee

    const params = [
        name,
        symbol,
        tokenAddresses,
        seedTokens,  // Token Weights
        swapFeeScaled.toString(),
        owner
    ];

    return sendTransaction(
        provider,
        weightedPoolFactoryAddress,
        WeightedPoolFactory__factory.abi,
        'create',
        params
    );
}



// NOT NEEDED
/////////////////////////////////////
// async function createPool(): Promise<TransactionResponse> {
//     const provider = getProvider(); //  const { account, getProvider } = useWeb3();
//     try {

//         const tx = await createWeightedPoolHelper( // Create Weighted pool Helper
//             provider,
//             poolCreationState.name,
//             poolCreationState.symbol,
//             poolCreationState.initialFee,
//             poolCreationState.seedTokens,
//             poolOwner.value
//         );
    
//         // [REMOVED] Original held transaction state data

//         return tx;
//     } catch (e) {
//         console.log(e);
//         return Promise.reject('Create failed');
//     }
// }


/////////////////////////////////////



// WEB3 Send Transaction

async function sendTransaction(
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