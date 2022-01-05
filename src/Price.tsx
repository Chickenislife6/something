import { ethers } from "ethers";
import { Pool } from "@uniswap/v3-sdk";
import { Token } from "@uniswap/sdk-core";
import contract from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import { useState } from "react";
import Web3 from "web3";
import { useParams } from "react-router";

const provider: ethers.providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider( 
    'https://mainnet.infura.io/v3/4a7923e622734ab4bdb1c6821a201262'
);
//const poolAddress = "0x83abecf7204d5afc1bea5df734f085f2535a9976";

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

function createPoolContract(poolAddress:string | undefined) {
    if (poolAddress === undefined) {
        return undefined
    }
    if (Web3.utils.isAddress(poolAddress)) {
        return new ethers.Contract(poolAddress, contract.abi, provider)
    }
    return undefined
}

async function getPoolImmutables(poolContract: ethers.Contract) {
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

async function getPoolState(poolContract: ethers.Contract) {
    const [liquidity, slot] = await Promise.all([    
        poolContract.liquidity(),    
        poolContract.slot0(),  
    ]);
    console.log(slot[0])
    const PoolState: State = {liquidity, sqrtPriceX96: slot[0], tick: slot[1], observationIndex: slot[2], observationCardinality: slot[3], observationCardinalityNext: slot[4], feeProtocol: slot[5], unlocked: slot[6]};
    return PoolState;
}

async function main(poolContract: ethers.Contract) {  
    const [immutables, state] = await Promise.all([    
        getPoolImmutables(poolContract),    
        getPoolState(poolContract),  
    ]);
    const TokenA = new Token(3, immutables.token0, 6, "PEOPLE", "ConstitutionDAO");
    const TokenB = new Token(3, immutables.token1, 18, "WETH", "Wrapped Ether");
    const poolExample = new Pool(TokenA, TokenB, immutables.fee, state.sqrtPriceX96.toString(), state.liquidity.toString(), state.tick);  
    console.log(state.sqrtPriceX96.toString())
    let test = parseInt(state.sqrtPriceX96.toString())**2/ (2**192 * 10**12) 
    console.log(test, 1/test);
    console.log(poolExample.fee, 'token0price')
    return test
}
interface props {
    PoolContract: string;
}
const PriceDisplay: React.FC<props> = (props) => {
    const { id } = useParams<string>();
    const [Value, setValue] = useState<number>(0)
    const poolContract = createPoolContract(id)
    return <div>
        

            {
            poolContract instanceof ethers.Contract ? 
            <div>
                <button className="btn" onClick={async () => {setValue(await main(poolContract).then((value) => value))}}>
                click to get price of the pool contract: {id}
                </button>
                <h1>token0 to token1: {Value}</h1>
                <h1>token1 to token0: {1/Value}</h1>
            </div>
            :
            <h1>please enter a valid eth contract</h1>
            }  

    </div>
}

export {PriceDisplay}