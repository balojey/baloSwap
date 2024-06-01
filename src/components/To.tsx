import { Flex, Text, Strong, Box, DropdownMenu, Button, Avatar, TextField } from "@radix-ui/themes"

export default function To({ tokens, toToken, fromToken, swapAmount, setConvertedAmount, convertedAmount, setToToken }) {
    return (
        <Flex gap="5" direction="column">
            <Text size="5">To</Text>
            <Flex gap="9">
                <Flex gap="5" direction="column">
                    <Strong>Token</Strong>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <Button variant="soft" size="4">
                                {
                                    toToken
                                    ?<Box py="3">
                                        <Avatar
                                            src={toToken.logoURI}
                                            fallback="A"
                                            size="1"
                                        />
                                        <Text>{toToken.symbol}</Text>
                                    </Box>
                                    : "Select Token"
                                }
                                <DropdownMenu.TriggerIcon />
                            </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content>
                            {tokens.map((token, index) => (
                                <DropdownMenu.Item key={index} onSelect={() => {
                                    setToToken(token)
                                    setConvertedAmount(swapAmount * (1 / fromToken.rate) * toToken.rate)
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
                    <TextField.Root placeholder="" size="3" disabled>
                        <TextField.Slot>{convertedAmount}</TextField.Slot>
                    </TextField.Root>
                </Flex>
            </Flex>
        </Flex>
    )
}