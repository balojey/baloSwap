import { Flex, Text, Strong, Box, DropdownMenu, Button, TextField, Avatar } from "@radix-ui/themes"
import { useWallet } from "@aptos-labs/wallet-adapter-react"
import { useState, useEffect } from "react"

export default function From({ aptos, tokens, selectedToken, setSelectedToken, swapAmount, setSwapAmount, setConvertedAmount }) {
    const { account } = useWallet()
    const [aptAmount, setAptAmount] = useState()

    async function getAPTAmount(token) {
        console.log(token)
        try{
            const resource = await aptos.getAccountResource({
                accountAddress: account.address,
                resourceType: `0x1::coin::CoinStore<${token.address}>`,
            });
        
            if (resource) {
                const value = resource.coin.value / 100000000
                console.log(value)
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
        console.log(swapAmount)
        setConvertedAmount(swapAmount)
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
                                }}>
                                    <Avatar
                                        src={token.logoURI}
                                        fallback="A"
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