import { ethers } from "ethers";
import { Pool } from "@uniswap/v3-sdk";
import { Token } from "@uniswap/sdk-core";
import contract from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import { useState } from "react";

const provider: ethers.providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider( 
    'https://mainnet.infura.io/v3/4a7923e622734ab4bdb1c6821a201262'
);
const poolAddress = "0x83abecf7204d5afc1bea5df734f085f2535a9976";

const poolContract = new ethers.Contract(poolAddress,  contract.abi,  provider);

interface Immutables {  
    factory: string;
    token0: string;
    token1: string;
    fee: number;
    tickSpacing: number;
    maxLiquidityPerTick:
    ethers.BigNumber;
}
interface State {
    liquidity: ethers.BigNumber;  
    sqrtPriceX96: ethers.BigNumber;  
    tick: number;  
    observationIndex: number;  
    observationCardinality: number;  
    observationCardinalityNext: number;  
    feeProtocol: number;  
    unlocked: boolean;
}

async function getPoolImmutables() {
    const [factory, token0, token1, fee, tickSpacing, maxLiquidityPerTick] = await Promise.all([
        poolContract.factory(),      
        poolContract.token0(),      
        poolContract.token1(),      
        poolContract.fee(),      
        poolContract.tickSpacing(),      
        poolContract.maxLiquidityPerTick(),    
    ]);
    const immutables: Immutables = {factory, token0, token1, fee, tickSpacing, maxLiquidityPerTick};  
    return immutables;
}

async function getPoolState() {
    const [liquidity, slot] = await Promise.all([    
        poolContract.liquidity(),    
        poolContract.slot0(),  
    ]);
    console.log(slot[0])
    const PoolState: State = {liquidity, sqrtPriceX96: slot[0], tick: slot[1], observationIndex: slot[2], observationCardinality: slot[3], observationCardinalityNext: slot[4], feeProtocol: slot[5], unlocked: slot[6]};
    return PoolState;
}

async function main() {  
    const [immutables, state] = await Promise.all([    
        getPoolImmutables(),    
        getPoolState(),  
    ]);
    const TokenA = new Token(3, immutables.token0, 6, "PEOPLE", "ConstitutionDAO");
    const TokenB = new Token(3, immutables.token1, 18, "WETH", "Wrapped Ether");
    const poolExample = new Pool(TokenA, TokenB, immutables.fee, state.sqrtPriceX96.toString(), state.liquidity.toString(), state.tick);  
    console.log(state.sqrtPriceX96.toString())
    let test = parseInt(state.sqrtPriceX96.toString())**2/ (2**192 * 10**12) 
    console.log(test, 1/test);
}

const PriceDisplay: React.FC = () => {
    const [string, setString] = useState<Promise<any> | undefined>()
    return <div>
        <button onClick={() => setString(main().then((value)=>(value)))}>click to get price of something?</button>
    </div>
}

export {PriceDisplay}