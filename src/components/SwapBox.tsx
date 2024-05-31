import { Box, Flex } from "@radix-ui/themes";
import From from "./From";
import To from "./To";
import SwapButton from "./SwapButton";
import { useEffect, useState } from "react";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { AptoswapClient } from "@vividnetwork/swap-sdk";

export default function SwapBox() {
    // with custom configuration
    const aptosConfig = new AptosConfig({ network: Network.TESTNET });
    const aptos = new Aptos(aptosConfig);
    // console.log(aptos)

    const [tokens, setTokens] = useState([])
    const [xTokens, setXTokens] = useState([])
    const [yTokens, setYTokens] = useState([])
    const [fromToken, setFromToken] = useState()
    const [toToken, setToToken] = useState()
    const [swapAmount, setSwapAmount] = useState(0)
    const [convertedAmount, setConvertedAmount] = useState(0)

    useEffect(() => {

        async function initTokens() {
            const aptoswap = (await AptoswapClient.fromHost("https://aptoswap.net"))!;
            const { pools } = await aptoswap.getCoinsAndPools();
            console.log(pools)

            const xtoks = []
            for (let i = 0; i < pools.length; i++) {
                const t = pools[i].type.xTokenType
                t.symbol = t.name.split("::")[2]
                if (xtoks.find(x => x.symbol === t.symbol)) continue
                xtoks.push(t)
            }

            console.log(xtoks)
            
            setXTokens(xtoks)
        }

        // Suggested code may be subject to a license. Learn more: ~LicenseLog:2423056149.
        // Suggested code may be subject to a license. Learn more: ~LicenseLog:3078297616.
        async function getTokens() {
            const response = await fetch('https://tokens.coingecko.com/aptos/all.json')
            const data = await response.json()
            const toks = data.tokens
            for (let i = 0; i < toks.length; i++) {
                if (toks[i].symbol === "CAKE")
                    toks[i].address = "0xe0e5ad285cbcdb873b2ee15bb6bcac73d9d763bcb58395e894255eeecf3992cf::pancake::Cake"
            }
            // console.log(toks)
            setTokens(toks)
            // console.log(data.tokens)
        }
        initTokens()
        getTokens()
    }, [])

    return (
        <Box
            p="3"
            m="3"
            style={{ backgroundColor: 'var(--gray-a2)', borderRadius: 'var(--radius-3)' }}
        >
            <Flex gap="7" direction="column" align="center">
                <From aptos={aptos} tokens={xTokens} yTokens={yTokens} setYTokens={setYTokens} selectedToken={fromToken} setSelectedToken={setFromToken} swapAmount={swapAmount} setSwapAmount={setSwapAmount} setConvertedAmount={setConvertedAmount} />
                <hr />
                <To tokens={yTokens} toToken={toToken} fromToken={fromToken} swapAmount={swapAmount} convertedAmount={convertedAmount} setConvertedAmount={setConvertedAmount} setToToken={setToToken} />
                <SwapButton aptos={aptos} swapAmount={swapAmount} convertedAmount={convertedAmount} fromToken={fromToken} toToken={toToken} />
            </Flex>
        </Box>
    )
}