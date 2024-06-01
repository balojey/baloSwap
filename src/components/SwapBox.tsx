import { Box, Flex } from "@radix-ui/themes";
import From from "./From";
import To from "./To";
import SwapButton from "./SwapButton";
import { useEffect, useState } from "react";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

export default function SwapBox() {
    // with custom configuration
    const aptosConfig = new AptosConfig({ network: Network.TESTNET });
    const aptos = new Aptos(aptosConfig);
    // console.log(aptos)

    const tokens = [
        {
            symbol: "CAKE",
            address: "0xe0e5ad285cbcdb873b2ee15bb6bcac73d9d763bcb58395e894255eeecf3992cf::pancake::Cake",
            logoURI: "https://assets.coingecko.com/coins/images/12632/large/pancakeswap-cake-logo_%281%29.png?1696512440",
            rate: 0.00014884,
            swapTokens: ["APT"]
        },
        {
            symbol: "tAPTS",
            address: "0xa5d3ac4d429052674ed38adc62d010e52d7c24ca159194d17ddc196ddb7e480b::pool::TestToken",
            logoURI: "https://testnet.aptoswap.net/images/token/aptoswap-test.svg",
            rate: 259.70528931,
            swapTokens: ["APT"]
        },
        {
            symbol: "MOVE",
            address: "0xe4497a32bf4a9fd5601b27661aa0b933a923191bf403bd08669ab2468d43b379::move_coin::MoveCoin",
            logoURI: "https://testnet.aptoswap.net/images/token/move.svg",
            rate: 0.11972529,
            swapTokens: ["APT"]
        },
        {
            symbol: "APT",
            address: "0x1::aptos_coin::AptosCoin",
            logoURI: "https://testnet.aptoswap.net/images/token/aptos.svg",
            rate: 1.00000000,
            swapTokens: ["APT", "USDC", "USDT", "BTC", "DAI", "tAPT", "tAPTS", "MOVE", "CAKE"]
        },
        {
            symbol: "BTC",
            address: "0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::devnet_coins::DevnetBTC",
            logoURI: "https://testnet.aptoswap.net/images/token/btc.svg",
            price: 13.86785843,
            swapTokens: ["APT", "USDC", "USDT"]
        },
        {
            symbol: "DAI",
            address: "0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::devnet_coins::DevnetDAI",
            logoURI: "https://testnet.aptoswap.net/images/token/dai.svg",
            rate: 59.28178235,
            swapTokens: ["APT", "BTC"]
        },
        {
            symbol: "USDC",
            address: "0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::devnet_coins::DevnetUSDC",
            logoURI: "https://testnet.aptoswap.net/images/token/usdc.svg",
            rate: 42619.4552711,
            swapTokens: ["APT", "BTC"]
        },
        {
            symbol: "USDT",
            address: "0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::devnet_coins::DevnetUSDT",
            logoURI: "https://testnet.aptoswap.net/images/token/usdt.svg",
            rate: 32620.74229929,
            swapTokens: ["APT", "BTC"]
        },
        {
            symbol: "tAPT",
            address: "0x2a2ad97dfdbe4e34cdc9321c63592dda455f18bc25c9bb1f28260312159eae27::staked_aptos_coin::StakedAptosCoin",
            logoURI: "https://testnet.aptoswap.net/images/token/tAPT.svg",
            rate: 0.01603145,
            swapTokens: ["APT"]
        },
    ]
    const [xTokens, setXTokens] = useState([])
    const [yTokens, setYTokens] = useState([])
    const [fromToken, setFromToken] = useState()
    const [toToken, setToToken] = useState()
    const [swapAmount, setSwapAmount] = useState(0)
    const [convertedAmount, setConvertedAmount] = useState(0)

    useEffect(() => {
        setXTokens(tokens)
    }, [])

    return (
        <Box
            p="3"
            m="3"
            style={{ backgroundColor: 'var(--gray-a2)', borderRadius: 'var(--radius-3)' }}
        >
            <Flex gap="7" direction="column" align="center">
                <From aptos={aptos} tokens={xTokens} toToken={toToken} yTokens={yTokens} setYTokens={setYTokens} selectedToken={fromToken} setSelectedToken={setFromToken} swapAmount={swapAmount} setSwapAmount={setSwapAmount} setConvertedAmount={setConvertedAmount} />
                <hr />
                <To tokens={yTokens} toToken={toToken} fromToken={fromToken} swapAmount={swapAmount} convertedAmount={convertedAmount} setConvertedAmount={setConvertedAmount} setToToken={setToToken} />
                <SwapButton aptos={aptos} swapAmount={swapAmount} convertedAmount={convertedAmount} fromToken={fromToken} toToken={toToken} />
            </Flex>
        </Box>
    )
}