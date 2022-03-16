"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = require("@balancer-labs/sdk");
const config = {
    network: sdk_1.Network.MAINNET,
    rpcUrl: `https://kovan.infura.io/v3/${process.env.INFURA}`
};
const balancer = new sdk_1.BalancerSDK(config);
console.log(balancer);
