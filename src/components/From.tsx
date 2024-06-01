import { Flex, Text, Strong, Box, DropdownMenu, Button, TextField, Avatar } from "@radix-ui/themes"
import { useWallet } from "@aptos-labs/wallet-adapter-react"
import { useState } from "react"

export default function From({ aptos, tokens, toToken, setYTokens, selectedToken, setSelectedToken, swapAmount, setSwapAmount, setConvertedAmount }) {
    const { account } = useWallet()
    const [aptAmount, setAptAmount] = useState(0)

    async function getAPTAmount(token) {
        try{
            const resource = await aptos.getAccountResource({
                accountAddress: account.address,
                resourceType: `0x1::coin::CoinStore<${token.address}>`,
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
        if (e.target.valueAsNumber < 0 || Number.isNaN(e.target.valueAsNumber)) {
            setSwapAmount(0)
        } else {
            setSwapAmount(e.target.valueAsNumber)
        }
        
        setConvertedAmount(swapAmount * (1 / selectedToken.rate) * toToken.rate)
    }

    const handleSelectYTokens = () => {
        const ytoks = []
        for (const token of tokens) {
            for (const swapToken in selectedToken.swapTokens) {
                console.log(swapToken)
                if (selectedToken.swapTokens[swapToken] === token.symbol) {
                    ytoks.push(token)
                }
            }
        }
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
                                    handleSelectYTokens()
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
                    <TextField.Root placeholder="10" size="3" type="number" onChange={handleChange}>
                        <TextField.Slot />
                    </TextField.Root>
                    <Text size="1">Balance: {aptAmount}</Text>
                </Flex>
            </Flex>
        </Flex>
    )
}