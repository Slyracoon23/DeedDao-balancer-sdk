"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const sdk_1 = require("@balancer-labs/sdk");
dotenv_1.default.config();
function runQueryBatchSwap() {
    return __awaiter(this, void 0, void 0, function* () {
        const config = {
            network: sdk_1.Network.KOVAN,
            rpcUrl: `https://kovan.infura.io/v3/${process.env.INFURA}`,
        };
        const balancer = new sdk_1.BalancerSDK(config);
        const swapType = sdk_1.SwapType.SwapExactOut;
        const swaps = [
            {
                poolId: '0x6a8c3239695613c0710dc971310b36f9b81e115e00000000000000000000023e',
                assetInIndex: 2,
                assetOutIndex: 3,
                amount: '123456',
                userData: '0x',
            },
            {
                poolId: '0x21ff756ca0cfcc5fff488ad67babadffee0c4149000000000000000000000240',
                assetInIndex: 1,
                assetOutIndex: 2,
                amount: '0',
                userData: '0x',
            },
            {
                poolId: '0xcd32a460b6fecd053582e43b07ed6e2c04e1536900000000000000000000023c',
                assetInIndex: 0,
                assetOutIndex: 1,
                amount: '0',
                userData: '0x',
            },
        ];
        const assets = [
            '0xff795577d9ac8bd7d90ee22b6c1703490b6512fd',
            '0xcd32a460b6fecd053582e43b07ed6e2c04e15369',
            '0x6a8c3239695613c0710dc971310b36f9b81e115e',
            '0x13512979ade267ab5100878e2e0f485b568328a4',
        ];
        const deltas = yield balancer.swaps.queryBatchSwap({
            kind: swapType,
            swaps,
            assets,
        });
        console.log(deltas.toString());
    });
}
// yarn examples:run ./examples/queryBatchSwap.ts
runQueryBatchSwap();
