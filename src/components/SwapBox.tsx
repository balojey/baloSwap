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

    const [tokens, setTokens] = useState([])
    const [fromToken, setFromToken] = useState()
    const [toToken, setToToken] = useState()
    const [swapAmount, setSwapAmount] = useState(0)
    const [convertedAmount, setConvertedAmount] = useState(0)

    useEffect(() => {
        // Suggested code may be subject to a license. Learn more: ~LicenseLog:2423056149.
        // Suggested code may be subject to a license. Learn more: ~LicenseLog:3078297616.
        async function getTokens() {
            const response = await fetch('https://tokens.coingecko.com/aptos/all.json')
            const data = await response.json()
            const toks = data.tokens.filter(t => t.symbol === 'APT' || t.symbol === 'CAKE' || t.symbol === "USDC")
            for (let i = 0; i < toks.length; i++) {
                if (toks[i].symbol === "CAKE")
                    toks[i].address = "0xe0e5ad285cbcdb873b2ee15bb6bcac73d9d763bcb58395e894255eeecf3992cf::pancake::Cake"
                if (toks[i].symbol === "USDC")
                    toks[i].address = "0x8c805723ebc0a7fc5b7d3e7b75d567918e806b3461cb9fa21941a9edc0220bf::devnet_coins::DevnetUSDC"
            }
            // console.log(toks)
            setTokens(toks)
            // console.log(data.tokens)
        }
        getTokens()
    }, [])

    return (
        <Box
            p="3"
            m="3"
            style={{ backgroundColor: 'var(--gray-a2)', borderRadius: 'var(--radius-3)' }}
        >
            <Flex gap="7" direction="column" align="center">
                <From aptos={aptos} tokens={tokens} selectedToken={fromToken} setSelectedToken={setFromToken} swapAmount={swapAmount} setSwapAmount={setSwapAmount} setConvertedAmount={setConvertedAmount} />
                <hr />
                <To tokens={tokens} selectedToken={toToken} setSelectedToken={setToToken} convertedAmount={convertedAmount} />
                <SwapButton aptos={aptos} swapAmount={swapAmount} fromToken={fromToken} toToken={toToken} />
            </Flex>
        </Box>
    )
}