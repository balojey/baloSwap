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

    useEffect(() => {
        // Suggested code may be subject to a license. Learn more: ~LicenseLog:2423056149.
        // Suggested code may be subject to a license. Learn more: ~LicenseLog:3078297616.
        async function getTokens() {
            const response = await fetch('https://tokens.coingecko.com/aptos/all.json')
            const data = await response.json()
            const toks = data.tokens.filter(t => t.symbol === 'APT' || t.symbol === 'CAKE')
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
                <From tokens={tokens} />
                <hr />
                <To tokens={tokens} />
                <SwapButton aptos={aptos} />
            </Flex>
        </Box>
    )
}