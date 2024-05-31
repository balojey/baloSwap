import { Flex, Text, Strong, Box, DropdownMenu, Button, TextField, Avatar } from "@radix-ui/themes"
import { useWallet } from "@aptos-labs/wallet-adapter-react"
import { useState } from "react"
import { AptoswapClient, TransactionOperation } from "@vividnetwork/swap-sdk";

export default function From({ aptos, tokens, yTokens, setYTokens, selectedToken, setSelectedToken, swapAmount, setSwapAmount, setConvertedAmount }) {
    const { account } = useWallet()
    const [aptAmount, setAptAmount] = useState(0)
    console.log(account)

    async function getAPTAmount(token) {
        // console.log(token)
        try{
            const resource = await aptos.getAccountResource({
                accountAddress: account.address,
                resourceType: `0x1::coin::CoinStore<${token.name}>`,
            });
        
            if (resource) {
                const value = resource.coin.value / 100000000
                setAptAmount(value)
            } else {
                console.log("Token not found")
                setAptAmount(0)
            }
        } catch (error) {
            console.error("Error fetching token details:", error);
            setAptAmount(0)
        }
    }
    
    const handleChange = (e) => {
        setSwapAmount(e.target.valueAsNumber)
        if (selectedToken.symbol === "APT") setConvertedAmount(swapAmount * 0.00014918)
        if (selectedToken.symbol === "CAKE") setConvertedAmount(swapAmount / 0.00014918)
        
    }

    const handleSelectYTokens = async () => {
        const aptoswap = (await AptoswapClient.fromHost("https://aptoswap.net"))!;
        const { pools } = await aptoswap.getCoinsAndPools();

        const ytoks = []
        for (let i = 0; i < pools.length; i++) {
            const pool = pools[i]
            if (pool.type.xTokenType.name !== selectedToken.name) continue
            const t = pool.type.yTokenType
            t.symbol = t.name.split("::")[2]
            if (ytoks.find(x => x.symbol === t.symbol)) continue
            // if (ytoks.find(x => x.symbol === selectedToken.symbol)) continue
            ytoks.push(t)
        }

        console.log(ytoks)
        setYTokens(ytoks)
        setYTokens(ytoks)
    }

    return (
        <Flex gap="5" direction="column">
            <Text size="5">From</Text>
            <Flex gap="9">
                <Flex gap="5" direction="column">
                    <Strong>Token</Strong>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <Button variant="soft" size="4">
                                {
                                    selectedToken
                                    ?<Box py="3">
                                        <Avatar
                                            src={selectedToken.logoURI}
                                            fallback="A"
                                            size="1"
                                        />
                                        <Text>{selectedToken.symbol}</Text>
                                    </Box>
                                    : "Select Token"
                                }
                                <DropdownMenu.TriggerIcon />
                            </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content>
                            {tokens.map((token, index) => (
                                <DropdownMenu.Item key={index} onSelect={async () => {
                                    setSelectedToken(token)
                                    await getAPTAmount(token)
                                    await handleSelectYTokens()
                                }}>
                                    <Avatar
                                        src={token.logoURI}
                                        fallback="A"
                                        size="1"
                                    />
                                    <Text>{token.symbol}</Text>
                                </DropdownMenu.Item>
                            ))}
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </Flex>
                <Flex gap="5" direction="column">
                    <Strong>Amount</Strong>
                    <TextField.Root placeholder={swapAmount} size="3" type="number" onChange={handleChange}>
                        <TextField.Slot />
                    </TextField.Root>
                    <Text size="1">Balance: {aptAmount}</Text>
                </Flex>
            </Flex>
        </Flex>
    )
}