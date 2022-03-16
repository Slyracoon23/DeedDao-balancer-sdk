import { BalancerSDK, BalancerSdkConfig, Network } from '@balancer-labs/sdk';

const config: BalancerSdkConfig = {
    network: Network.MAINNET,
    rpcUrl: `https://kovan.infura.io/v3/${process.env.INFURA}`
} 
const balancer = new BalancerSDK(config);

console.log(balancer);